async function fetchFunction(request) {

    try {

        const serverResponse = await fetch(request);
        const resource = await serverResponse.json();
        return { response: serverResponse, resource: resource };

    } catch (e) {

    };
};

function prepareLoginRegister() {
    // Changes css file & adds home button to return to WelcomeScreen
    document.querySelector( ".modularCss").setAttribute( "href", "CSS/loginRegister.css");
    document.querySelector( ".userInformation").innerHTML = `<div class="returnHome">HOME</div>`;
    document.querySelector( ".returnHome").addEventListener( "click", event => {
        location.reload();
    })
}