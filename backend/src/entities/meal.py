from sqlalchemy import Column, Integer, String, ForeignKey
from marshmallow import Schema, fields
from .entity import Entity, Base

class Meal(Entity, Base):
    __tablename__ = 'meals'

    id = Column(Integer, primary_key=True)
    name = Column(String(), unique=True)
    description = Column(String())
    photo_url = Column(String())
    recipe_url = Column(String(), unique=True)
    calories = Column(Integer())
    carbs = Column(Integer())
    fat = Column(Integer())
    protein = Column(Integer())
    servings = Column(Integer())
    cooking_time = Column(Integer())
    create_by = Column(Integer, ForeignKey('users.id'))

    def __init__(
        self, name=None, description=None, photo_url=None,
        recipe_url=None, calories=None, carbs=None, fat=None,
        protein=None, servings=None, cooking_time=None, created_by=None):
        self.name = name
        self.description = description
        self.photo_url = photo_url
        self.recipe_url = recipe_url
        self.calories = calories
        self.carbs = carbs
        self.fat = fat
        self.protein = protein
        self.servings = servings
        self.cooking_time = cooking_time
        self.create_by = created_by

    def __repr__(self):
        return '<Meal %r>' % (self.name)

class MealSchema(Schema):
    id = fields.Number()
    name = fields.Str()
    description = fields.Str()
    photo_url = fields.Str()
    recipe_url = fields.Str()
    calories = fields.Int()
    carbs = fields.Int()
    fat = fields.Int()
    protein = fields.Int()
    servings = fields.Int()
    cooking_time = fields.Int()
    created_by = fields.Int()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()