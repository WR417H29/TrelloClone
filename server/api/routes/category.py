from flask import request, jsonify, redirect

from api import app, db
from api.models import Board, Category, Card

# request a specific boards categories


# this route gets all categories associated with the boardID passed in
@app.route('/categories/<int:boardID>', methods=['GET', 'POST'])
def categories(boardID):
    if request.method == 'GET':  # if it is a GET request
        categories = []  # declaring a categories variable
        # for every category on the board
        for x in Category.query.filter_by(boardID=boardID).all():
            categories.append({
                'id': x.id,
                'name': x.name.capitalize(),
                'boardID': x.boardID
            })  # appending a JSON object to the categories list

        # returning the categories list to the frontend
        return jsonify(categories), 200

    elif request.method == 'POST':  # if POST request
        data = request.get_json()  # getting the data sent back

        category = Category(
            name=data['name'],
            boardID=boardID,
        )  # creating a new category

        db.session.add(category)  # adding the category to the database
        db.session.commit()  # commiting the database

        return '', 204  # returning no content and a successful request indicator


@app.route('/category/delete/<int:categoryID>')  # to delete a category
def deleteCategory(categoryID):
    exists = Category.query.filter_by(
        id=categoryID).first()  # checking the category exists

    if not exists:  # if there isnt a category there
        # return the user to the homepage
        return redirect("http://localhost:3000")

    # getting all of the cards on the category
    cards = Card.query.filter_by(categoryID=categoryID).all()
    for card in cards:  # for every card on the category
        db.session.delete(card)  # delete the card

    db.session.delete(exists)  # delete the category
    db.session.commit()  # commit the database

    return '', 204  # returning no content + successful request
