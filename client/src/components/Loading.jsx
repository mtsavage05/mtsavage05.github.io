function Loading() {
  return (
    <div
      style={{
        padding: "1rem",
        textAlign: "center",
        fontStyle: "italic",
        color: "#555"
      }}
      role="status"
      aria-live="polite"
    >
      Loading assignments...
    </div>
  );
}

export default Loading;