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

    <div class="searchContainer">
            <input type="search" id="searchbar" placeholder="Search here">
            <button type="submit"><img id="search_img" src="/RESOURCES/search.png" alt=""></button>
    </div>
    <div class="filterButtonsContainer-mainThread">
        <button class="filterButtons-mainThread" data-filtervalue="views">Most views</button>
        <button class="filterButtons-mainThread" data-filtervalue="comments">Most comments</button>
        <button class="filterButtons-mainThread" data-filtervalue="oldest">Oldest</button>
        <button class="filterButtons-mainThread" data-filtervalue="latest">Latest</button>
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

    async function loadThreads (arrayOfThreads) {
        
        //loops all users and creates postContainers
        document.querySelector( ".mainThread-allThreads").innerHTML = "";
        arrayOfThreads.resource.forEach(threadObject => {
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

    const allThreadsRequest = new Request("../API/thread.php?threads=all");
    let allThreads = await fetchFunction(allThreadsRequest);
    loadThreads(allThreads);

    const searchInput = document.getElementById( "searchbar");
    const searchButton = document.querySelector( ".searchContainer button");
    
    // When the user click the searchButton, We send the searchInputValue to the server and we get back a sorted array with threads that match the searchInputValue 
    searchButton.addEventListener("click", async event => {
        const searchInputValue = searchInput.value;
        const requestString = new Request("../API/search_bar.php?s=" + searchInputValue + "&f");
        let thredResults = await fetchFunction(requestString);
        // Here we call the loadthread function to uppdate the new threads that match the search
        loadThreads(thredResults);
    })
    // When the user clicks on the "Enter" key, We send the searchInputValue to the server and we get back a sorted array with threads that match the searchInputValue 
    searchInput.addEventListener( "keyup", async event => {
        let searchValue = event.currentTarget.value;
        let key = event.key;
        if (key === "Enter") {
            const requestString = new Request("../API/search_bar.php?s=" + searchValue + "&f");
            let thredResults = await fetchFunction(requestString);
            loadThreads(thredResults);
        }
    });
    // This function adds a click on the filterButtons. when clicked, the searchvalue and filterValue is sent to the server and we get back an array that match the searchValue and filterValue
    document.querySelectorAll(".filterButtons-mainThread").forEach(element => {
        element.addEventListener("click", async event =>{
            let filterValue = event.currentTarget.dataset.filtervalue;
            const requestString = new Request ("../API/search_bar.php?s=" + searchInput.value + "&f=" + filterValue);
            let thredResults = await fetchFunction(requestString);
            loadThreads(thredResults);
        });
    });

}