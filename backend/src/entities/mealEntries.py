from sqlalchemy import Column, Integer, String, Date
from marshmallow import Schema, fields
from .entity import Entity, Base

class MealEntry(Entity, Base):
    __tablename__ = 'mealEntries'

    id = Column(Integer, primary_key=True)
    meal_date = Column(Date)
    created_by = Column(Integer())
    meal_id = Column(Integer())

    def __init__(self, meal_date=None, created_by=None, meal_id=None):
        Entity.__init__(self)
        self.meal_date = meal_date
        self.created_by = created_by
        self.meal_id = meal_id

    def __repr__(self):
        return '<MealEntry %r>' % (self.id)

class MealEntrySchema(Schema):
    id = fields.Int()
    meal_date = fields.Date()
    created_by = fields.Int()
    meal_id = fields.Int()
    created_at = fields.DateTime()
    updated_at = fields.DateTime()