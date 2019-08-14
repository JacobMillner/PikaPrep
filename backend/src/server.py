import os
import tornado.ioloop
import tornado.web
from auth import login_required
from sqlalchemy import create_engine
from tornado_sqlalchemy import make_session_factory
from tornado_sqlalchemy import SessionMixin, as_future
from entities.user import User, UserSchema
from entities.meal import Meal, MealSchema
from entities.userMeals import UserMeal, UserMealSchema
from entities.userMealEntries import UserMealEntry, UserMealEntrySchema
from entities.mealEntries import MealEntry, MealEntrySchema
from entities.entity import Base
from handlers.users import UsersHandler

class MainHandler(tornado.web.RequestHandler):
    def get(self):
        self.write("Hello, world")

# for testing purposes
@login_required
class TestHandler(SessionMixin, tornado.web.RequestHandler):
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
        (r"/test", TestHandler),
        (r"/users", UsersHandler),
    ],
    session_factory = factory)

if __name__ == "__main__":
    app = make_app()
    app.listen(8888)
    tornado.ioloop.IOLoop.current().start()