from sqlalchemy import Column, Integer, String
from marshmallow import Schema, fields, post_load
from .entity import Entity, Base
import hashlib

class User(Entity, Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(), unique=True)
    email = Column(String(), unique=True)
    password = Column(String())
    gravatar = Column(String())

    def __init__(self, username=None, email=None, password=None):
        Entity.__init__(self)
        self.username = username
        self.email = email
        self.password = password
        utf_email = email.encode('utf-8')
        self.gravatar = hashlib.md5(utf_email.lower()).hexdigest()

    def __repr__(self):
        return '<User %r>' % (self.username)

class UserSchema(Schema):
    id = fields.Int()
    username = fields.Str()
    email = fields.Str()
    password = fields.Str()
    gravatar = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()