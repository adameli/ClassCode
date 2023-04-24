function questionPageTempName( event) {
    const popupContainerDOM = document.querySelector( ".createQuestionContainer");
    if( !document.querySelector( "form")) {
        popupContainerDOM.innerHTML += `
            <form>
                <input type=text id=title placeholder=Title>
                <div class="createPost-mainThread">
                    <p class="addCodeField-event">Add a Codeblock</p>
                    <textarea type=text id=content placeholder=Content!></textarea>
                </div>
                <button type=submit>Post!</button>
            </form>
        `;

        document.querySelector( ".addCodeField-event").addEventListener( "click", addCodeBlocktoTextArea);

        let titleInput = document.getElementById("title");
    let contentInput = document.getElementById("content");

    // We add a submit function to the form element, when the user submits we send the a new Request to try an login as a user
    let postContentForm = main.querySelector("form");
    postContentForm.addEventListener("submit", async function (event) {
        event.preventDefault();


        try {
            // We make an Requst that we will send to the fetchFunction
            let registerRequest = new Request("../API/thread.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: currentUser,
                    title: titleInput.value,
                    content: contentInput.value,
                }),
            });

            // We fetch and get back an object with {response: serversresponse and resource: the data the server sent back(username)}
            let post = await fetchFunction(registerRequest);

            console.log(post);
            console.log(post.response.ok);

            // controlls if the serverresponse is ok (true or false)
            if (post.response.ok) {
                // If the post was a success we print the thread direct to the feed
                main.innerHTML += `
                <div id="thred">
                    <div id="threadheader">
                        <div id="user_icon">${post.resource.username}</div>
                        <div id="thread_title">${post.resource.title}</div>
                        <div id="time_stamp">${post.resource.timestamp["date"]} ${post.resource.timestamp["time"]}</div>
                    </div>
                    <div id="description">${post.resource.content}</div>
                    <div id="code"></div>
                </div>
                `;
                // feedpage();
            } else {
                message.innerHTML = `Hmm! Something did not work, ${post.resource.message}`;
            }

        } catch (error) {

        }
        location.reload();
    });
    }else {
        document.querySelector( "form").remove();
    }
}

function addCodeBlocktoTextArea( event) {
    codeBlock = `
    *+*
        write Code Here
    *-*`;
    codefield = document.querySelector( "#content");
    codefield.value += codeBlock;
}
