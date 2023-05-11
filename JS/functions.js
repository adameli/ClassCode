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

function convertToCodeblock( input) {
    let firstStageConversion = input.replaceAll("*+*", "<pre><code>");
    const contentInput = firstStageConversion.replaceAll("*-*", "</code></pre>");
    
    function replaceNewLinesWithExceptions( input) { 
        const placeholderPrefix = "PLACEHOLDER"; 
        const codeBlocks = []; 
        
        let index = 0; 
        input = input.replace(/<pre><code>[\s\S]*?<\/code><\/pre>/g, (match) => { 
                const placeholder = `${placeholderPrefix}${index}`;
                codeBlocks[index] = match; index++; 
                return placeholder; 
            }); 
            input = input.replace(/\n/g, '<br>'); 
            
            codeBlocks.forEach((codeBlock, i) => { 
                input = input.replace(`${placeholderPrefix}${i}`, codeBlock);
            }); 
            return input;
        }
    const finalOutput = replaceNewLinesWithExceptions( contentInput);
    return finalOutput;
}