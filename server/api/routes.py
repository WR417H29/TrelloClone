from flask import request, jsonify

from api import app, db
from api.models import Board, Category, Card


@app.route('/boards', methods=['GET', 'POST'])
def boards():
    if request.method == 'GET':
        print("GET Boards")

        boards = []
        for x in Board.query.all():
            boards.append({
                'id': x.id,
                'name': x.name
            })

        return jsonify(boards), 200


@app.route('/categories', methods=['GET', 'POST'])
def categories():
    if request.method == 'GET':
        print('GET Categories')

        categories = []
        for x in Category.query.all():
            categories.append({
                'id': x.id,
                'name': x.name,
                'boardID': x.board_id
            })

        return jsonify(categories), 200


@app.route('/cards', methods=['GET', 'POST'])
def cards():
    if request.method == 'GET':
        print('GET Cards')

        cards = []
        for x in Card.query.all():
            cards.append({
                'id': x.id,
                'name': x.name,
                'body': x.body,
                'categoryID': x.category_id
            })

        return jsonify(cards), 200
