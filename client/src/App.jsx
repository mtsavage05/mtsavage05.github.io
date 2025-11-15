import { useState, useEffect } from "react";
import {
  fetchAssignments,
  createAssignment,
  updateAssignment,
  deleteAssignment
} from "./api/assignments";

import Header from "./components/Header";
import Filters from "./components/Filters";
import AssignmentList from "./components/AssignmentList";
import AssignmentForm from "./components/AssignmentForm";
import Loading from "./components/Loading";
import Error from "./components/Error";

function App() {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [sortOrder, setSortOrder] = useState("asc");

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

  const displayAssignments = assignments
    .filter(a =>
      filterStatus === "All" ? true : a.status === filterStatus
    )
    .sort((a, b) => {
      if (sortOrder === "asc")
        return a.dueDate.localeCompare(b.dueDate);
      else
        return b.dueDate.localeCompare(a.dueDate);
    });

  return (
    <div
      style={{
        background: "red",
        color: "black",
        minHeight: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <div
        style={{
          maxWidth: 600,
          width: "100%",
          padding: "2rem",
          background: "white",
          color: "black",
          borderRadius: "12px",
          boxShadow: "0 4px 18px #0002"
        }}
      >
        <Header count={assignments.length} />
        <Filters
          status={filterStatus}
          setStatus={setFilterStatus}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
        />
        <AssignmentForm onAdd={handleAdd} />
        {loading && <Loading />}
        <Error message={error} />
        {!loading && !error && (
          <AssignmentList
            assignments={displayAssignments}
            onUpdate={handleUpdate}
            onDelete={handleDelete}
          />
        )}
      </div>
    </div>
  );
}

export default App;