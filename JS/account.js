async function renderAccountPage () {

  const searchQuery = window.location.search;
  const urlParams = new URLSearchParams( searchQuery);
  const userPageName = urlParams.get( "un");

  const userInfoRequest = new Request( "../../API/thread.php?un=" + userPageName);
  let userObjekt = await fetchFunction( userInfoRequest);
  // resourse {
  //   threads: [],
  //   img_name: #,
  //   profileInfo: {
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
            <div class='info editableDivs-accountPage fullname' contenteditable='false'>${profileInfo.fullname}</div>
            <div class='info editableDivs-accountPage discord' contenteditable='false'>${profileInfo.discord}</div>    
        </div>
        <div class='info profileBio editableDivs-accountPage' contenteditable='false'>${profileInfo.bio}</div>
    </div> 
  `;

  if(current_user === userPageName){
    document.querySelector(".imgEditContainer").innerHTML += `
    <form action="../API/register.php" id="formUpload" method="PATCH" enctype="multipart/form-data">
      <input type="file" id="profileImage" name="file">
      <label for="profileImage" class="editProfileImage">Edit</label>
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
  const formDom = document.getElementById("formUpload");
  const fileInput = document.getElementById("profileImage");

  fileInput.addEventListener("change", async function (event) {
    event.preventDefault();

    const formData = new FormData(formDom);
    formData.append("username", JSON.parse(window.localStorage.getItem("user")));
    const profileImgRequest = new Request("../../API/account.php", {
        method: "POST",
        body: formData,
    });

    let patchToImage = await fetchFunction(profileImgRequest);
    console.log(patchToImage);

    if(patchToImage.resource["message"]){
      document.querySelector(".imgMessage").textContent = patchToImage.resource.message;
    }
    
    setTimeout( () => {
      location.reload();
    }, 1000);  
  })

}

renderAccountPage();


