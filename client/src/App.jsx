import { useState, useEffect } from "react";
import { fetchAssignments } from "./api/assignments";

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

  return (
    <div>
      <h1>What to Do When?</h1>
      {loading && <div>Loading...</div>}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {!loading && !error && (
        <ul>
          {assignments.length === 0 ? (
            <li>No assignments yet. Create your first one!</li>
          ) : (
            assignments.map(a => (
              <li key={a.id}>
                {a.title} — Due: {a.dueDate} — Status: {a.status}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}

export default App;