import AssignmentCard from "./AssignmentCard";

function AssignmentList({ assignments, onUpdate, onDelete }) {
  if (assignments.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "2rem", fontStyle: "italic", color: "#888" }}>
        No assignments match your filters.<br />
        Try adjusting your selection or add a new assignment!
      </div>
    );
  }
  return (
    <div>
      {assignments.map(a => (
        <AssignmentCard
          key={a.id}
          assignment={a}
          onUpdate={onUpdate}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}

export default AssignmentList;