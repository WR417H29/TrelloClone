from flask import request, jsonify, redirect

from api import app, db
from api.models import Board, Category, Card


# returns all cards
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

    elif request.method == 'POST':
        print('POST Cards')

        data = request.get_json()

        card = Card(
            name=data['name'],
            body=data['body'],
            categoryID=categoryID
        )

        db.session.add(card)
        db.session.commit()

        return '', 204


@app.route('/card/delete/<int:cardID>')  # deletes specified card
def deleteCard(cardID):
    exists = Card.query.filter_by(id=cardID).first()  # does card exist?
    if not exists:
        return redirect('http://localhost:3000')

    db.session.delete(exists)  # delete the card
    db.session.commit()  # commit to the session

    # sending user back to home screen
    return redirect('http://localhost:3000')
