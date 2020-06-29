import tornado
import json
from auth import has_auth
from tornado_sqlalchemy import SessionMixin, as_future
from .base import BaseHandler
from entities.mealEntries import MealEntry, MealEntrySchema
from entities.meal import Meal, MealSchema
from loguru import logger


class MealEntriesHandler(SessionMixin, BaseHandler):
    # create/edit meal entries
    async def post(self):
        if not has_auth(self.request):
            self.respond(data=None, msg="User not authorized!", code=403)
            return
        try:
            json_data = json.loads(self.request.body.decode('utf-8'))
            data = json_data['data']
            meal_id = data['meal']
            json_user = data['user']
            logger.debug(json_user)
            logger.debug("id: {0}".format(str(json_user['id'])))
            date = data['date']
            entry = MealEntry(
                meal_date=date,
                created_by=json_user['id'],
                meal_id=meal_id)
            with self.make_session() as session:
                session.add(entry)
                session.commit()
            self.respond(msg="Success", code=200)

        except KeyError as e:
            self.respond(msg=str(e), code=500)

    # get meal entries for individual user
    async def get(self, uid):
        with self.make_session() as session:
            mealEntry_objects = await as_future((session.query(MealEntry).filter(MealEntry.created_by == uid).all))
            # transforming into JSON-serializable objects
            if mealEntry_objects is not None:
                resp_data = []
                schema = MealEntrySchema(many=True)
                mealEntries = schema.dump(mealEntry_objects)
                for entry_obj in mealEntry_objects:
                    meal_object = await as_future((session.query(Meal).filter(Meal.id == entry_obj.meal_id).first))
                    entrySchema = MealEntrySchema()
                    mealSchema = MealSchema()
                    meal = mealSchema.dump(meal_object)
                    entry = entrySchema.dump(entry_obj)
                    entry_and_meal = {"entry": entry.data, "meal": meal.data}
                    resp_data.append(entry_and_meal)

                # new resp for calendar
                resp_dic = {}
                for entry in resp_data:
                    data = {
                        "meal": [entry['meal']],
                        "total_cal": entry['meal']['calories']
                    }
                    if entry['entry']['meal_date'] not in resp_dic:
                        resp_dic[entry['entry']['meal_date']] = data
                    else:
                        resp_dic[entry['entry']['meal_date']]['meal'].append(
                            data['meal'][0])
                        last_cal = int(
                            resp_dic[entry['entry']['meal_date']]['total_cal'])
                        current_cal = int(data['total_cal'])
                        resp_dic[entry['entry']['meal_date']
                                 ]['total_cal'] = current_cal + last_cal

                self.respond(resp_dic, "Success", 200)
            else:
                self.respond(msg="No User with that id!")
