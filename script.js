
// DOM references
const searchButton = document.getElementById('searchButton');
const searchInput = document.getElementById('searchInput');
const apiResultsContainer = document.getElementById('apiResultsContainer');
const assignmentsContainer = document.getElementById('assignmentsContainer');

let apiResults = [];
let myAssignments = [];

// Normalize API todo item shape to app model
function normalizeTodo(raw) {
  return {
    id: `api-${raw.id}`,
    title: raw.todo,
    dueDate: generateDueDate(raw.id),
    status: raw.completed ? "Completed" : "Not Started",
    source: "api"
  };
}

// Generate a due date within next 21 days based on id
function generateDueDate(id) {
  const today = new Date();
  today.setDate(today.getDate() + (id % 21));
  return today.toISOString().slice(0, 10);
}

// Fetch and search API Todos
searchButton.addEventListener("click", () => {
  const query = searchInput.value.trim().toLowerCase();
  if (!query) return;

  apiResultsContainer.textContent = "Loading...";

  // Fetch a batch of todos (e.g., 100)
  fetch(`https://dummyjson.com/todos?limit=100`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
      return res.json();
    })
    .then(data => {
      // Filter results client-side using the search query
      const filtered = data.todos.filter(todo => todo.todo.toLowerCase().includes(query));

      apiResults = filtered.map(normalizeTodo);

      if (apiResults.length === 0) {
        apiResultsContainer.textContent = "No results";
      } else {
        renderApiResults(apiResults);
      }
    })
    .catch(err => {
      apiResultsContainer.textContent = "Error: " + err.message;
    });
});

// Render API results with Import buttons
function renderApiResults(todos) {
  apiResultsContainer.innerHTML = '';
  todos.forEach(item => {
    const div = document.createElement('div');
    div.className = 'todo-item';

    div.innerHTML = `
      <strong>${item.title}</strong><br>
      Due: ${item.dueDate}<br>
      Status: ${item.status}
    `;

    const importBtn = document.createElement('button');
    importBtn.textContent = 'Import';
    importBtn.disabled = myAssignments.some(a => a.id === item.id);
    importBtn.addEventListener('click', () => {
      importAssignment(item);
      importBtn.disabled = true;
    });

    div.appendChild(importBtn);
    apiResultsContainer.appendChild(div);
  });
}

// Import assignment to "My Assignments"
function importAssignment(item) {
  myAssignments.push({...item});
  renderMyAssignments();
}

// Render "My Assignments" with inline editing, status, delete
function renderMyAssignments() {
  assignmentsContainer.innerHTML = '';
  if (myAssignments.length === 0) {
    assignmentsContainer.textContent = "No assignments";
    return;
  }

  myAssignments.forEach((assignment, index) => {
    const div = document.createElement('div');
    div.className = 'assignment-item';

    div.innerHTML = `
      <input type="text" class="title" value="${assignment.title}" />
      <input type="date" class="dueDate" value="${assignment.dueDate}"/>
      <select class="status">
        <option value="Not Started" ${assignment.status === 'Not Started' ? 'selected' : ''}>Not Started</option>
        <option value="In Progress" ${assignment.status === 'In Progress' ? 'selected' : ''}>In Progress</option>
        <option value="Completed" ${assignment.status === 'Completed' ? 'selected' : ''}>Completed</option>
      </select>
      <button class="delete-btn">Delete</button>
    `;

    // Editable fields update model
    div.querySelector('.title').addEventListener('input', e => {
      assignment.title = e.target.value;
    });

    div.querySelector('.dueDate').addEventListener('change', e => {
      assignment.dueDate = e.target.value;
    });

    div.querySelector('.status').addEventListener('change', e => {
      assignment.status = e.target.value;
    });

    // Delete assignment
    div.querySelector('.delete-btn').addEventListener('click', () => {
      myAssignments.splice(index, 1);
      renderMyAssignments();
      // Optionally re-enable import button in API results
      renderApiResults(apiResults);
    });

    assignmentsContainer.appendChild(div);
  });
}

// DOM references for user input
const newTodoInput = document.getElementById('newTodoInput');
const addTodoBtn = document.getElementById('addTodoBtn');

addTodoBtn.addEventListener('click', () => {
  const newTodoText = newTodoInput.value.trim();
  if (!newTodoText) return; // Prevent adding empty todos

  // Create a new assignment object according to the data model
  const newAssignment = {
    id: `local-${Date.now()}`, // Unique id based on timestamp
    title: newTodoText,
    dueDate: new Date().toISOString().slice(0, 10), // Today’s date in ISO format
    status: "Not Started",
    source: "local"
  };

  // Add this new item to your existing assignments array
  myAssignments.push(newAssignment);

  // Re-render "My Assignments" to show the new todo
  renderMyAssignments();

  // Clear input box for convenience
  newTodoInput.value = '';
});