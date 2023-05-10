async function renderMainThread() {

    document.querySelector(".modularCss").setAttribute("href", "CSS/mainThread.css");

    const currentUser = JSON.parse(window.localStorage.getItem("user"));
    // create logged in user button
    renderNavigationLoggedIn( currentUser);

    document.querySelector("main").innerHTML = `
    <section>
        <div class="profile">
            <h2>Hello ${currentUser}!</h2>
        </div>
        <p> You are know in the feedpage </p>
        
        <div class="createQuestionContainer">
            <p>Ask a Question</p>
        </div>
    </section>

    <div id="searchContainer">
            <label for="searchbar">Search threads!</label>
            <input type="search" id="searchbar" placeholder="Javascript, Arrayfilter, etc">
    </div>

    <section>
        <div class="mainThread-allThreads"><div>
    </section>
    `;

    document.querySelector(".createQuestionContainer").addEventListener("click", event => {
        window.location = `${serverEndpoint}/PAGE/AskQuestion.html`;
    });
    //when event is triggered (onclick button), its adds syntax in textarea which will later be converted to <pre>+<code>
    // document.querySelector( ".addCodeField-event").addEventListener( "click", addCodeBlocktoTextArea);


    const allThreadsRequest = new Request("../API/thread.php?threads=all");
    let allThreads = await fetchFunction(allThreadsRequest);

    //loops all users and creates postContainers
    allThreads.resource.forEach(threadObject => {
        const postContainerDOM = document.createElement("div");
        postContainerDOM.classList.add("postContainer-mainThread");

        postContainerDOM.innerHTML = `
        <div class="userInfoContainer-mainThread">
                <div class"postTitleContainer-mainThread">
                    <h3 class="post_title-mainThread">${threadObject.title}</h3>
                    <div class="time_stamp-mainThread"> ${threadObject.timestamp["time"]} - ${threadObject.timestamp["date"]}</div>
                    </div>
                
                <div class="usersPost-mainThread">
                    <img class="profileImg userInfoPostPicture" src="RESOURCES/userimg.jpg">
                    <p class="user_name-mainThread">${threadObject.username}</p>
                </div>                    
            </div>

            <div class="postContent-mainThread">${threadObject.description}</div>
            <div class="postContent-mainThread">#${threadObject.tags.join(" #")}</div>
        `;
        document.querySelector( ".mainThread-allThreads").prepend( postContainerDOM);
        
        // create link to threadPage
        const linkToThreadpageElement = document.querySelector( ".post_title-mainThread");
        linkToThreadpageElement.dataset.thread_id = threadObject.thread_id;

        linkToThreadpageElement.addEventListener( "click", event => {
            event.stopPropagation();
            const threadID = event.explicitOriginalTarget.dataset.thread_id;
            window.location = `${serverEndpoint}/PAGE/thread.php?thread_id=${threadID}`;
        })

        // create link to userpage
        const linkToUserPage = document.querySelector( ".userInfoPostPicture");
        linkToUserPage.dataset.username = threadObject.username;

        linkToUserPage.addEventListener( "click", event => {
            event.stopPropagation();
            const dataUsername = event.explicitOriginalTarget.dataset.username;
            window.location = `${serverEndpoint}/PAGE/user.php?un=${dataUsername}`;
        })
        
    });
}