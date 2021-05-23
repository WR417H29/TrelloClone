from flask import request, jsonify

from api import app, db
from api.models import Board, Category, Card


# new route, /boards, if user requests, all boards are returned
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


# request a specific boards categories
@app.route('/categories/<int:boardID>', methods=['GET', 'POST'])
def categories(boardID):
    if request.method == 'GET':
        print('GET Categories')

        categories = []
        for x in Category.query.filter_by(boardID=boardID).all():
            categories.append({
                'id': x.id,
                'name': x.name,
                'boardID': x.boardID
            })

        return jsonify(categories), 200


# request a categories cards.
@app.route('/cards/<int:categoryID>', methods=['GET', 'POST'])
def cards(categoryID):
    if request.method == 'GET':
        print('GET Cards')

        cards = []
        for x in Card.query.filter_by(categoryID=categoryID).all():
            cards.append({
                'id': x.id,
                'name': x.name,
                'body': x.body,
                'categoryID': x.categoryID
            })

        return jsonify(cards), 200
