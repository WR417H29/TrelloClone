from flask import request, jsonify, redirect

from api import app, db
from api.models import Board, Category, Card

# request a specific boards categories


@app.route('/categories/<int:boardID>', methods=['GET', 'POST'])
def categories(boardID):
    if request.method == 'GET':
        print('GET Categories')

        categories = []
        for x in Category.query.filter_by(boardID=boardID).all():
            categories.append({
                'id': x.id,
                'name': x.name.capitalize(),
                'boardID': x.boardID
            })

        return jsonify(categories), 200
