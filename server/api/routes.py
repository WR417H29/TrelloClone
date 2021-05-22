from flask import request, jsonify

from api import app, db
from api.models import Board, Category, Card


@app.route('/home', methods=['GET', 'POST'])
def home():
    if request.method == 'GET':
        tot = [
            Board.query.all(),
            Category.query.all(),
            Card.query.all()
        ]

        return jsonify(tot)

    elif request.method == 'POST':
        pass
