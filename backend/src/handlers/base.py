import tornado
import json

class BaseHandler(tornado.web.RequestHandler):

    def set_default_headers(self):
        self.set_header('Access-Control-Allow-Origin', '*')
        self.set_header('Access-Control-Allow-Headers', '*')
        self.set_header('Content-type', 'application/vnd.api+json')
        self.set_header('Access-Control-Allow-Methods', '*')

    def respond(self, data=None, msg="", code=200):
        self.set_status(code)
        self.write(json.dumps({
            "status": code,
            "data": data,
            "message": msg
        }))
        self.finish()

    def options(self):
        # no body
        self.set_status(204)
        self.finish()
    
    def wrtie_line(self, message):
        # for cleaner debugging
        self.write(str(message) + '\n')