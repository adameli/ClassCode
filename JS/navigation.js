function renderNavigationLoggedIn(user) {
    const parentContainer = document.querySelector(".userInformation")
    const imgName = JSON.parse(localStorage.getItem( "img_name"));

    parentContainer.innerHTML = `
    <div class="profile">
        <img class="profileImg" src="${serverEndpoint}/API/PROFILE_IMG/${imgName}">
    </div>
    <dialog class="dialogDeleteAccount">
        <p>Are you sure that you want to delete your account?</p>
        <button id="cancelDeleteAccount">No</button>
        <button id="deleteAccount">Yes</button>
    </dialog>
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
                    <button class="switchViewMode">LightMode|DarkMode</button>
                </div>
    
                <div class="profileMenuNav-userOptionsContainer">
                    <button class="profileMenuNav-userOptions profileMenuNav-accountPage">Account Page</button>
                    <button class="profileMenuNav-userOptions profileMenuNav-questionPage">Ask a Question</button>
                    <button class="profileMenuNav-userOptions profileMenuNav-logoutButton">Logout</button>
                    <div id="openModalDelete">Delete Account</div>
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

            const myDialog = document.querySelector( ".dialogDeleteAccount");
            document.getElementById( "openModalDelete").addEventListener( "click", event => {
                myDialog.showModal();
            })
            document.getElementById( "cancelDeleteAccount").addEventListener( "click", event => {
                myDialog.close();
            })
            document.getElementById( "deleteAccount").addEventListener( "click", event => {
                event.preventDefault();
                const currentUser = getCurrentUserLocalStorage();
                const deleteUserRequest = new Request( "/API/account.php", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      username: currentUser,
                    }),
                });
                fetchFunction( deleteUserRequest);
                removeUserLocalStorage();
            })

        } else {
            document.querySelector(".profileMenuNav-shortcut").remove();
        }

    })
}