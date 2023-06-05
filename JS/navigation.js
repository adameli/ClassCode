function renderNavigationLoggedIn( user, endpointDecider) {

    // createEndPointVars( endpointDecider);

    const parentContainer = document.querySelector( ".userInformation")
    const imgName = JSON.parse(localStorage.getItem( "img_name"));

    // document.querySelector( "header").innerHTML = `
    // <div>
    //     <div class="homebutton-navigation">
    //         <img src="RESOURCES/ICONS/home.png" alt="HOMEBUTTON">
    //     </div>
    // </div>
    // <h3>ClassCode</h3>
    // <div class="userInformation">
    //     <div class="loginButtonHeader clearButton buttonAnimation">Login</div>
    // </div> 
    // `;

    document.querySelector( "footer").innerHTML = `
        <h3>2023 || Malmö University</h3> 
        <p>Projekt Du3 || Webbaserad Design & Utvecklig</p>
        <p>Created by: Adam Eliasson, Isak Makra & Teo Hardemo</p>`;

    parentContainer.innerHTML = `
    <div class="profile">
        <img class="profileImg" src="API/PROFILE_IMG/${imgName}">
    </div>
    <dialog class="dialogDeleteAccount">
        <p>Are you sure that you want to delete your account?</p>
        <button id="cancelDeleteAccount">No</button>
        <button id="deleteAccount">Yes</button>
    </dialog>
    `;

    const profileButton = document.querySelector( ".profile");
    parentContainer.addEventListener( "click", event => {

        if( !document.querySelector( ".profileMenuNav-shortcut")) {
            parentContainer.innerHTML += `
            <nav class="profileMenuNav-shortcut">
                <div class="profileMenuNav-loggedInUser">
                    <div class="profile">
                        <img class="profileImg" src="API/PROFILE_IMG/${imgName}">
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
                    <div id="openModalDelete">Delete Account</div>
                </div>
            </nav>`;

            document.querySelector( ".profileMenuNav-logoutButton").addEventListener( "click", event => {
                // homeButtonEndpoint = endpointDecider === "PAGE" ? "../../" : "../";
                removeUserLocalStorage();
            });

            document.querySelector( ".profileMenuNav-accountPage").addEventListener( "click", event => {
                window.location = `user.html?un=${user}`;
            });

            document.querySelector( ".profileMenuNav-questionPage").addEventListener( "click", event => {
                window.location = `AskQuestion.html`;
            });

            document.querySelector( ".switchViewMode").addEventListener( "click", event => {
                switchViewMode( endpointDecider);
            });

            const myDialog = document.querySelector( ".dialogDeleteAccount");
            document.getElementById( "openModalDelete").addEventListener( "click", event => {
                myDialog.showModal();
            })

            document.getElementById( "cancelDeleteAccount").addEventListener( "click", event => {
                myDialog.close();
            })

            document.getElementById( "deleteAccount").addEventListener( "click", async function( event) {
                event.preventDefault();
                const currentUser = getCurrentUserLocalStorage();
                const deleteUserRequest = new Request( `API/account.php`, {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      username: currentUser,
                    }),
                });
                await fetchFunction( deleteUserRequest);
                // homeButtonEndpoint = endpointDecider === "PAGE" ? "../../" : "../";
                removeUserLocalStorage();
            })

        } else {
            document.querySelector(".profileMenuNav-shortcut").remove();
        }

    })
}