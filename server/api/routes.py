from flask import request, jsonify, redirect

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
                'name': x.name.capitalize()
            })

        return jsonify(boards), 200

    if request.method == 'POST':
        print("POST Boards")

        form = request.form

        board = Board(name=form['name'])

        db.session.add(board)
        db.session.commit()

        return redirect('http://localhost:3000')

# request a specific boards categories


@app.route('/board/delete/<int:boardID>')  # route
def deleteBoard(boardID):
    exists = Board.query.filter_by(id=boardID).first()
    if not exists:
        return redirect('http://localhost:3000')

    categories = Category.query.filter_by(boardID=boardID).all()

    for cat in categories:
        cards = Card.query.filter_by(categoryID=cat.id).all()
        for card in cards:
            db.session.delete(card)  # delete all cards on the page

        db.session.delete(cat)  # delete all categories on the page

    db.session.delete(exists)  # delete the board
    db.session.commit()  # commit to the session

    # the reason cards and categories are deleted is for referential integrity

    # sending user back to home screen
    return redirect('http://localhost:3000')


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


# request a categories cards.
@ app.route('/cards/<int:categoryID>', methods=['GET', 'POST'])
def cards(categoryID):
    if request.method == 'GET':
        print('GET Cards')

        cards = []
        for x in Card.query.filter_by(categoryID=categoryID).all():
            cards.append({
                'id': x.id,
                'name': x.name.capitalize(),
                'body': x.body,
                'categoryID': x.categoryID
            })

        return jsonify(cards), 200
