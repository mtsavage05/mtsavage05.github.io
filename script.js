/*
function createParagraph() {
  const para = document.createElement("button");
  para.textContent = "You clicked the button!";
  document.body.appendChild(para);
}
const buttons = document.querySelectorAll("button");
for (const button of buttons)
    button.addEventListener("click",createParagraph );
*/
document.getElementById("addBtnName").onclick = function() {
    var text = document.getElementById("userInputName").value;
    if (text.trim() !== "") { // Check if input is not empty
        var li = document.createElement("li");
        li.textContent = text;
        document.getElementById("itemListName").appendChild(li);
        document.getElementById("userInputName").value = ""; // Clear the input field
    }
}
document.getElementById("addBtnDate").onclick = function() {
    var text = document.getElementById("userInputDate").value;
    if (text.trim() !== "") { // Check if input is not empty
        var li = document.createElement("li");
        li.textContent = text;
        document.getElementById("itemListDate").appendChild(li);
        document.getElementById("userInputDate").value = ""; // Clear the input field
    }
}
document.getElementById("addBtnStatus").onclick = function() {
    var text = document.getElementById("userInputStatus").value;
    if (text.trim() !== "") { // Check if input is not empty
        var li = document.createElement("li");
        li.textContent = text;
        document.getElementById("itemListStatus").appendChild(li);
        document.getElementById("userInputStatus").value = ""; // Clear the input field
    }
}