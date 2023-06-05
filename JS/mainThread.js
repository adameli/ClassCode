async function renderMainThread() {
    activeTheme();
    document.querySelector( ".modularCss").setAttribute( "href", "CSS/mainThread.css");

    const currentUser = getCurrentUserLocalStorage();
    // create logged in user button
    renderNavigationLoggedIn( currentUser);

    document.querySelector( "main").innerHTML = `
    <section class="topInformation-mainThread">
        <div class="profile">
            <h1>Hello <span>${currentUser}</span></h1>
        </div>
        <div id="quoteParent">
            <p id="quoteOfTheDay"></p>
        </div>
        <div class="createQuestionContainer clearButton buttonAnimation">
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
    <div class="backToTop" id="hiddenUntilLimit"></div>`;

    const programmerQuotes = [
        "The best error message is the one that never shows up. - Thomas Fuchs",
        "Programming is not about typing, it's about thinking. - Rich Hickey",
        "Give a man a program, frustrate him for a day. Teach a man to program, frustrate him for a lifetime.",
        "First, solve the problem. Then, write the code. - John Johnson",
        "Simplicity is the soul of efficiency. - Austin Freeman",
        "It's not a bug, it's an undocumented feature! - Anonymous",
        "Programs must be written for people to read, and only incidentally for machines to execute. - Harold Abelson",
        "The sooner you start to code, the longer the program will take. - Roy Carlson",
        "The only way to learn a new programming language is by writing programs in it. - Dennis Ritchie",
        "Programming is the art of telling another human being what one wants the computer to do. - Donald Knuth",
        "Knowledge is power - Francis Bacon",
        "The Medium is The Message - Marshall Mcluhan",
        "Wax On, Wax Of - Erik Pineiro",
      ];

    const randomQuote = programmerQuotes[Math.floor(Math.random() * programmerQuotes.length)];
    document.getElementById( "quoteOfTheDay").textContent = randomQuote;

    // backToTop function on limit
    const limiter = 700;
    const backToTopButton = document.querySelector( ".backToTop");

    const scrollContainer = () => {
        return document.documentElement || document.body;
    }

    document.addEventListener( "scroll", () => {
        if( scrollContainer().scrollTop > limiter) {
            backToTopButton.removeAttribute( "id");
        }else {
            backToTopButton.id = "hiddenUntilLimit";
        }
    })

    backToTopButton.addEventListener( "click", e => {
        document.body.scrollIntoView();
    })

    document.querySelector( ".createQuestionContainer").addEventListener( "click", event => {
        window.location = `AskQuestion.html`;
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

    // Here we get all the threads from the server, then we call the function "loadThreads" to redner all the threads on the mainpage
    const allThreadsRequest = new Request( "API/thread.php?threads=all");
    let objectWithThreads = await fetchFunction( allThreadsRequest);
    if( objectWithThreads.response.ok){
        loadThreads( objectWithThreads.resource, "No search results...");
    }else {
        console.log( objectWithThreads.resource.message);
        loadThreads( [], "Something went wrong... Please try again");
    }

    const mainThreadAllThreads = document.querySelector( ".mainThread-allThreads");
    const searchInput = document.getElementById( "searchbar");
    const searchButton = document.querySelector( ".searchContainer button");
    
    // When the user click the searchButton, We send the searchInputValue to the server and we get back a sorted array with threads that match the searchInputValue 
    searchButton.addEventListener( "click", async event => {
        const searchInputValue = searchInput.value;
        const requestString = new Request( "API/search_bar.php?s=" + searchInputValue + "&f");
        await AppendLoadingAnimation( mainThreadAllThreads);
        let thredResults = await fetchFunction( requestString);
        if( thredResults.response.ok){
            loadThreads( thredResults.resource, "No search results...");
        }else {
            displayAlert( `Something went wrong, check the console for more info`, thredResults.resource.message);
        }
        // Here we call the loadthread function to uppdate the new threads that match the search
    })

    // When the user clicks on the "Enter" key, We send the searchInputValue to the server and we get back a sorted array with threads that match the searchInputValue 
    searchInput.addEventListener( "keyup", async event => {
        let searchValue = event.currentTarget.value;
        let key = event.key;
        if( key === "Enter") {
            const requestString = new Request( "API/search_bar.php?s=" + searchValue + "&f");
            await AppendLoadingAnimation( mainThreadAllThreads);
            let thredResults = await fetchFunction( requestString);
            if( thredResults.response.ok){
                loadThreads( thredResults.resource, "No search results...");
            }else {
                displayAlert( `Something went wrong, check the console for more info`, thredResults.resource.message);
            }
        }
    });

    // This function adds a click on the filterButtons. when clicked, the searchvalue and filterValue is sent to the server and we get back an array that match the searchValue and filterValue
    document.querySelectorAll( ".filterButtons-mainThread").forEach( element => {
        element.addEventListener( "click", async event =>{
            let filterValue = event.currentTarget.dataset.filtervalue;
            const requestString = new Request ( "API/search_bar.php?s=" + searchInput.value + "&f=" + filterValue);
            await AppendLoadingAnimation( mainThreadAllThreads);
            let thredResults = await fetchFunction( requestString);
            if( thredResults.response.ok){
                loadThreads( thredResults.resource, "No search results...");
            }else {
                displayAlert( `Something went wrong, check the console for more info`, thredResults.resource.message);
            }
        });
    });
}