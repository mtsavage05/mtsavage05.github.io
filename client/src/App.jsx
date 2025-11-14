import { useState, useEffect } from "react";
import {
  fetchAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment
} from "./api/assignments";
import Header from "./components/Header";
import AssignmentList from "./components/AssignmentList";
import AssignmentForm from "./components/AssignmentForm";

function App() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  useEffect(() => {
    async function load() {
      setLoading(true);
      setError("");
      try {
        const result = await fetchAssignments();
        setAssignments(result.data);
      } catch (err) {
        setError("Failed to load assignments.");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);


  async function handleAdd(newData) {
    const created = await createAssignment(newData);
    setAssignments(prev => [...prev, created]);
  }


  async function handleUpdate(id, data) {
    const updated = await updateAssignment(id, data);
    setAssignments(assignments =>
      assignments.map(a => (a.id === id ? updated : a))
    );
  }


  async function handleDelete(id) {
    await deleteAssignment(id);
    setAssignments(assignments =>
      assignments.filter(a => a.id !== id)
    );
  }

  return (
    <div style={{ maxWidth: 600, margin: "0 auto", padding: "2rem" }}>
      <Header count={assignments.length} />
      <AssignmentForm onAdd={handleAdd} />
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}
      {!loading && !error && (
        <AssignmentList
          assignments={assignments}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}

export default App;