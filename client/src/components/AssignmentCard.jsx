import { useState } from "react";

function AssignmentCard({ assignment, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    title: assignment.title,
    dueDate: assignment.dueDate,
    status: assignment.status
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  async function handleSave(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    try {
      await onUpdate(assignment.id, form);
      setEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  function handleDeleteClick() {
    if (window.confirm("Delete assignment?")) {
      onDelete(assignment.id);
    }
  }

  return (
    <div style={{ border: "1px solid #ccc", marginBottom: "0.5rem", padding: "0.5rem" }}>
      {editing ? (
        <form onSubmit={handleSave}>
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            required
            pattern="\d{4}-\d{2}-\d{2}"
          />
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option>Not Started</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
          <button type="submit" disabled={saving}>
            {saving ? "Saving..." : "Save"}
          </button>
          <button type="button" onClick={() => setEditing(false)}>
            Cancel
          </button>
          {error && <div style={{ color: "red" }}>{error}</div>}
        </form>
      ) : (
        <>
          <h3>{assignment.title}</h3>
          <div>Due: {assignment.dueDate}</div>
          <div>Status: {assignment.status}</div>
          <button onClick={() => setEditing(true)}>Edit</button>
          <button onClick={handleDeleteClick}>Delete</button>
        </>
      )}
    </div>
  );
}

export default AssignmentCard;