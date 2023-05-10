async function fetchFunction( request) {

    try {

        const serverResponse = await fetch( request);
        const resource = await serverResponse.json();
        return { response: serverResponse, resource: resource };

    } catch (e) {
        console.log( "error in fetch func");
    };
};

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
        Write Code Here
    *-*`;
    codefield = document.querySelector( "#content");
    codefield.value += codeBlock;
   
    // Get the index of the start and end symbols
    const startIndex = codefield.value.lastIndexOf("*+*") + 3;
    const endIndex = codefield.value.lastIndexOf("*-*");

    // Set the selection range to focus on the text between the start and end symbols
    codefield.setSelectionRange(startIndex, endIndex);
    codefield.focus();
}
