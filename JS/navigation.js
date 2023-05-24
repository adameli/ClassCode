function renderNavigationLoggedIn(user) {
    const parentContainer = document.querySelector(".userInformation")
    const imgName = JSON.parse(localStorage.getItem( "img_name"));

    parentContainer.innerHTML = `
    <div class="profile">
        <img class="profileImg" src="${serverEndpoint}/API/PROFILE_IMG/${imgName}">
    </div>
    `;

    const profileButton = document.querySelector(".profile");
    parentContainer.addEventListener("click", event => {

        if (!document.querySelector(".profileMenuNav-shortcut")) {
            parentContainer.innerHTML += `
            <nav class="profileMenuNav-shortcut">
                <div class="profileMenuNav-loggedInUser">
                    <div class="profile">
                        <img class="profileImg" src="${serverEndpoint}/API/PROFILE_IMG/${imgName}">
                    </div>
                    <div class="profile-loggedInAs">
                        <p>Account:</p>
                        <p>${user}</p>
                    </div>
                    <button class="switchViewMode clearButton"></button>
                </div>
    
                <div class="profileMenuNav-userOptionsContainer">
                    <button class="profileMenuNav-userOptions profileMenuNav-accountPage">Account Page</button>
                    <button class="profileMenuNav-userOptions profileMenuNav-questionPage">Ask a Question</button>
                    <button class="profileMenuNav-userOptions profileMenuNav-logoutButton">Logout</button>
                </div>
            </nav>`;

            document.querySelector(".profileMenuNav-logoutButton").addEventListener("click", removeUserLocalStorage);
            document.querySelector(".profileMenuNav-accountPage").addEventListener("click", event => {
                window.location = `${serverEndpoint}/PAGE/user.php/?un=${user}`;
            });
            document.querySelector(".profileMenuNav-questionPage").addEventListener("click", event => {
                window.location = `${serverEndpoint}/PAGE/AskQuestion.html`;
            });

            document.querySelector( ".switchViewMode").addEventListener( "click", switchViewMode);

        } else {
            document.querySelector(".profileMenuNav-shortcut").remove();
        }

    })
}