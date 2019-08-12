from sqlalchemy import Column, Integer, String
from marshmallow import Schema, fields

from .entity import Entity, Base


class User(Entity, Base):
    __tablename__ = 'user'

    id = Column(Integer, primary_key=True)
    name = Column(String(), unique=True)
    email = Column(String(), unique=True)
    password = Column(String())

    def __init__(self, name=None, email=None, password=None):
        self.name = name
        self.email = email
        self.password = password

    def __repr__(self):
        return '<User %r>' % (self.name)

class UserSchema(Schema):
    id = fields.Number()
    username = fields.Str()
    email = fields.Str()
    password = fields.Str()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()