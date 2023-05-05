async function fetchFunction( request) {

    try {

        const serverResponse = await fetch( request);
        const resource = await serverResponse.json();
        return { response: serverResponse, resource: resource };

    } catch (e) {
        console.log( "error in fetch func");
    };
};

function prepareLoginRegister() {
    // Changes css file & adds home button to return to WelcomeScreen
    document.querySelector( ".modularCss").setAttribute( "href", "CSS/loginRegister.css");
    document.querySelector( ".userInformation").innerHTML = ``;
}

function removeUserLocalStorage() {
    localStorage.removeItem( "user");
    window.location = `${serverEndpoint}`;
}

function checkIfLoggedIn() {
    if( !localStorage.getItem( "user")) {
        window.location = `${serverEndpoint}`;
    }
}

function addCodeBlocktoTextArea( event) {
    codeBlock = `
    *+*
        <span>write Code Here</span>
    *-*`;
    codefield = document.querySelector( "#content");
    codefield.value += codeBlock;
    document.querySelector( "span").focus();
}