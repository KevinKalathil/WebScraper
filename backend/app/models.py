from . import db

class Item(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    vendor = db.Column(db.String(50))
    price = db.Column(db.Float)
    URL = db.Column(db.String(50))
    