function updateName() {
  const name = prompt("Enter a new name");

  button.textContent = `${name}`;
  return name
}

function createArtical(name) {
    const art = document.createElement('article');
    art.textContent = name
    document.body.appendChild(art);
}

const button = document.querySelector("button");

button.addEventListener("click", createArtical(updateName));
