from sqlalchemy import Column, Integer, String, ForeignKey
from marshmallow import Schema, fields
from .entity import Entity, Base

class UserMealEntry(Entity, Base):
    __tablename__ = 'userMealEntries'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    mealEntry_id = Column(Integer, ForeignKey('mealEmtries.id'))
   
    def __init__(self, user_id=None, mealEntry_id=None):
        self.user_id = user_id
        self.mealEntry_id = mealEntry_id

class UserMealEntrySchema(Schema):
    id = fields.Number()
    user_id = fields.Int()
    mealEntry_id = fields.Int()