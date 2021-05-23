from flask import Flask
from flask_sqlalchemy import SQLAlchemy

from api.config import AppConfig

app = Flask(__name__)  # creating a flask app
app.config.from_object(AppConfig)  # configuring the flask app

db = SQLAlchemy(app)  # linking the database
