from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  

app = Flask(__name__)

# Enable CORS and allow credentials
CORS(app, supports_credentials=True, origins="http://localhost:5173")

app.secret_key = 'mitwpu'

# MySQL Connection using SQLAlchemy
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:pk.101104@localhost/ims'
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost/ims'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Admin Model
class Admin(db.Model):
    __tablename__ = 'admin'
    sr_no = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    password = db.Column(db.String(255), nullable=False)
   
# Student Model 
class Student(db.Model):
    __tablename__ = 'students'
    PRN = db.Column(db.Integer, primary_key=True)
    First_name = db.Column(db.String(100), nullable=False)
    Middle_name = db.Column(db.String(100), nullable=False)
    Last_name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    phone = db.Column(db.String(45), nullable=False)
    year = db.Column(db.String(45), nullable=False)
    semester = db.Column(db.String(45), nullable=False)
    company_id = db.Column(db.Integer, nullable=False)
    stipend = db.Column(db.String(45), nullable=True)
    school_sup = db.Column(db.String(45), nullable=True)
    company_sup = db.Column(db.String(45), nullable=True)
    
# On-Campus Companies Model
class OnCampusCompany(db.Model):
    __tablename__ = 'on_campus_companies'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    company_name = db.Column(db.String(100), primary_key=True)
    year = db.Column(db.String(45), primary_key=True)
    semester = db.Column(db.String(45), primary_key=True)

# Off-Campus Companies Model
class OffCampusCompany(db.Model):
    __tablename__ = 'off_campus_companies'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    company_name = db.Column(db.String(100), primary_key=True)
    year = db.Column(db.String(45), primary_key=True)
    semester = db.Column(db.String(45), primary_key=True)


# School supervisors Model    
class School_sup(db.Model):
    __tablename__ = 'school_supervisor'
    sup_id = db.Column(db.Integer, primary_key=True)
    sup_name = db.Column(db.String(100), nullable=False)
    sup_contact = db.Column(db.String(45), unique=True, nullable=False)
    sup_email = db.Column(db.String(100), unique=True, nullable=False)

# Company supervisor Model    
class Company_sup(db.Model):
    __tablename__ = 'company_supervisor'
    sup_id = db.Column(db.Integer, primary_key=True)
    sup_name = db.Column(db.String(100), nullable=False)
    sup_contact = db.Column(db.String(45), unique=True, nullable=False)
    sup_email = db.Column(db.String(100), unique=True, nullable=False)

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
        session['name'] = user.name  
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
    
@app.route('/get_dashboard_data', methods=['GET'])
def get_dashboard_data():
    try:
        total_students = Student.query.count()
        total_on_campus_companies = OnCampusCompany.query.count()
        total_off_campus_companies = OffCampusCompany.query.count()

        return jsonify({
            "total_students": total_students,
            "on_campus_companies": total_on_campus_companies,
            "off_campus_companies": total_off_campus_companies
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)