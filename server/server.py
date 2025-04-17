from flask import Flask, request, jsonify, session
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import func, cast, Integer

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
    
class Department(db.Model):
    __tablename__ = 'department'  # Name of the table in the database
    dept_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    department = db.Column(db.String(100), nullable=False)

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
        average_stipend = db.session.query(func.avg(Student.stipend)).scalar()

        return jsonify({
            "total_students": total_students,
            "on_campus_companies": total_on_campus_companies,
            "off_campus_companies": total_off_campus_companies,
            "avg_stipend": average_stipend
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/get_student_details', methods=['GET'])
def get_student_details():
    year = request.args.get('year')
    semester = request.args.get('semester')
    dept_id = request.args.get('dept_id')  # Added department filter

    if not year:
        return jsonify({"error": "Year is required"}), 400  # Year is mandatory, but semester and dept_id are optional

    query = Student.query.filter_by(year=year)

    if semester:  # Apply semester filter only if selected
        query = query.filter_by(semester=semester)

    if dept_id:  # Apply department filter only if selected
        query = query.filter_by(dept_id=dept_id)

    students = query.all()
    on_campus_students = query.filter_by(category='on').count()
    off_campus_students = query.filter_by(category='off').count()

    total_students = len(students)

    student_list = [{
        "PRN": s.PRN,
        "First_name": s.First_name,
        "Middle_name": s.Middle_name,
        "Last_name": s.Last_name,
        "email": s.email,
        "phone": s.phone,
        "category": s.category,
        "stipend": s.stipend,
        "company_name": s.company_name,
        "dept_id": s.dept_id  # Include dept_id in response
    } for s in students]

    return jsonify({
        "stats": {
            "total_students": total_students,
            "on_campus_students": on_campus_students,
            "off_campus_students": off_campus_students
        },
        "students": student_list
    })
    

@app.route('/get_stipend_details', methods=['GET'])
def get_stipend_details():
    try:
        year = request.args.get('year')
        semester = request.args.get('semester')
        dept_id = request.args.get('dept_id')

        # Base query with filters applied before aggregations
        query = db.session.query(Student.stipend)

        if year:
            query = query.filter(Student.year == year)
        if semester:
            query = query.filter(Student.semester == semester)
        if dept_id:
            query = query.filter(Student.dept_id == dept_id)

        # Filter out NULL and 0 stipends for lowest calculation
        non_zero_query = query.filter(Student.stipend != None, Student.stipend > 0)

        highest = query.with_entities(func.max(Student.stipend)).scalar()
        lowest = non_zero_query.with_entities(func.min(Student.stipend)).scalar()
        average = query.with_entities(func.avg(Student.stipend)).scalar()

        highest_stipend = highest if highest is not None else "No stipend data available"
        lowest_stipend = lowest if lowest is not None else "No valid (non-zero) stipend data available"
        average_stipend = average if average is not None else "No stipend data available"

        return jsonify({
            "highest_stipend": highest_stipend,
            "lowest_stipend": lowest_stipend,
            "avg_stipend": average_stipend
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/stipend/department-summary', methods=['GET'])
def get_department_stipend_summary():
    # Get the year parameter from the request, default to None if not provided
    year = request.args.get('year', None)

    departments = db.session.query(Student.dept_id).distinct().all()
    response = {}

    for dept_row in departments:
        dept = dept_row[0]
        # Base query per department, filter by year if provided
        query = db.session.query(Student).filter(Student.dept_id == dept)
        
        if year:
            query = query.filter(Student.year == year)

        # Highest: excluding None
        highest = query \
            .filter(Student.stipend != None) \
            .with_entities(func.max(cast(Student.stipend, Integer))).scalar()

        # Average: excluding None
        average = query \
            .filter(Student.stipend != None) \
            .with_entities(func.avg(cast(Student.stipend, Integer))).scalar()

        # Lowest: excluding None and 0
        lowest = query \
            .filter(Student.stipend != None, cast(Student.stipend, Integer) > 0) \
            .with_entities(func.min(cast(Student.stipend, Integer))).scalar()

        response[dept] = {
            'highest': highest or 0,
            'avg': round(average, 2) if average else 0,
            'lowest': lowest or 0
        }

    return jsonify(response)

@app.route('/api/stipend/year-summary', methods=['GET'])
def get_year_wise_stipend_summary():
    # Get the department parameter from the request
    department_name = request.args.get('department', None)
    if not department_name:
        return jsonify({'error': 'Department is required'}), 400

    # Query to find the department ID based on the department name
    department = db.session.query(Department).filter(Department.department == department_name).first()
    
    # If department is not found
    if not department:
        return jsonify({'error': 'Department not found'}), 404

    dept_id = department.dept_id  # Get the department ID

    # Get distinct years for the entire Student table (not department-filtered)
    years = db.session.query(Student.year).distinct().all()
    
    if not years:
        return jsonify({'error': 'No data found for the years'}), 404

    response = []

    # Iterate over each distinct year
    for year_row in years:
        year = year_row[0]
        
        # Base query filtered by department (using dept_id) and year
        query = db.session.query(Student).filter(Student.dept_id == dept_id, Student.year == year)
        
        # Highest stipend: excluding None
        highest = query \
            .filter(Student.stipend != None) \
            .with_entities(func.max(cast(Student.stipend, Integer))).scalar()

        # Average stipend: excluding None
        average = query \
            .filter(Student.stipend != None) \
            .with_entities(func.avg(cast(Student.stipend, Integer))).scalar()

        # Lowest stipend: excluding None and 0
        lowest = query \
            .filter(Student.stipend != None, cast(Student.stipend, Integer) > 0) \
            .with_entities(func.min(cast(Student.stipend, Integer))).scalar()

        # Append the data for the year to the response list
        response.append({
            'year': year,
            'highest_stipend': highest or 0,
            'avg_stipend': round(average, 2) if average else 0,
            'lowest_stipend': lowest or 0
        })

    return jsonify(response)


if __name__ == '__main__':
    app.run(debug=True)