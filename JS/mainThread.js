async function renderMainThread() {
   
    document.querySelector( ".modularCss").setAttribute( "href", "CSS/mainThread.css");

    let currentUser = JSON.parse(window.localStorage.getItem("user"));

    // create logged in user button
    renderNavigationLoggedIn( currentUser);

    document.querySelector( "main").innerHTML = `
    <section>
        <div class="profile">
            <h2>Hello ${currentUser}!</h2>
        </div>
        <p> You are know in the feedpage </p>
        
        <div class="createQuestionContainer">
            <p>Ask a Question</p>
        </div>
    </section>

    <section>
        <div class="mainThread-allThreads"><div>
    </section>
    `;

    document.querySelector( ".createQuestionContainer").addEventListener( "click", event => {
        window.location = `${serverEndpoint}/PAGE/AskQuestion.html`;
    });
    //when event is triggered (onclick button), its adds syntax in textarea which will later be converted to <pre>+<code>
    // document.querySelector( ".addCodeField-event").addEventListener( "click", addCodeBlocktoTextArea);

    let allThreadsRequest = new Request("../API/thread.php?threads=all");
    let allThreads = await fetchFunction(allThreadsRequest);
    console.log(allThreads.resource);

    //loops all users and creates postContainers
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

            <div class="postContent-mainThread">${thredObject.description}</div>
        </div>
        `;
    });
}