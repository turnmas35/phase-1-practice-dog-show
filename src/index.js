document.addEventListener('DOMContentLoaded', () => {

    const dogForm = document.getElementById("dog-form")
    let dogId = ""
    const tableBody = document.getElementById("table-body");

    fetchDogs()

    function fetchDogs(dog) {
        fetch(`http://localhost:3000/dogs`)
          .then(res => res.json())
          .then(jsonDogs => {
            jsonDogs.forEach(dog => {
            createDogTable(dog)
          })
        })
        };


function createDogTable(dog) {
    const tableBody = document.getElementById("table-body");

          const tr = document.createElement("tr");

          const nameTd = document.createElement("td");
          nameTd.textContent = dog.name;

          const breedTd = document.createElement("td");
          breedTd.textContent = dog.breed;

          const sexTd = document.createElement("td");
          sexTd.textContent = dog.sex;

          const editTd = document.createElement("td");
          const editButton = document.createElement("button");
          editButton.textContent = "Edit Dog";

          editTd.appendChild(editButton);

          tr.appendChild(nameTd);
          tr.appendChild(breedTd);
          tr.appendChild(sexTd);
          tr.appendChild(editTd);

          tableBody.appendChild(tr);

editButton.addEventListener("click", function(e){
    e.preventDefault();
    dogForm.childNodes[1].value = dog.name
    dogForm.childNodes[3].value = dog.breed
    dogForm.childNodes[5].value = dog.sex
    dogId = dog.id
})

}

dogForm.addEventListener("submit", function(e){
    e.preventDefault();

    fetch(`http://localhost:3000/dogs/${dogId}`, {
    method: "PATCH",
    headers:
    {
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify({
        name: dogForm.childNodes[1].value,
        breed: dogForm.childNodes[3].value,
        sex: dogForm.childNodes[5].value
    })

  })
  .then((response) => response.json())
  .then((json) => {
    tableBody.innerHTML = ""
    fetchDogs()
  })
})

})
