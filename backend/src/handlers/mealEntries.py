import tornado
import json
from auth import has_auth
from tornado_sqlalchemy import SessionMixin
from .base import BaseHandler
from entities.mealEntries import MealEntry


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
