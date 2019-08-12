import os
import tornado.ioloop
import tornado.web
from sqlalchemy import create_engine
from tornado_sqlalchemy import make_session_factory
from tornado_sqlalchemy import SessionMixin, as_future
from entities.user import User, UserSchema
from entities.entity import Base


class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

# for testing purposes
class UsersTestHandler(SessionMixin, tornado.web.RequestHandler):
    async def get(self):
            with self.make_session() as session:
                count = await as_future(session.query(User).count)
            self.write('{} users so far!'.format(count))

def make_app():
    # generate database schema
    engine = create_engine(os.environ.get('DATABASE_URL'))
    Base.metadata.create_all(engine)

    # async sessions with tornado-sqlalchemy!
    factory = make_session_factory(os.environ.get('DATABASE_URL'))
    return tornado.web.Application([
        (r"/", MainHandler),
        (r"/users", UsersTestHandler),
    ],
    session_factory = factory)

if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()