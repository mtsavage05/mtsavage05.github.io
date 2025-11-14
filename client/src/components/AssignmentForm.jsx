import { useState } from "react";

const initialState = { title: "", dueDate: "", status: "Not Started" };

function AssignmentForm({ onAdd }) {
  const [form, setForm] = useState(initialState);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Controlled input handler
  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  // Form submit handler
  async function handleSubmit(e) {
    e.preventDefault();
    setSaving(true);
    setError("");
    // Basic client-side validation
    if (!form.title.trim()) {
      setError("Title is required.");
      setSaving(false);
      return;
    }
    if (!/^\d{4}-\d{2}-\d{2}$/.test(form.dueDate)) {
      setError("Due date must be YYYY-MM-DD.");
      setSaving(false);
      return;
    }
    try {
      await onAdd(form);
      setForm(initialState); // reset form after successful add
    } catch (err) {
      setError(err.message);
    } finally {
      setSaving(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
      <div>
        <label>
          Title:
          <input
            name="title"
            value={form.title}
            onChange={handleChange}
            required
          />
        </label>
      </div>
      <div>
        <label>
          Due Date:
          <input
            type="date"
            name="dueDate"
            value={form.dueDate}
            onChange={handleChange}
            required
            pattern="\d{4}-\d{2}-\d{2}"
          />
        </label>
      </div>
      <div>
        <label>
          Status:
          <select
            name="status"
            value={form.status}
            onChange={handleChange}
          >
            <option>Not Started</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </label>
      </div>
      <button type="submit" disabled={saving}>
        {saving ? "Saving..." : "Add Assignment"}
      </button>
      {error && <div style={{ color: "red" }}>{error}</div>}
    </form>
  );
}

export default AssignmentForm;