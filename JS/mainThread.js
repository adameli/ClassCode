async function renderMainThread() {
   
    document.querySelector( ".modularCss").setAttribute( "href", "CSS/mainThread.css");

    let currentUser = JSON.parse(window.localStorage.getItem("user"));

    // Create logged in User section_________________________________________________
    // document.querySelector( ".userInformation").innerHTML = `
    //     <div class="profile">
    //         <img class="profileImg" src="RESOURCES/userimg.jpg">
    //     </div>
    // `; 
    renderNavigationLoggedIn( currentUser);


    main.innerHTML = `
    <section>
        <div class="profile">
            <h2>Hello ${currentUser}!</h2>
        </div>
        <p> You are know in the feedpage </p>
        
        <form>
            <input type=text id=title placeholder=Title>
            <div class="createPost-mainThread">
                <button>Add a Codeblock</button>
                <textarea type=text id=content placeholder=Content!></textarea>
            </div>
            <button type=submit>Post!</button>
        </form>
    </section>

    <section>
        <div class="mainThread-allThreads"><div>
    </section>
    `;

    let allThreadsRequest = new Request("../API/thread.php?threads=all");
    let allThreads = await fetchFunction(allThreadsRequest);
    console.log(allThreads.resource);

    allThreads.resource.forEach(thredObject => {
        document.querySelector( ".mainThread-allThreads").innerHTML += `
        <div class="postContainer-mainThread">

            <div class="userInfoContainer-mainThread">
                <div class"postTitleContainer-mainThread">
                    <h3 class="post_title-mainThread">${thredObject.title}</h3>
                    <div class="time_stamp-mainThread"> ${thredObject.timestamp["time"]} - ${thredObject.timestamp["date"]}</div>
                </div>
                
                <div class="usersPost-mainThread">
                    <img class="profileImg userInfoPostPicture" src="RESOURCES/userimg.jpg">
                    <div class="user_name-mainThread">${thredObject.username}</div>
                </div>                    
            </div>

            <div class="postContent-mainThread">${thredObject.content}</div>
        </div>
        `;
    });



    // These variables are the input elements where we will get the users credentials
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
    });
}