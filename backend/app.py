from functools import wraps
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
import jwt
import datetime
import requests

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///site.db'
app.config['SECRET_KEY'] = 'sua_chave_secreta_aqui'
app.config['OPENAPI-KEY'] = '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'

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    images = db.relationship('Images', backref='user', lazy=True)


class Images(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    image_url = db.Column(db.String(500), nullable=False)
    likes = db.Column(db.Integer, nullable=True, default=0)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    deleted = db.Column(db.Boolean, default=False)
    
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = request.headers.get('Authorization')
        
        if not token:
            return jsonify({'message': 'Token não encontrado'}), 401

        try:
            token = token.split(" ")[1]
            data = jwt.decode(token, app.config['SECRET_KEY'], algorithms=["HS256"])
            current_user = User.query.filter_by(id=data['user_id']).first()
        except jwt.ExpiredSignatureError:
            return jsonify({'message': 'Token expirado'}), 401
        except jwt.InvalidTokenError:
            return jsonify({'message': 'Token inválido'}), 401    
        
        return f(current_user, *args, **kwargs)
    
    return decorated

@app.route('/api/auth/signup', methods=['POST'])
def signup():
    data = request.get_json()

    name = data.get('name')
    email = data.get('email')
    password = data.get('password')
    
    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')

    new_user = User(name=name, email=email, password=hashed_password)
    db.session.add(new_user)
    db.session.commit()

    user_details = {
        'id': new_user.id,
        'name': new_user.name,
        'email': new_user.email
    }

    return jsonify({'message': 'Usuário registrado com sucesso', 'user': user_details})

@app.route('/api/auth/login', methods=['POST'])
def login():
    data = request.get_json()

    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()

    if user and bcrypt.check_password_hash(user.password, password):
        token = jwt.encode({'user_id': user.id, 'exp': datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
                          app.config['SECRET_KEY'], algorithm='HS256').decode('utf-8')

        return jsonify({'message': 'Login bem-sucedido', 'token': token})
    else:
        return jsonify({'message': 'Usuário ou senha inválidos'}), 401

@app.route('/api/images', methods=['POST'])
@token_required
def protected_route(current_user):
    prompt = request.get_json().get('prompt')
    url = "https://api.openai.com/v1/images/generations"
    headers = {
        "Content-Type": "application/json",
        "Authorization": "Bearer " + app.config["OPENAPI-KEY"],
    }
    data = {
        "prompt": prompt,
        "n":1,
        "size":"256x256"
    }

    response = requests.post(url, headers=headers, json=data)
    return jsonify(response.json())

@app.route('/api/all_images', methods=['GET'])
def images():
    images = Images.query.all()
    images_list = []
    for image in images:
        images_list.append({'id': image.id, 'image_url': image.image_url, 'likes': image.likes})
    return jsonify({'images': images_list})

@app.route('/api/my-images', methods=['GET'])
@token_required
def my_images(current_user):
    images = Images.query.filter_by(user_id=current_user.id).all()
    images_list = []
    for image in images:
        images_list.append({'id': image.id, 'image_url': image.image_url, 'likes': image.likes})
    return jsonify({'images': images_list})

@app.route('/api/images/save', methods=['POST'])
@token_required
def save(current_user):
    data = request.get_json()
    image_url = data.get('image_url')
    new_image = Images(image_url=image_url, user_id=current_user.id)
    db.session.add(new_image)
    db.session.commit()
    return jsonify({'message': 'Imagem salva com sucesso'})


@app.put('/api/images/<int:image_id>/like')
@token_required
def like(current_user, image_id):
    image = Images.query.get(image_id)
    if image:
        image.likes += 1
        db.session.commit()
        return jsonify({'message': 'Imagem curtida com sucesso'})
    else:
        return jsonify({'message': 'Imagem não encontrada'}), 404

@app.delete('/api/images/<int:image_id>/delete')
@token_required
def delete(current_user, image_id):
    image = Images.query.get(image_id)
    if image:
        image.deleted = True
        db.session.commit()
        return jsonify({'message': 'Imagem deletada com sucesso'})
    else:
        return jsonify({'message': 'Imagem não encontrada'}), 404

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
