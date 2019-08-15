import tornado
import json, hashlib, binascii, os
from tornado_sqlalchemy import SessionMixin, as_future
from .base import BaseHandler
from entities.user import User, UserSchema

class LoginHandler(SessionMixin, BaseHandler):
    def get(self):
        self.wrtie_line("Let's login")
    
    async def post(self):
        try:
            json_data = json.loads(self.request.body.decode('utf-8'))
            data = json_data['data']
            json_user = data['user']
            posted_user = UserSchema().load(json_user)
            # validate, check password, and return JWT
            with self.make_session() as session:
                user_object = await as_future(session.query(User).\
                    filter(User.email == posted_user.data['email']).first)
                if user_object is not None:
                    user = UserSchema(only=('id', 'username', 'email'))\
                            .dump(user_object)
                    print(str(user.data))
                    if verify_password(user.data['password'], posted_user['password']):
                        print('we made it!!!!')
                        jwt = 'foo'
                        resp_dic = { 'user': user.data, 'jwt': jwt }
                        print(str(resp_dic))
                        self.respond(resp_dic, 'Success', 500)

                    else:
                        self.respond(msg='Password Incorrect.', code=400)
                else:
                    self.respond(msg='Incorrect Email.', code=400)    
        except KeyError as e:
            self.respond(msg=str(e), code=500)

def verify_password(stored_password, provided_password):
    """Verify a stored password against one provided by user"""
    print('=====================================')
    salt = stored_password[:64]
    stored_password = stored_password[64:]
    pwdhash = hashlib.pbkdf2_hmac('sha512', 
                                  provided_password.encode('utf-8'), 
                                  salt.encode('ascii'), 
                                  100000)
    print('*************')
    pwdhash = binascii.hexlify(pwdhash).decode('ascii')
    return pwdhash == stored_password