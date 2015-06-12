import os
import flask.ext.sqlalchemy
import flask.ext.restless

from flask import Flask

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = ('sqlite:///' +
    os.path.join(os.path.abspath(os.path.dirname(__file__)), 'api.db'))
db = flask.ext.sqlalchemy.SQLAlchemy(app)

class Meter(db.Model):
    id = db.Column(db.Unicode, primary_key=True)
    street = db.Column(db.Unicode)
    address = db.Column(db.Integer)
    side = db.Column(db.Unicode)
    street_from = db.Column(db.Unicode)
    street_to = db.Column(db.Unicode)
    mech_id = db.Column(db.Integer) # Is this unique?
    door = db.Column(db.Unicode)
    vault = db.Column(db.Unicode)
    issues = db.Column(db.Unicode)
    spaces = db.Column(db.Integer)
    time = db.Column(db.Unicode)

class Garage(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    facility = db.Column(db.Unicode)
    address = db.Column(db.Integer)
    street = db.Column(db.Unicode)
    latitude = db.Column(db.Float)
    longitude = db.Column(db.Float)
    spaces = db.Column(db.Integer)
    cost = db.Column(db.Float)

db.create_all()

manager = flask.ext.restless.APIManager(app, flask_sqlalchemy_db=db)
manager.create_api(Meter)
manager.create_api(Garage)

if __name__ == '__main__':
    app.run()