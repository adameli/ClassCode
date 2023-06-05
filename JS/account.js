async function renderAccountPage () {
  activeTheme();
  const loggedInBoolean = getCurrentUserLocalStorage() ? true : false;
  const messageContainer = document.querySelector( ".threadSection-userPage");
  const currentUser = getCurrentUserLocalStorage();

  // Viewingmode + navigation based on position of current page
  controlViewingMode( loggedInBoolean, messageContainer);
  
  const userPageName = getGetSearchParam( "un");

  if( userPageName === "[DELETED ACCOUNT]") {
    document.querySelector( ".mainThread-allThreads").innerHTML = `
      <p style="text-align:center;">We send our regards to the dearly departed [DELETED ACCOUNT], The class will surely miss you...</p>
    `;
    return;
  }

  const userInfoRequest = new Request( "API/thread.php?un=" + userPageName);
  let userObjekt = await fetchFunction( userInfoRequest);

  let lastVisitedThread = userObjekt.resource.date_visited_thread
  let userThreads = userObjekt.resource.threads
  let threadsUserNotSeen = [];

  // get current logged in user, compare last visited threads against last updated comment on page, if visit < last comment, display notification
  if(getCurrentUserLocalStorage() === userPageName){
    for ( const lastVisitedThreadId in lastVisitedThread) {
      
      for ( const thread of userThreads){
        if(thread.comments.length === 0){
          continue
        }
        if( parseInt( lastVisitedThreadId) === thread.thread_id){
          let lastVisitedThreadDate = lastVisitedThread[lastVisitedThreadId].date + " " + lastVisitedThread[lastVisitedThreadId].time;
          let latestCommentDate = thread.comments[thread.comments.length-1].timestamp.date + " " + thread.comments[thread.comments.length-1].timestamp.time;

          const date1 = new Date(lastVisitedThreadDate);
          const date2 = new Date(latestCommentDate);
          if (date1 < date2) {
            threadsUserNotSeen.push(thread.thread_id);
          }
        }

      }
    }
  }

  if(userObjekt.response.ok){
    loadThreads( userObjekt.resource.threads, "You have no threads, Go and Ask a Question", "PAGE", threadsUserNotSeen);
  }else {
    loadThreads( [], "Something went wrong... Please try again");
  }

  const profileInfo = userObjekt.resource.profile_info
  document.querySelector( ".profilSettings-accountPage").innerHTML += `
    <div class="userContainer-userPage">  
      <div class="userFlexItem-userPage">
        <div class="imgEditContainer"> 
          <div class='profilePicture-accountPage' style="background-image:url( 'API/PROFILE_IMG/${userObjekt.resource.img_name}');"></div>
          <p class="imgMessage"></p> 
        </div>
        <div class='userInfo'>
            <div class='infoParent'>
                <div class='info editableDivs-accountPage fullname' contenteditable='false'>${profileInfo.fullname}</div>
                <div class='info editableDivs-accountPage discord' contenteditable='false'>${profileInfo.discord}</div>    
            </div>
            <div class='info profileBio editableDivs-accountPage' contenteditable='false'>${profileInfo.bio}</div>
        </div>
      </div>
    </div>
 
    `;

  // if logged in user is on own userpage, enable edit functions
  if(getCurrentUserLocalStorage() === userPageName){
    document.querySelector(".imgEditContainer").innerHTML += `
    <form  id="formUpload" method="PATCH" enctype="multipart/form-data">
      <input type="file" id="profileImage" name="file">
      <label for="profileImage" class="editProfileImage"></label>
    </form>
    `;

    document.querySelector( ".userInfo").innerHTML += `
      <button id='editButton' class="editProfileInfo"></button>
    `
  }

  const profileButton = document.querySelector("#editButton");
  editebleDivs = Array.from(document.querySelectorAll(".editableDivs-accountPage"));
  function editProfile () {
    profileButton.classList.remove( "editProfileInfo");
    profileButton.classList.add( "saveProfileInfo");
    profileButton.removeEventListener("click", editProfile);
    profileButton.addEventListener("click", saveProfileEdits);
      editebleDivs.forEach(element => {
        element.setAttribute("contenteditable", true);
      });
      editebleDivs[0].focus();
  }

  async function saveProfileEdits () {
    profileButton.classList.remove( "saveProfileInfo");
    profileButton.classList.add( "editProfileInfo");
    profileButton.removeEventListener("click", saveProfileEdits);
    profileButton.addEventListener("click", editProfile);
    editebleDivs.forEach(element => {
      element.setAttribute("contenteditable", false);
    });

    const userPatchRequest = new Request("API/account.php", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        user: currentUser,
        profile_info: {
          fullname: editebleDivs[0].textContent,
          discord: editebleDivs[1].textContent,
          bio: editebleDivs[2].textContent,
        },
      }),
  });

  const userBio = await fetchFunction( userPatchRequest);
  if( !userBio.response.ok){
    displayAlert( "Error!! Check the console", userBio.resource.message);
  }

}
  profileButton.addEventListener("click", editProfile);


  // Here we manage the users Profile Image
  const formDom = document.getElementById("formUpload");
  const fileInput = document.getElementById("profileImage");

  fileInput.addEventListener("change", async function (event) {
    event.preventDefault();

    const formData = new FormData(formDom);
    formData.append("username", getCurrentUserLocalStorage());
    const profileImgRequest = new Request("API/account.php", {
        method: "POST",
        body: formData,
    });

    let patchToImage = await fetchFunction(profileImgRequest);

    if(patchToImage.resource["message"]){
      document.querySelector(".imgMessage").textContent = patchToImage.resource.message;
      return
    }
    window.localStorage.setItem( "img_name", JSON.stringify( patchToImage.resource));
    
    setTimeout( () => {
      location.reload();
    }, 1000);  
  })

}

renderAccountPage();


