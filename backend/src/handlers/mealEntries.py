import tornado
import json
from auth import has_auth
from tornado_sqlalchemy import SessionMixin
from .base import BaseHandler


class MealEntriesHandler(SessionMixin, BaseHandler):
    # create/edit meal entries
    async def post(self):
        if not has_auth(self.request):
            self.respond(data=None, msg="User not authorized!", code=403)
            return
        try:
            json_data = json.loads(self.request.body.decode('utf-8'))
            data = json_data['data']
            print(str(data))
        except:
            pass
