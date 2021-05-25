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

    elif request.method == 'POST':
        print('POST Categories')
        # form = request.form

        # category = Category(
        #     name=form['name'],
        #     boardID=boardID,
        # )

        # db.session.add(category)
        # db.session.commit()

        return '', 204


@app.route('/category/delete/<int:categoryID>')
def deleteCategory(categoryID):
    exists = Category.query.filter_by(id=categoryID).first()

    if not exists:
        return redirect("http://localhost:3000")

    cards = Card.query.filter_by(categoryID=categoryID).all()
    for card in cards:
        db.session.delete(card)

    db.session.delete(exists)
    db.session.commit()

    return '', 204
