

checkIfLoggedIn();
// We add a submit function to the form element, when the user submits we send the a new Request to try an login as a user

const currentUser = JSON.parse(window.localStorage.getItem("user"));
renderNavigationLoggedIn(currentUser);

const postContentForm = document.querySelector(".form > button");
document.querySelector(".addCodeField-event").addEventListener("click", addCodeBlocktoTextArea);
    
postContentForm.addEventListener("click", async function (event) {
    const titleInput = document.getElementById("title").value;
    const descriptionInput = document.getElementById("description").value;

    // Convert all "CODE" to <pre><code></code></pre> tags:
    let unconvertedContentInput = document.getElementById("content").value;
    let firstStageConversion = unconvertedContentInput.replaceAll("*+*", "<pre><code>");
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

    try {
        // We make an Requst that we will send to the fetchFunction
        const registerRequest = new Request("../API/thread.php", {
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
        console.log("error");
    }
});
