import tornado
import json, hashlib, binascii, os
from sqlalchemy import or_
from tornado_sqlalchemy import SessionMixin, as_future
from entities.user import User, UserSchema
from .base import BaseHandler

class UsersHandler(SessionMixin, BaseHandler):
    async def get(self):
        self.wrtie_line("Let's get the users!")
        with self.make_session() as session:
                count = await as_future(session.query(User).count)
        self.wrtie_line('{} users so far!'.format(count))
    
    # create a user
    async def post(self):
        self.wrtie_line("Let's create a user!")
        try:
            json_data = json.loads(self.request.body.decode('utf-8'))
            posted_user = UserSchema(only = ('username', 'email', 'password'))\
                .load(json_data['data']['user'])
            # validate, hash the password, and save
            with self.make_session() as session:
                count = await as_future(session.query(User).\
                    filter(or_(User.username == posted_user.username,\
                         User.email == posted_user.email)).count)

            # todo - validate each field individually
            # make sure username/email is unique
            if count == 0:
                posted_user.password = hash_password(posted_user.password)
                user = User(**posted_user.data)
                with self.make_session() as session:
                    session.add(user)
                    await as_future(session.commit())
                self.respond(msg="Success", code=200)
            else:
                self.respond(msg="User already exists!", code=403)

            # output for debugging
            self.wrtie_line(posted_user.password) 
            self.wrtie_line(str(json_data))
        except KeyError as e:
            self.respond(msg=str(e), code=500)
            
def hash_password(password):
    """Hash a password for storing."""
    salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
    pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'), 
                                salt, 100000)
    pwdhash = binascii.hexlify(pwdhash)
    return (salt + pwdhash).decode('ascii')