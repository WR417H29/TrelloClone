from flask import request, jsonify, redirect

from api import app, db
from api.models import Board, Category, Card


@app.route('/boards', methods=['GET', 'POST'])  # returns all boards
def boards():
    if request.method == 'GET':
        boards = []  # declaring a variable to store the boards in
        for x in Board.query.all():
            numCategories = 0
            for cat in x.categories:
                numCategories += 1  # setting the number of categories

            boards.append({
                'id': x.id,
                'name': x.name.capitalize(),
                'numCategories': numCategories,
            })  # creating a JSON object to send to the Frontend

        return jsonify(boards), 200  # returning the list of JSON objects

    if request.method == 'POST':
        form = request.form  # getting the form the user has posted

        board = Board(name=form['name'])  # creating a new board object

        db.session.add(board)  # adding new board to the database
        db.session.commit()  # commiting the data

        return '', 204  # returning a success code
        # code 204 = no content but a successful request


# deletes requested board and associated cards / categories
# * <int:boardID> indicates the url = `/board/delete/1` for example. This allows us to access a specific board
@app.route('/board/delete/<int:boardID>')
def deleteBoard(boardID):
    # accessing the board database for the requested board
    exists = Board.query.filter_by(id=boardID).first()
    if not exists:  # if there is not board with that ID
        return redirect('http://localhost:3000')  # redirect to the home page

    # getting all of the categories associated with the board
    categories = Category.query.filter_by(boardID=boardID).all()

    for cat in categories:  # for every category found
        # getting all cards associated with each category
        cards = Card.query.filter_by(categoryID=cat.id).all()
        for card in cards:
            db.session.delete(card)  # delete all cards on the page

        db.session.delete(cat)  # delete all categories on the page

    db.session.delete(exists)  # delete the board
    db.session.commit()  # commit to the session

    # the reason cards and categories are deleted is for referential integrity

    # sending user back to home screen
    return redirect('http://localhost:3000')
