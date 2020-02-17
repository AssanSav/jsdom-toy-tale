let addToy = false;

document.addEventListener("DOMContentLoaded", () => {
  var addBtn = document.querySelector("#new-toy-btn");
  const toyForm = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyForm.style.display = "block";
    } else {
      toyForm.style.display = "none";
    }
  });
  addNewToys();
  renderAllToys(); 
  window.onload = addLikesToToys();
});

function renderAllToys() {
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json())
    .then(respObject => respObject.map(toy => {
      newDiv = document.createElement("div");
      newDiv.classList.add("card");
      newDiv.id = `${toy.id}`;
      newDiv.innerHTML = `<h2>${toy.name}</h2>
                            <img src="${toy.image}" class="toy-avatar" />
                            <p>${toy.likes} Likes </p>
                          <button class="like-btn">Like <3</button>
                          `;                      
      document.querySelector("#toy-collection").appendChild(newDiv);
  })) 
}

function addNewToys() {
  document.querySelector(".submit").addEventListener("click", (event) => {
    event.preventDefault();
    let newToyName = event.target.parentElement.name.value;
    let newToyImage = event.target.parentElement.image.value;
    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        name: newToyName,
        image: newToyImage
      })
    }).then(resp => resp.json())
      .then(toy => {
        console.log("t", toy)
        newDiv = document.createElement("div");
        newDiv.classList.add("card");
        newDiv.id = toy.id;
          newDiv.innerHTML = `<h2>${toy.name}</h2>
                                <img src="${toy.image}" class="toy-avatar" />
                                <p>${toy.likes} Likes </p>
                              <button class="like-btn">Like <3</button>
                              `;
        document.querySelector("#toy-collection").appendChild(newDiv);
    }) 
  })
}


function addLikesToToys() {
  let likeBtns = document.querySelectorAll(".like-btn")
  console.log(likeBtns)
  for (const like of likeBtns) {
    let likeParent = like.parentElement
    debugger
    like.addEventListener("click", (event) => {
      let toyLikes = parseInt(event.target.likeParent.querySelector("p").innerHTML.split(" ")[0])
    })
  }
}

  
