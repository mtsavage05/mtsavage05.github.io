const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export async function fetchAssignments() {
  const response = await fetch(`${API_BASE_URL}/api/assignments`);
  if (!response.ok) throw new Error("Failed to fetch assignments");
  return response.json();
}

export async function createAssignment(data) {
  const response = await fetch(`${API_BASE_URL}/api/assignments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.details
        ? Object.values(errorData.details).join(" ")
        : "Failed to create assignment."
    );
  }
  return response.json();
}

export async function updateAssignment(id, data) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(`${API_BASE_URL}/api/assignments/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data)
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.details
        ? Object.values(errorData.details).join(" ")
        : "Failed to update assignment."
    );
  }
  return response.json();
}

export async function deleteAssignment(id) {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const response = await fetch(`${API_BASE_URL}/api/assignments/${id}`, {
    method: "DELETE"
  });
  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.details
        ? Object.values(errorData.details).join(" ")
        : "Failed to delete assignment."
    );
  }

}