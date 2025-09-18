/*
function updateName() {
  const name = prompt("Enter a new name");

  button.textContent = `${name}`;
  return name
}

function createArtical() {
    const art = document.createElement('article');
    art.textContent = 'fred'
    document.body.appendChild(art);
}
*/
function createParagraph() {
  const para = document.createElement("button");
  para.textContent = "You clicked the button!";
  document.body.appendChild(para);
}
const buttons = document.querySelectorAll("button");
for (const button of buttons)
    button.addEventListener("click",createParagraph );
