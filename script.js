
function addListItemName(text) {
    var li = document.createElement("li");
    li.textContent = text;

    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function() {
        li.remove();
    };
    var changeBtn = document.createElement("button");
    changeBtn.textContent = "Edit"
    changeBtn.onclick = function() {
        li.toggleAttribute('contenteditable');
    }
    
    li.appendChild(changeBtn);

    li.appendChild(deleteBtn);
    document.getElementById("itemListName").appendChild(li);
}
function addListItemDate(text) {
    var li = document.createElement("li");
    li.textContent = text;

    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    
    deleteBtn.onclick = function() {
        li.remove();
    };
    var changeBtn = document.createElement("button");
    changeBtn.textContent = "Edit"
    changeBtn.onclick = function() {
        li.toggleAttribute('contenteditable');
    }
    
    li.appendChild(changeBtn);

    li.appendChild(deleteBtn);
    document.getElementById("itemListDate").appendChild(li);
}

function addListItemStatus(text) {
    var li = document.createElement("li");
    li.textContent = text;

    var deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.onclick = function() {
        li.remove();
    }
    var changeBtn = document.createElement("button");
    changeBtn.textContent = "Edit"
    changeBtn.onclick = function() {
        li.toggleAttribute('contenteditable');
    }
    
    li.appendChild(changeBtn);
    li.appendChild(deleteBtn);
    
    document.getElementById("itemListStatus").appendChild(li);
}


document.getElementById("addBtnName").onclick = function() {
    var text = document.getElementById("userInputName").value;
    if (text.trim() !== "") {
        addListItemName(text);
        document.getElementById("userInputName").value = "";
    }
}
document.getElementById("addBtnDate").onclick = function() {
    var text = document.getElementById("userInputDate").value;
    if (text.trim() !== "") {
        addListItemDate(text);
        document.getElementById("userInputDate").value = "";
    }
}

document.getElementById("addBtnStatus").onclick = function() {
    var text = document.getElementById("userInputStatus").value;
    if (text.trim() !== "") {
        addListItemStatus(text);
        document.getElementById("userInputStatus").value = "";
    }
}