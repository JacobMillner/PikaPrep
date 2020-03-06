import tornado
import json
from auth import has_auth
from tornado_sqlalchemy import SessionMixin, as_future
from .base import BaseHandler
from entities.mealEntries import MealEntry, MealEntrySchema


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

    # get meal entries for individual uer
    async def get(self, uid):
        print("UID: {0}".format(uid))
        with self.make_session() as session:
            mealEntry_objects = await as_future((session.query(MealEntry).filter(MealEntry.created_by == uid).all))
        # transforming into JSON-serializable objects
        if mealEntry_objects is not None:
            schema = MealEntrySchema()
            mealEntries = schema.dump(mealEntry_objects)
            print("MealEntries: {0}".format(str(mealEntries)))
            self.respond(mealEntries.data, "Success", 200)
        else:
            self.respond(msg="No User with that id!")
