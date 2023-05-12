
const searchQuery = window.location.search;
    const urlParams = new URLSearchParams( searchQuery);
    const userPageName = urlParams.get( "un");

    if(current_user === userPageName){
      document.querySelector(".imgEditContainer").innerHTML += `
      <form action="../API/register.php" id="formUpload" method="PATCH" enctype="multipart/form-data">
      <input type="file" name="file">
      <button type="submit">Upload</button>
      </form>
      `
    }

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

    const userPatchRequest = new Request("../../API/account.php", {
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


  const form_dom = document.getElementById("formUpload");
  form_dom.addEventListener("submit", async function (event) {

    event.preventDefault();

    const formData = new FormData(form_dom);
    formData.append("username", JSON.parse(window.localStorage.getItem("user")));
    const profileImgRequest = new Request("../../API/account.php", {
        method: "POST",
        body: formData,
    });

    let patchToImage = await fetchFunction(profileImgRequest);
    
    setTimeout( () => {
      location.reload();
    }, 1000);  
  })
