async function renderMainThread() {

    document.querySelector( ".modularCss").setAttribute( "href", "CSS/mainThread.css");

    const currentUser = JSON.parse(window.localStorage.getItem( "user"));
    // create logged in user button
    renderNavigationLoggedIn( currentUser);

    document.querySelector( "main").innerHTML = `
    <section class="topInformation-mainThread">
        <div class="profile">
            <h2>Hello ${currentUser}!</h2>
        </div>
        <p> You are know in the feedpage </p>
        
        <div class="createQuestionContainer">
            <p>Ask a Question</p>
        </div>
    </section>
    <section>
        <div class="sortSearchContainer-mainThread">
            <div class="searchContainer">
                    <input type="search" id="searchbar" placeholder="Search...">
                    <button type="submit"></button>
            </div>
            
            <div class="sortingFiltersShow sortIcon clearButton buttonAnimation"></div>
            <dialog class="filterButtonsContainer-mainThread">
                <div class="filterbuttons-FlexContainer">
                    <div class="clearButton filterButtons-mainThread buttonAnimation" data-filtervalue="views">Most views</div>
                    <div class="clearButton filterButtons-mainThread buttonAnimation" data-filtervalue="comments">Most comments</div>
                    <div class="clearButton filterButtons-mainThread buttonAnimation" data-filtervalue="oldest">Oldest</div>
                    <div class="clearButton filterButtons-mainThread buttonAnimation" data-filtervalue="latest">Latest</div>
                </div>
            </dialog>
        </div>
    </section>
    
    <section>
        <div class="mainThread-allThreads"><div>
    </section>
    `;
    const mainThreadAllThreads = document.querySelector( ".mainThread-allThreads");

    document.querySelector( ".createQuestionContainer").addEventListener( "click", event => {
        window.location = `${serverEndpoint}/PAGE/AskQuestion.html`;
    });

    // SearchBar Open + Close
    const showFilterButton = document.querySelector( ".sortingFiltersShow");
    const filterModal = document.querySelector( ".filterButtonsContainer-mainThread");
    showFilterButton.addEventListener( "click", () => {
        if( document.querySelector( ".filterModalActive")) {
            showFilterButton.classList.remove( "filterModalActive");
            filterModal.close();
            
        }else {
            showFilterButton.classList.add( "filterModalActive");
            filterModal.show();
        }
    })

    //when event is triggered (onclick button), its adds syntax in textarea which will later be converted to <pre>+<code>
    // document.querySelector( ".addCodeField-event").addEventListener( "click", addCodeBlocktoTextArea);

    // Here we get all the threads from the server, then we call the function "loadThreads" to redner all the threads on the mainpage
    const allThreadsRequest = new Request( "../API/thread.php?threads=all");
    let objectWithThreads = await fetchFunction( allThreadsRequest);
    // console.log(objectWithThreads);
    if( objectWithThreads.response.ok){
        loadThreads( objectWithThreads.resource, "No search results...");
    }else {
        loadThreads( [], "Something went wrong... Please try again");
    }

    const searchInput = document.getElementById( "searchbar");
    const searchButton = document.querySelector( ".searchContainer button");
    
    // When the user click the searchButton, We send the searchInputValue to the server and we get back a sorted array with threads that match the searchInputValue 
    searchButton.addEventListener( "click", async event => {
        const searchInputValue = searchInput.value;
        const requestString = new Request( "../API/search_bar.php?s=" + searchInputValue + "&f");
        await AppendLoadingAnimation( mainThreadAllThreads);
        let thredResults = await fetchFunction( requestString);
        console.log(thredResults);
        // Here we call the loadthread function to uppdate the new threads that match the search
        loadThreads( thredResults.resource, "No search results...");
    })

    // When the user clicks on the "Enter" key, We send the searchInputValue to the server and we get back a sorted array with threads that match the searchInputValue 
    searchInput.addEventListener( "keyup", async event => {
        let searchValue = event.currentTarget.value;
        let key = event.key;
        if (key === "Enter") {
            const requestString = new Request( "../API/search_bar.php?s=" + searchValue + "&f");
            await AppendLoadingAnimation( mainThreadAllThreads);
            let thredResults = await fetchFunction( requestString);
            loadThreads( thredResults.resource, "No search results...");
        }
    });

    // This function adds a click on the filterButtons. when clicked, the searchvalue and filterValue is sent to the server and we get back an array that match the searchValue and filterValue
    document.querySelectorAll( ".filterButtons-mainThread").forEach(element => {
        element.addEventListener( "click", async event =>{
            let filterValue = event.currentTarget.dataset.filtervalue;
            const requestString = new Request ( "../API/search_bar.php?s=" + searchInput.value + "&f=" + filterValue);
            await AppendLoadingAnimation( mainThreadAllThreads);
            let thredResults = await fetchFunction( requestString);
            loadThreads( thredResults.resource, "No search results...");
        });
    });

}