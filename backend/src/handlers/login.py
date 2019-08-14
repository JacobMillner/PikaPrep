import tornado
import json
from .base import BaseHandler

class LoginHandler(BaseHandler):
    def get(self):
        self.wrtie_line("Let's login")