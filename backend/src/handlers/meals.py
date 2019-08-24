import tornado
import json
import hashlib
import binascii
import os
from sqlalchemy import or_
from tornado_sqlalchemy import SessionMixin, as_future
from entities.meal import Meal, MealSchema
from .base import BaseHandler


class MealsHandler(SessionMixin, BaseHandler):
    async def get(self, meal_id=None):
        if meal_id != None:
            await self.getSingleMeal(meal_id)
        else:
            await self.getAllMeals()
    # creat/edit meals
    async def post(self):
        try:
            json_data = json.loads(self.request.body.decode('utf-8'))
            data = json_data['data']
            json_meal = data['meal']
            posted_meal = MealSchema().load(json_meal)
            # validate, save
            with self.make_session() as session:
                count = await as_future(session.query(Meal).
                                        filter(or_(Meal.recipe_url == posted_meal.data['recipe_url'],
                                                   Meal.name == posted_meal.data['name'])).count)

            # todo - validate each field individually
            # make sure each meal is unique
            if count == 0:
                meal = Meal(**posted_meal.data)
                with self.make_session() as session:
                    session.add(meal)
                    session.commit()
                self.respond(msg="Success", code=200)
            else:
                self.respond(data=None, msg="Meal already exists!", code=200)
        except KeyError as e:
            self.respond(msg=str(e), code=500)

    async def getAllMeals(self):
        with self.make_session() as session:
            meal_objects = await as_future(session.query(Meal).all)
            # transforming into JSON-serializable objects
            if len(meal_objects) != 0:
                schema = MealSchema(many=True)
                meals = schema.dump(meal_objects)
                self.respond(meals.data, "Success", 200)
            else:
                self.respond(msg="No Meals!")

    async def getSingleMeal(self, meal_id):
        with self.make_session() as session:
            meal_object = await as_future((session.query(Meal).filter(Meal.id == meal_id).first))
            # transforming into JSON-serializable objects
            if meal_object is not None:
                schema = MealSchema()
                user = schema.dump(meal_object)
                self.respond(user.data, "Success", 200)
            else:
                self.respond(msg="No User with that id!")