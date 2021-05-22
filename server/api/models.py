from api import db


class Board(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(40), unique=True, nullable=False)

    categories = db.relationship('Category', backref='board', lazy=True)

    def __repr__(self):
        return '<Board %s>' % self.name


class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(40), nullable=False)

    board_id = db.Column(db.Integer, db.ForeignKey('board.id'), nullable=False)

    cards = db.relationship('Card', backref='category', lazy=True)

    def __repr__(self):
        return '<Category %s>' % self.name


class Card(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(40), nullable=False)
    body = db.Column(db.String(150), nullable=False)

    category_id = db.Column(db.Integer, db.ForeignKey(
        'category.id'), nullable=False)

    def __repr__(self):
        return '<Card %s>' % self.name
