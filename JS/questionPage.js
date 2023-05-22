

checkIfLoggedIn();
// We add a submit function to the form element, when the user submits we send the a new Request to try an login as a user

const currentUser = getCurrentUserLocalStorage();
renderNavigationLoggedIn( currentUser);
deployCharacterLimit();

document.querySelector( ".addCodeField-event").addEventListener( "click", addCodeBlocktoTextArea);
const postContentForm = document.querySelector( ".form > button");
postContentForm.addEventListener( "click", async function (event) {
    const titleInput = document.getElementById( "title").value;
    const descriptionInput = document.getElementById( "description").value;
    let unconvertedContentInput = document.getElementById( "content").value;

    if ( titleInput.length === 0 || titleInput.trim() === "") {
        document.getElementById( "title").focus()
        document.body.scrollIntoView();
        document.querySelector( ".titleContainer div p").classList.add( "emptyValue");
        if ( descriptionInput.length === 0 || descriptionInput.trim() === ""){
            document.querySelector( ".descriptionContainer div p").classList.add( "emptyValue");
        } else {
            document.querySelector( ".descriptionContainer div p").classList.remove( "emptyValue");
        }
        return
    } else {
        document.querySelector( ".titleContainer div p").classList.remove( "emptyValue");
    }

    if (descriptionInput.length === 0 || descriptionInput.trim() === "") {
        document.getElementById( "description").focus()
        document.querySelector( ".descriptionContainer div p").classList.add( "emptyValue");
        return
    }

    // Convert all "CODE" to <pre><code></code></pre> tags:
    const contentInput = convertToCodeblock( unconvertedContentInput);

    // We make an Requst that we will send to the fetchFunction
    const registerRequest = new Request( "../API/thread.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
            username: currentUser,
            title: titleInput,
            description: descriptionInput,
            content: contentInput,
            tags: tagsArray,
        }),
    });

    // We fetch and get back an object with {response: serversresponse and resource: the data the server sent back(username)}
    let post = await fetchFunction( registerRequest);

    // controlls if the serverresponse is ok (true or false)
    if ( post.response.ok) {
        window.location = `${serverEndpoint}`;
    } else {
        displayAlert( "Error!! Check the console");
        console.log( post.resource.message);
    }
});
