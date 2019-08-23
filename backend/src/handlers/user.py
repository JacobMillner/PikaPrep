import tornado
import json
import hashlib
import binascii
import os
import sqlalchemy
from sqlalchemy import or_
from tornado_sqlalchemy import SessionMixin, as_future
from entities.user import User, UserSchema
from .base import BaseHandler


class UserHandler(SessionMixin, BaseHandler):
    async def get(self, uid):
        with self.make_session() as session:
            user_object = await as_future((session.query(User).filter(User.id == uid).first))
            # transforming into JSON-serializable objects
            if user_object is not None:
                schema = UserSchema()
                user = schema.dump(user_object)
                self.respond(user.data, "Success", 200)
            else:
                self.respond(msg="No User with that username!")

    # create a user
    async def post(self):
        try:
            json_data = json.loads(self.request.body.decode('utf-8'))
            data = json_data['data']
            json_user = data['user']
            posted_user = UserSchema().load(json_user)
            # validate, hash the password, and save
            with self.make_session() as session:
                count = await as_future(session.query(User).
                                        filter(or_(User.username == posted_user.data['username'],
                                                   User.email == posted_user.data['email'])).count)

            # todo - validate each field individually
            # make sure username/email is unique
            if count == 0:
                posted_user.data['password'] = hash_password(
                    posted_user.data['password'])
                user = User(**posted_user.data)
                with self.make_session() as session:
                    session.add(user)
                    session.commit()
                self.respond(msg="Success", code=200)
            else:
                self.respond(data=None, msg="User already exists!", code=200)
        except KeyError as e:
            self.respond(msg=str(e), code=500)


def hash_password(password):
    """Hash a password for storing."""
    salt = hashlib.sha256(os.urandom(60)).hexdigest().encode('ascii')
    pwdhash = hashlib.pbkdf2_hmac('sha512', password.encode('utf-8'),
                                  salt, 100000)
    pwdhash = binascii.hexlify(pwdhash)
    return (salt + pwdhash).decode('ascii')
