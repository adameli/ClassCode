
function renderNavigationLoggedIn( user) {
    const parentContainer = document.querySelector( ".userInformation")
    
    parentContainer.innerHTML = `
    <div class="profile">
        <img class="profileImg" src="RESOURCES/userimg.jpg">
    </div>
    `; 

    const profileButton = document.querySelector(".profile");
    parentContainer.addEventListener( "click", event => {
    
    if( !document.querySelector( ".profileMenuNav-shortcut")) {
        parentContainer.innerHTML += `
            <nav class="profileMenuNav-shortcut">
                <div class="profileMenuNav-loggedInUser">
                    <div class="profile">
                        <img class="profileImg" src="RESOURCES/userimg.jpg">
                    </div>
                    <div class="profile-loggedInAs">
                        <p>Account:</p>
                        <p>${user}</p>
                    </div>
                </div>
    
                <div class="profileMenuNav-userOptionsContainer">
                    <div class="profileMenuNav-userOptions profileMenuNav-accountPage">Account Page</div>
                    <div class="profileMenuNav-userOptions profileMenuNav-logoutButton">Logout</div>
                </div>
            </nav>
        `;

        document.querySelector( ".profileMenuNav-logoutButton").addEventListener( "click", removeUserLocalStorage);
        document.querySelector( ".profileMenuNav-accountPage").addEventListener( "click", renderAccountPage);

    }else {
        document.querySelector( ".profileMenuNav-shortcut").remove();
    }

})
}