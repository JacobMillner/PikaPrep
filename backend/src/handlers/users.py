import tornado
import json, hashlib, binascii, os
from sqlalchemy import or_
from tornado_sqlalchemy import SessionMixin, as_future
from entities.user import User, UserSchema
from .base import BaseHandler

class UsersHandler(SessionMixin, BaseHandler):
    async def get(self):
        with self.make_session() as session:
                user_objects = await as_future(session.query(User).all)
                # transforming into JSON-serializable objects
                if len(user_objects) != 0:
                    schema = UserSchema(many=True)
                    users = schema.dump(user_objects)
                    self.respond(users.data, "Success", 200)
                else:
                    self.respond(msg="No Users!")