from sqlalchemy import Column, Integer, String, ForeignKey
from marshmallow import Schema, fields
from .entity import Entity, Base

class UserMeal(Entity, Base):
    __tablename__ = 'userMeals'

    id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.id'))
    meal_id = Column(Integer, ForeignKey('meals.id'))
   
    def __init__(self, user_id=None, meal_id=None):
        Entity.__init__(self)
        self.user_id = user_id
        self.meal_id = meal_id

class UserMealSchema(Schema):
    id = fields.Number()
    user_id = fields.Int()
    meal_id = fields.Int()