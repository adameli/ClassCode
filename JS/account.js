
const searchQuery = window.location.search;
    const urlParams = new URLSearchParams( searchQuery);
    const userPageName = urlParams.get( "un");

    if(current_user === userPageName){
      document.querySelector(".imgEditContainer").innerHTML += `
      <button id='editButton'> Edit profile </button>
      `
    }

const modal = document.querySelector("#accountDialog");
document.querySelector("#editButton").addEventListener("click", () => {
    modal.showModal();
})
let form = document.querySelector("form");
form.addEventListener("submit",  function (event) {
    event.preventDefault();
    modal.close();
    const values = form.querySelectorAll("input");
    const bioText = form.querySelector("textarea").value;
    console.log(bioText);
    document.querySelector(".userInfo").innerHTML = `
        <div class="infoParent">
            <div class="info">${values[0].value}</div>
            <div class="info">${values[1].value}</div>
        </div>
        <div class='profileBio'>${bioText}</div>
    `;

    const userPatchRequest = new Request("../../API/register.php", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user: current_user,
          profile_info: {
            fullname: values[0].value,
            discord: values[1].value,
            bio: bioText,
          },
        }),
    });

    fetchFunction(userPatchRequest);
            
})

modal.addEventListener("click", e => {
    const dialogDimensions = modal.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      modal.close()
    }
  })
