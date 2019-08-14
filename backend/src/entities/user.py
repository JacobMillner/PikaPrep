from sqlalchemy import Column, Integer, String
from marshmallow import Schema, fields, post_load
from .entity import Entity, Base

class User(Entity, Base):
    __tablename__ = 'users'

    id = Column(Integer, primary_key=True)
    username = Column(String(), unique=True)
    email = Column(String(), unique=True)
    password = Column(String())

    def __init__(self, username=None, email=None, password=None):
        self.username = username
        self.email = email
        self.password = password

    def __repr__(self):
        return '<User %r>' % (self.username)

class UserSchema(Schema):
    id = fields.Number()
    username = fields.Str()
    email = fields.Str()
    password = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()