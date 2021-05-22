from api import app, db
from api.models import Board, Category, Card
import api.routes

if __name__ == '__main__':
    app.run(port=5000, debug=True)
