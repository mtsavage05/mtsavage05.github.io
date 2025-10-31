from flask import Flask, jsonify, g, request
import sqlite3
import os
import re
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

app.config["DATABASE"] = os.path.join(app.instance_path, "app.db")
os.makedirs(app.instance_path, exist_ok=True)

def assignment_formater(row):
    return {
        "id": row["id"],
        "title": row["title"],
        "dueDate": row["due_date"],
        "status": row["status"]
    }

def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(app.config["DATABASE"])
        g.db.row_factory = sqlite3.Row
    return g.db

@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})

@app.route("/api/assignments")
def get_assignments():
    db = get_db()
    rows = db.execute("SELECT * FROM assignments").fetchall()
    assignments = [assignment_formater(row) for row in rows]
    return jsonify({"data": assignments, "count": len(assignments)})

@app.route("/api/assignments/<int:id>")
def get_assignment(id):
    db = get_db()
    row =  db.execute("SELECT * FROM assignments WHERE id = ?", (id,)).fetchone()
    if row is None:
        return jsonify({"error": "Not found"}), 404
    assignment = assignment_formater(row)
    return jsonify(assignment)

@app.route("/api/assignments/<int:id>", methods=["PUT"])
def update_assignments(id):
    db = get_db()
    data = request.get_json() or {}
    errors = {}
    title = data.get("title")
    if title is not None:
        title = title.strip()
        if not title:
            errors["title"] = "Title is required"
    due_date = data.get("dueDate")
    if due_date is not None:
        if not re.match(r"^\d{4}-\d{2}-\d{2}$", due_date):
            errors["dueDate"] = "Due date must be YYYY-MM-DD format"
    status = data.get("status")
    allowed_status = ["Not Started", "In Progress", "Completed"]
    if status is not None and status not in allowed_status:
        errors["status"] = f"Invalid status: {status}"
    if errors:
        return jsonify({"error": "Validation failed", "details": errors}), 400
    row = db.execute("SELECT * FROM assignments WHERE id = ?", (id,)).fetchone()
    if row is None:
        return jsonify({"error": "Not found"}), 404
    fields = []
    values = []
    if title is not None:
        fields.append("title = ?")
        values.append(title)
    if due_date is not None:
        fields.append("due_date = ?")
        values.append(due_date)
    if status is not None:
        fields.append("status = ?")
        values.append(status)
    if not fields:
        return jsonify({"error": "No fields to update"}), 400
    values.append(id)
    db.execute(f"UPDATE assignments SET {', '.join(fields)} WHERE id = ?", values)
    db.commit()
    updated = db.execute("SELECT * FROM assignments WHERE id = ?", (id,)).fetchone()
    return jsonify(assignment_formater(updated))

@app.route("/api/assignments", methods=["POST"])
def add_assignment():
    db = get_db()
    data = request.get_json() or {}
    errors = {}
    title = (data.get("title") or "").strip()
    if not title:
        errors["title"] = "Title is required"
    due_date = data.get("dueDate")
    if not due_date or not re.match(r"^\d{4}-\d{2}-\d{2}$", due_date):
        errors["dueDate"] = "Due date must be YYYY-MM-DD format"
    allowed_status = ["Not Started", "In Progress", "Completed"]
    status = data.get("status", "Not Started")
    if status not in allowed_status:
        errors["status"] = f"Invalid status: {status}"
    if errors:
        return jsonify({"error": "Validation failed", "details": errors}), 400
    cursor = db.execute(
        "INSERT INTO assignments (title, due_date, status) VALUES (?, ?, ?)",
        (title, due_date, status))
    db.commit()
    assignment_id = cursor.lastrowid
    row = db.execute("SELECT * FROM assignments WHERE id = ?", (assignment_id,)).fetchone()
    return jsonify(assignment_formater(row)), 201

@app.route("/api/assignments/<int:id>", methods=["DELETE"])
def delete_assignment(id):
    db = get_db()
    row = db.execute("SELECT * FROM assignments WHERE id = ?", (id,)).fetchone()
    if row is None:
        return jsonify({"error": "Not found"}), 404
    db.execute("DELETE FROM assignments WHERE id = ?", (id,))
    db.commit()
    return ('', 204)

@app.teardown_appcontext
def close_db(error=None):
    db = g.pop("db",None)
    if db is not None:
        db.close()


if __name__ == "__main__":
    app.run(debug=True)