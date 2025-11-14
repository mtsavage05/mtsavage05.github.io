function Header({ count }) {
  return (
    <header style={{ marginBottom: "2rem" }}>
      <h1>What to Do When?</h1>
      <div>{typeof count === "number" ? `Assignments: ${count}` : null}</div>
    </header>
  );
}

export default Header;