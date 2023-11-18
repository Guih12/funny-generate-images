from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///test.db'

db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    age = db.Column(db.Integer, nullable=False)

    def __repr__(self):
        return f'User {self.name}'


with app.app_context():
    db.create_all()
    print("banco criado com sucesso")

@app.route('/api/sign-in')
def sign_in():
    dados = {"token": '77372333HU3U213##'}
    return jsonify(dados)

if __name__ == '__main__':
    app.run(debug=True)