document.addEventListener("DOMContentLoaded", () => {
  // DOM references
  const searchButton = document.getElementById('searchButton');
  const searchInput = document.getElementById('searchInput');
  const apiResultsContainer = document.getElementById('apiResultsContainer');
  const assignmentsContainer = document.getElementById('assignmentsContainer');

  let apiResults = [];
  let myAssignments = [];

  // Normalize API todo item shape to app model

  function normalizeTodo(raw) {
    return raw;
  }



  // Fetch and search API Todos
  searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim().toLowerCase();
    if (!query) return;

    apiResultsContainer.textContent = "Loading...";

    // Fetch a batch of todos (e.g., 100)
    fetch('http://127.0.0.1:5000/api/assignments')
      .then(res => {
        if (!res.ok) throw new Error(`HTTP error! Status: ${res.status}`);
        return res.json();
      })
      .then(data => {
        // Filter results client-side using the search query
        const filtered = data.data.filter(assignment => assignment.title.toLowerCase().includes(query));

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
      importBtn.textContent = 'Edit';
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
      div.querySelector('.title').addEventListener('change', e => {
        fetch(`http://127.0.0.1:5000/api/assignments/${assignment.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title: e.target.value })
        })
        .then(res => res.json())
        .then(updated => {
          Object.assign(assignment, updated); // update local object with backend data
          renderMyAssignments();
        });
      });

      div.querySelector('.dueDate').addEventListener('change', e => {
        fetch(`http://127.0.0.1:5000/api/assignments/${assignment.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ dueDate: e.target.value })
        })
        .then(res => res.json())
        .then(updated => {
          Object.assign(assignment, updated);
          renderMyAssignments();
        });
      });

      div.querySelector('.status').addEventListener('change', e => {
        fetch(`http://127.0.0.1:5000/api/assignments/${assignment.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: e.target.value })
        })
        .then(res => res.json())
        .then(updated => {
          Object.assign(assignment, updated);
          renderMyAssignments();
        });
      });

      // Delete assignment
      div.querySelector('.delete-btn').addEventListener('click', () => {
        fetch(`http://127.0.0.1:5000/api/assignments/${assignment.id}`, {
          method: "DELETE"
        })
        .then(res => {
          if (res.status === 204) {
            myAssignments.splice(index, 1);           // Remove from local list only on success
            renderMyAssignments();
            renderApiResults(apiResults);
          } else {
            res.json().then(error => {
              alert("Delete failed: " + (error.error || "Unknown error"));
            });
          }
        });
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

  const todayIso = new Date().toISOString().slice(0, 10);

  fetch('http://127.0.0.1:5000/api/assignments', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      title: newTodoText,
      dueDate: todayIso,
      status: "Not Started"
    })
  })
  .then(res => res.json())
  .then(newAssignment => {
    myAssignments.push(newAssignment); 
    renderMyAssignments();
    newTodoInput.value = '';
  });

  });
});