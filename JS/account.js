async function renderAccountPage () {

  const searchQuery = window.location.search;
  const urlParams = new URLSearchParams( searchQuery);
  const userPageName = urlParams.get( "un");

  const userInfoRequest = new Request( "../../API/thread.php?un=" + userPageName);
  let userObjekt = await fetchFunction( userInfoRequest);
  console.log(userObjekt);
  // resourse {
  //   threads: [],
  //   profileInfo: {
  //     img_name: #,
  //     fullname: #,
  //     discord: #,
  //     bio: #
  //   }
  // }
  if(userObjekt.response.ok){
    loadThreads( userObjekt.resource.threads, "You have no threads, Post a thread here...");
  }else {
    loadThreads( [], "Something went wrong... Please try again");
  }

  const profileInfo = userObjekt.resource.profile_info
  document.querySelector( ".profilSettings-accountPage").innerHTML = `
    <div class="imgEditContainer"> 
    <div class='profilePicture-accountPage'><img src=${serverEndpoint}/API/PROFILE_IMG/${userObjekt.resource.img_name}></div>
    <p class="imgMessage"></p> 
    </div>
    <div class='userInfo'>
        <div class='infoParent'>
            <div class='info editableDivs-accountPage' contenteditable='false'>${profileInfo.fullname}</div>
            <div class='info editableDivs-accountPage' contenteditable='false'>${profileInfo.discord}</div>
        </div>
        <div class='profileBio editableDivs-accountPage' contenteditable='false'>${profileInfo.bio}</div>
    </div>
    </div> 
  `;

  if(current_user === userPageName){
    document.querySelector(".imgEditContainer").innerHTML += `
    <form action="../API/register.php" id="formUpload" method="PATCH" enctype="multipart/form-data">
    <input type="file" name="file">
    <button type="submit">Upload</button>
    </form>
    <button id='editButton'> Edit profile </button>
    `
  }


  const profileButton = document.querySelector("#editButton");
  editebleDivs = Array.from(document.querySelectorAll(".editableDivs-accountPage"));
  function editProfile () {
    profileButton.textContent = "Save";
    profileButton.removeEventListener("click", editProfile);
    profileButton.addEventListener("click", saveProfileEdits);
      editebleDivs.forEach(element => {
        element.setAttribute("contenteditable", true);
      });
      editebleDivs[0].focus();
  }

  function saveProfileEdits () {
    profileButton.textContent = "Edit profile";
    profileButton.removeEventListener("click", saveProfileEdits);
    profileButton.addEventListener("click", editProfile);
    editebleDivs.forEach(element => {
      element.setAttribute("contenteditable", false);
    });

    const userPatchRequest = new Request("../../API/account.php", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: current_user,
        profile_info: {
          fullname: editebleDivs[0].textContent,
          discord: editebleDivs[1].textContent,
          bio: editebleDivs[2].textContent,
        },
      }),
  });

  fetchFunction(userPatchRequest);
}
  profileButton.addEventListener("click", editProfile);


  // Here we manage the users Profile Image
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

    if(patchToImage.resource["message"]){
      document.querySelector(".imgMessage").textContent = patchToImage.resource.message;
    }
    
    setTimeout( () => {
      location.reload();
    }, 1000);  
  })

}

renderAccountPage();


