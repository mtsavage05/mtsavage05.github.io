from flask import Flask, jsonify
import sqlite3
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

assignments = [
    {"id": "1", "title": "COMP235 HW1", "dueDate": "2025-10-10", "status": "Not Started"},
    {"id": "2", "title": "Read Chapter 3", "dueDate": "2025-10-07", "status": "In Progress"},
    {"id": "3", "title": "Lab Report Draft", "dueDate": "2025-10-05", "status": "Completed"},
    {"id": "4", "title": "Project Proposal", "dueDate": "2025-10-12", "status": "Not Started"},
    {"id": "5", "title": "Group Meeting", "dueDate": "2025-10-08", "status": "In Progress"}
]

@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})

@app.route("/api/assignments")
def get_assignments():
    return jsonify({"data": assignments})
@app.route('/')
def create_db():
    conn = sqlite3.connect('mydb.sqlite')
    conn.close()
    return 'Database created!'

if __name__ == "__main__":
    app.run(debug=True)