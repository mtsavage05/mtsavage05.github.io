function Filters({ status, setStatus, sortOrder, setSortOrder }) {
  return (
    <div style={{ display: "flex", gap: "1rem", marginBottom: "1rem" }}>
      <label>
        Status Filter:{" "}
        <select
          value={status}
          onChange={e => setStatus(e.target.value)}
          aria-label="Status Filter"
        >
          <option value="All">All</option>
          <option value="Not Started">Not Started</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </label>
      <label>
        Sort by Due Date:{" "}
        <select
          value={sortOrder}
          onChange={e => setSortOrder(e.target.value)}
          aria-label="Sort Order"
        >
          <option value="asc">Earliest First</option>
          <option value="desc">Latest First</option>
        </select>
      </label>
    </div>
  );
}

export default Filters;