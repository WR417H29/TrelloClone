from flask import request, jsonify, redirect

from api import app, db
from api.models import Board, Category, Card


@app.route('/boards', methods=['GET', 'POST'])  # returns all boards
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


# deletes requested board and associated cards / categories
@app.route('/board/delete/<int:boardID>')
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
