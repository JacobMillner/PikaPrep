import tornado
import json
from .base import BaseHandler

class LoginHandler(BaseHandler):
    def get(self):
        self.write("Let's login")