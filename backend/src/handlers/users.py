import tornado
import json
from .base import BaseHandler

class UsersHandler(BaseHandler):
    def get(self):
        self.write("Let's get a user!")
    
    # create a user
    def post(self):
        self.write("Let's create a user!")
        try:
            data = json.loads(self.request.body.decode('utf-8'))
            self.write(str(data))
        except KeyError as e:
            self.write_error(str(e))