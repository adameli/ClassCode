

checkIfLoggedIn();
renderNavigationLoggedIn();
// We add a submit function to the form element, when the user submits we send the a new Request to try an login as a user

let currentUser = JSON.parse(window.localStorage.getItem("user"));
let postContentForm = document.querySelector(".form > button");
document.querySelector( ".addCodeField-event").addEventListener( "click", addCodeBlocktoTextArea);


    
    postContentForm.addEventListener( "click", async function (event) {
        
        let titleInput = document.getElementById("title").value;
        let descriptionInput = document.getElementById("description").value;
        let unconvertedContentInput = document.getElementById("content").value;

        // Convert all "CODE" to <pre><code></code></pre> tags:
        let firstStageConversion = unconvertedContentInput.replaceAll( "*+*", "<pre><code>");
        let contentInput = firstStageConversion.replaceAll( "*-*", "</code></pre>");


        try {
            // We make an Requst that we will send to the fetchFunction
            let registerRequest = new Request("../API/thread.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: currentUser,
                    title: titleInput,
                    description: descriptionInput,
                    content: contentInput,
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
