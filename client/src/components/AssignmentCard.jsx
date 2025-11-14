function AssignmentCard({ assignment }) {
  return (
    <div style={{ border: "1px solid #ccc", marginBottom: "0.5rem", padding: "0.5rem" }}>
      <h3>{assignment.title}</h3>
      <div>Due: {assignment.dueDate}</div>
      <div>Status: {assignment.status}</div>
      {}
    </div>
  );
}

export default AssignmentCard;