let addToy = false;


document.addEventListener("DOMContentLoaded", () => {
  fetchAllToys();
  var addBtn = document.querySelector("#new-toy-btn");
  toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
  var form = document.querySelector(".add-toy-form")
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    let newToyName = event.target.querySelector("input.input-text").value;
    let newToyImage = event.target.querySelector("input.input-url").value;
    addNewToys(newToyName, newToyImage);
  });
});

function fetchAllToys(){
    fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(respObject => respObject.forEach(toy => {
      renderToys(toy)
  })) 
}




// Adding new toys
function addNewToys(newToyName, newToyImage) {
  fetch("http://localhost:3000/toys", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    },
    body: JSON.stringify({
      name: newToyName,
      image: newToyImage,
      likes: 0
    })
  }).then(resp => resp.json())
    .then(toy => {
    renderToys(toy) 
  }) 
}


// Passing the HTML around and adding likes event listenners to the likes buttons
function renderToys(toy) {
  newDiv = document.createElement("div");
  newDiv.classList.add("card");
  newDiv.id = toy.id;
  newDiv.innerHTML = `<h2>${toy.name}</h2>
                        <img src="${toy.image}" class="toy-avatar" />
                        <p>${toy.likes} Likes </p>
                      <button class="like-btn" id="${toy.id}">Like</button>`;
  document.querySelector("#toy-collection").appendChild(newDiv);
  toyForm.style.display = "none";

  let likesButton = document.querySelectorAll(".like-btn")
  for (const likeButton of likesButton)
    likeButton.addEventListener("click", (event) => {
       event.preventDefault();
      let likesTotal = parseInt(event.target.parentElement.querySelector("p").innerHTML.split(" ")[0])
      fetch(`http://localhost:3000/toys/${event.target.parentElement.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          "Accept": "application/json"
        },
        body: JSON.stringify({
          likes: likesTotal + 1
        })
      }).then(resp => resp.json())
      .then(likeJson => {
        let likesContainer = document.getElementById(likeJson.id).querySelector("p")
        let likesContainerValue = likesContainer.innerHTML.split(" ")
        likesContainerValue[0] = likeJson.likes
        likesContainer.innerHTML = likesContainerValue.join(" ")
      })
    })
}




  
