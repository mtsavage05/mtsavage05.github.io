from flask import Flask, jsonify, g
import sqlite3
import os
from flask_cors import CORS 

app = Flask(__name__)
CORS(app)

app.config["DATABASE"] = os.path.join(app.instance_path, "app.db")
os.makedirs(app.instance_path, exist_ok=True)

def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(app.confing["DATABASE"])
        g.db.row_factory = sqlite3.Row
    return g.db

@app.route("/api/health")
def health():
    return jsonify({"status": "ok"})

@app.route("/api/assignments")
def get_assignments():
    db = get_db()
    rows = db.execute("SELECT * FROM assignments").fetchall()

@app.teardown_appcontext
def close_db(error=None):
    db = g.pop("db",None)
    if db is not None:
        db.close()


if __name__ == "__main__":
    app.run(debug=True)