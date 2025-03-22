from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  

app = Flask(__name__)

# Enable CORS and allow credentials
CORS(app, supports_credentials=True, origins="http://localhost:5173")

app.secret_key = 'mitwpu'

# MySQL Connection using SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost/ims'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Define Admin Model
class Admin(db.Model):
    __tablename__ = 'admin'
    sr_no = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)

@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()  

    email = data.get('email')
    password = data.get('password')

    if not email or not password:
        return jsonify({'status': 'error', 'message': 'Missing email or password'}), 400

    # Query database using SQLAlchemy
    user = Admin.query.filter_by(email=email, password=password).first()

    if user:
        session['loggedin'] = True
        session['email'] = user.email
        session['name'] = user.name  # Storing name instead of username
        return jsonify({'status': 'success', 'message': 'Logged in successfully!', 'user': {'email': user.email, 'name': user.name}})
    else:
        return jsonify({'status': 'error', 'message': 'Incorrect email or password'}), 401

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('loggedin', None)
    session.pop('email', None)
    session.pop('name', None)
    return jsonify({'status': 'success', 'message': 'Logged out successfully!'})

@app.route('/check_session', methods=['GET'])
def check_session():
    if 'loggedin' in session:
        return jsonify({'status': 'success', 'logged_in': True, 'user': {'email': session.get('email'), 'name': session.get('name')}})
    else:
        return jsonify({'status': 'error', 'logged_in': False})

if __name__ == '__main__':
    app.run(debug=True)