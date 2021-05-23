from flask import request, jsonify

from api import app, db
from api.models import Board, Category, Card


@app.route('/boards', methods=['GET', 'POST'])
def boards():
    if request.method == 'GET':
        print("GET Request Receieved")

        boards = []
        for x in Board.query.all():
            boards.append({
                'board_id': x.id,
                'board_name': x.name
            })

        return jsonify(boards), 200

    elif request.method == 'POST':
        pass
