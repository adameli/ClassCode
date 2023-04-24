async function fetchFunction(request) {

    try {

        const serverResponse = await fetch(request);
        const resource = await serverResponse.json();
        return { response: serverResponse, resource: resource };

    } catch (e) {
        console.log( "error in fetch func");
    };
};

function prepareLoginRegister() {
    // Changes css file & adds home button to return to WelcomeScreen
    document.querySelector( ".modularCss").setAttribute( "href", "CSS/loginRegister.css");
    document.querySelector( ".userInformation").innerHTML = `<div class="returnHome">HOME</div>`;
    
    // Reloads the page and in turn returns to homescreen ( Welcome or mainThread)
    document.querySelector( ".returnHome").addEventListener( "click", event => {
        location.reload();
    })
}

function removeUserLocalStorage() {
    localStorage.removeItem( "user");
    location.reload();
}

function checkIfLoggedIn() {
    if( !localStorage.getItem( "user")) {
        window.location = `${serverEndpoint}`;
    }
}