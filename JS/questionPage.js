
    // document.querySelector( ".addCodeField-event").addEventListener( "click", addCodeBlocktoTextArea);
   
    checkIfLoggedIn();
    renderNavigationLoggedIn();
    // We add a submit function to the form element, when the user submits we send the a new Request to try an login as a user

    let currentUser = JSON.parse(window.localStorage.getItem("user"));
    let postContentForm = document.querySelector(".form > button");
    postContentForm.addEventListener( "click", async function (event) {
        
        let titleInput = document.getElementById("title");
        let descriptionInput = document.getElementById("description")
        let contentInput = document.getElementById("content");

        
        try {
            // We make an Requst that we will send to the fetchFunction
            let registerRequest = new Request("../API/thread.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: currentUser,
                    title: titleInput.value,
                    description: descriptionInput.value,
                    content: contentInput.value,
                }),
            });
            
            // We fetch and get back an object with {response: serversresponse and resource: the data the server sent back(username)}
            let post = await fetchFunction(registerRequest);

            console.log(post);
            console.log(post.response.ok);

            // controlls if the serverresponse is ok (true or false)
            if (post.response.ok) {
                window.location = `${serverEndpoint}`;
            } else {
                // message.innerHTML = `Hmm! Something did not work, ${post.resource.message}`;
            }

        } catch (error) {
            console.log( "error");
        }
    });

function addCodeBlocktoTextArea( event) {
    codeBlock = `
    *+*
        write Code Here
    *-*`;
    codefield = document.querySelector( "#content");
    codefield.value += codeBlock;
}
