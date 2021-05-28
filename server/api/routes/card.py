from flask import request, jsonify, redirect

from api import app, db
from api.models import Board, Category, Card


# returns all cards
@ app.route('/cards/<int:categoryID>', methods=['GET', 'POST'])
def cards(categoryID):
    if request.method == 'GET':  # if the request is a GET request
        cards = []  # declaring a card variable to store all cards
        # for every card in the database (associated with a specific category)
        for x in Card.query.filter_by(categoryID=categoryID).all():
            cards.append({
                'id': x.id,
                'name': x.name.capitalize(),
                'body': x.body,
                'categoryID': x.categoryID
            })  # appending a JSON object to the cards list

        # sending the list of JSON objects back to the user
        return jsonify(cards), 200

    elif request.method == 'POST':  # if the request is a POST request
        data = request.get_json()  # getting the data sent back

        card = Card(
            name=data['name'],
            body=data['body'],
            categoryID=categoryID
        )  # creating a new card object to add to the database

        db.session.add(card)  # adding the new card to the database
        db.session.commit()  # commiting the changes

        return '', 204  # returning no content, but a code that indicates a successful request


@app.route('/card/delete/<int:cardID>')  # deletes specified card
def deleteCard(cardID):
    exists = Card.query.filter_by(id=cardID).first()  # does card exist?
    if not exists:
        # sending back to the homepage if the card doesnt exist
        return redirect('http://localhost:3000')

    db.session.delete(exists)  # delete the card
    db.session.commit()  # commit to the session

    # sending user back to home screen
    return redirect('http://localhost:3000')
