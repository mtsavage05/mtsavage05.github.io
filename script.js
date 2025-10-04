
// function addListItemName(text) {
//     var li = document.createElement("li");
//     li.textContent = text;

//     var deleteBtn = document.createElement("button");
//     deleteBtn.textContent = "Delete";
//     deleteBtn.onclick = function() {
//         li.remove();
//     };
//     var changeBtn = document.createElement("button");
//     changeBtn.textContent = "Edit"
//     changeBtn.onclick = function() {
//         li.toggleAttribute('contenteditable');
//     }
    
//     li.appendChild(changeBtn);

//     li.appendChild(deleteBtn);
//     document.getElementById("itemListName").appendChild(li);
// }

//  function addListItemDate(text) {
//      var li = document.createElement("li");
//      li.textContent = text;

//      var deleteBtn = document.createElement("button");
//      deleteBtn.textContent = "Delete";
    
//      deleteBtn.onclick = function() {
//          li.remove();
//      };
//      var changeBtn = document.createElement("button");
//      changeBtn.onclick = function() {
//          li.toggleAttribute('contenteditable');
//      }
    
//      li.appendChild(changeBtn);

//      li.appendChild(deleteBtn);
//      document.getElementById("itemListDate").appendChild(li);
//  }

//  function addListItemStatus(text) {
//      var li = document.createElement("li");
//      li.textContent = text;

//      var deleteBtn = document.createElement("button");
//      deleteBtn.textContent = "Delete";
//      deleteBtn.onclick = function() {
//          li.remove();
//      }
//      var changeBtn = document.createElement("button");
//      changeBtn.textContent = "Edit"
//      changeBtn.onclick = function() {
//          li.toggleAttribute('contenteditable');
//      }
    
//      li.appendChild(changeBtn);
//      li.appendChild(deleteBtn);
    
//      document.getElementById("itemListStatus").appendChild(li);
//  }


// document.getElementById("addBtnName").onclick = function() {
//     var text = document.getElementById("userInputName").value;
//     if (text.trim() !== "") {
//         addListItemName(text);
//         document.getElementById("userInputName").value = "";
//     }
// }
// document.getElementById("addBtnDate").onclick = function() {
//     var text = document.getElementById("userInputDate").value;
//     if (text.trim() !== "") {
//         addListItemDate(text);
//         document.getElementById("userInputDate").value = "";
//     }
// }

// document.getElementById("addBtnStatus").onclick = function() {
//     var text = document.getElementById("userInputStatus").value;
//     if (text.trim() !== "") {
//         addListItemStatus(text);
//         document.getElementById("userInputStatus").value = "";
//     }
// }

// const searchButton = document.getElementById("searchButton");
// const apiResultsContainer = document.getElementById("apiResultsContainer");


// function renderResults(todos) {
//     apiResultsContainer.innerHTML = "";
//     if (todos.length === 0) {
//         apiResultsContainer.textContent = "No results"
//         return;
//     }
//     todos.forEach(item => {
//         const div = document.createElement("div");
//         div.textContent = item.todo;
//         apiResultsContainer.appendChild(div);
//     });
// }


// searchButton.addEventListener("click", () => {
//     const searchInput = document.getElementById("searchInput");
//     const query = searchInput.value.trim();
//     if (!query) {
//         return;
//     };
//     apiResultsContainer.textContent = "Loading";
//     fetch(`https://dummyjson.com/todos/search?q=${encodeURIComponent(query)}&limit=10`)
//     .then(response => response.json())
//     .then(data => {
//         renderResults(data.todos)
//     })
//     .catch(error => {
//         apiResultsContainer.textContent = "Error: " + error.message;
//     });

// });


searchButton.addEventListener("click", () => {
  const searchInput = document.getElementById("searchInput");
  const query = searchInput.value.trim();
  if (!query) return;

  apiResultsContainer.textContent = "Loading";

  fetch(`https://dummyjson.com/todos/search?q=${encodeURIComponent(query)}&limit=10`)
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      console.log('API response data:', data);
  renderResults(data.todos || []);
    })
    .catch(error => {
      apiResultsContainer.textContent = "Error: " + error.message;
    });
});

function renderResults(todos) {
  apiResultsContainer.innerHTML = "";
  if (!Array.isArray(todos) || todos.length === 0) {
    apiResultsContainer.textContent = "No results";
    return;
  }
  todos.forEach(item => {
    const div = document.createElement("div");
    div.textContent = item.todo;
    apiResultsContainer.appendChild(div);
  });
}




    