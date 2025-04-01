from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS  

app = Flask(__name__)

# Enable CORS and allow credentials
CORS(app, supports_credentials=True, origins="http://localhost:5173")

app.secret_key = 'mitwpu'

# MySQL Connection using SQLAlchemy
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:pk.101104@localhost/ims'
# app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql://root:root@localhost/ims'
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
    dept_id = db.Column(db.String(45), nullable=False)
    category = db.Column(db.String(45), nullable=False)
    company_name = db.Column(db.String(100), nullable=False)
    stipend = db.Column(db.String(45), nullable=True)
    school_sup = db.Column(db.String(45), nullable=True)
    company_sup = db.Column(db.String(45), nullable=True)
    
# On-Campus Companies Model
class Companies(db.Model):
    __tablename__ = 'companies'
    company_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    company_name = db.Column(db.String(100), primary_key=True)
    category = db.Column(db.String(45), primary_key=True)

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
        
        # Count companies based on category (on-campus and off-campus)
        total_on_campus_companies = Companies.query.filter_by(category='on').count()
        total_off_campus_companies = Companies.query.filter_by(category='off').count()

        return jsonify({
            "total_students": total_students,
            "on_campus_companies": total_on_campus_companies,
            "off_campus_companies": total_off_campus_companies
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_student_details', methods=['GET'])
def get_student_details():
    try:
        total_students = Student.query.count()
        
        # Count students placed in on-campus companies
        total_on_campus_placed = Student.query.filter_by(category='on').count()
        
        # Count students placed in off-campus companies
        total_off_campus_placed = Student.query.filter_by(category='off').count()

        return jsonify({
            "total_students": total_students,
            "on_campus_students": total_on_campus_placed,
            "off_campus_students": total_off_campus_placed
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    

from sqlalchemy import func

@app.route('/get_stipend_details', methods=['GET'])
def get_stipend_details():
    try:
        # Query for the highest stipend
        highest_stipend = db.session.query(func.max(Student.stipend)).scalar()

        # Query for the lowest stipend
        lowest_stipend = db.session.query(func.min(Student.stipend)).scalar()

        # Query for the average stipend
        average_stipend = db.session.query(func.avg(Student.stipend)).scalar()

        # Ensure that stipend data exists and handle None (null) cases
        if highest_stipend is None:
            highest_stipend = "No stipend data available"
        if lowest_stipend is None:
            lowest_stipend = "No stipend data available"
        if average_stipend is None:
            average_stipend = "No stipend data available"

        return jsonify({
            "highest_stipend": highest_stipend,
            "lowest_stipend": lowest_stipend,
            "avg_stipend": average_stipend
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)