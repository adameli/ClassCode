const serverEndpoint = "http://localhost:9999";

async function fetchFunction( request) {

    try {

        const serverResponse = await fetch( request);
        const resource = await serverResponse.json();
        return { response: serverResponse, resource: resource };

    } catch (e) {
        console.log( "error in fetch func");
        displayAlert("The server is not working at the moment, Please try again soon");
    };
};

function removeUserLocalStorage() {
    localStorage.removeItem( "user");
    localStorage.removeItem( "img_name")
    window.location = `${serverEndpoint}`;
}

function controlViewingMode( loggedInBoolean, messageContainer) {
    if( loggedInBoolean) {
        renderNavigationLoggedIn( getCurrentUserLocalStorage());
    }else {
        messageContainer.innerHTML = `<p class="notLoggedInMessage" style="text-align:center;">You are now in viewing Mode, <a href='${serverEndpoint}'>Sign In or Register</a> to Comment & Like</p>`;
    }
}

 function getCurrentUserLocalStorage() {
    return JSON.parse(localStorage.getItem( "user"));
 }

function checkIfLoggedIn() {
    if( !localStorage.getItem( "user")) {
        window.location = `${serverEndpoint}`;
    }
}

function addCodeBlocktoTextArea( event) {
    codeBlock = `
    *+*
        Write Code Here
    *-*`;

    codefield = document.querySelector( "#content");
    codefield.value += codeBlock;
   
    // Get the index of the start and end symbols
    const startIndex = codefield.value.lastIndexOf("*+*") + 4;
    const endIndex = codefield.value.lastIndexOf("*-*") - 5;

    // Set the selection range to focus on the text between the start and end symbols
    codefield.setSelectionRange(startIndex, endIndex);
    codefield.focus();
}

// Converts *-* & *+* into pre code tags, later converted into hljs higlights.
function convertToCodeblock( input) {
    const firstStageConversion = input.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
    
    const secondStageConversion = firstStageConversion.replaceAll("*+*", "<pre><code>");
    const contentInput = secondStageConversion.replaceAll("*-*", "</code></pre>");
    
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
    
    const finalOutput = replaceNewLinesWithExceptions( contentInput);
    return finalOutput;
}

// Appends loadingAnimation in given recieved queryselector 
async function AppendLoadingAnimation( AnimContainer) {
    AnimContainer.innerHTML = `
        <div class="loadingAnimationContainer">
            <div class="loading--animation loading--animationDelay--1ms"></div>
            <div class="loading--animation loading--animationDelay--3ms"></div>
            <div class="loading--animation loading--animationDelay--6ms"></div>
        </div>
    `;

    setTimeout( () => { 
        return;
    }, 5000);

    return;
}

function getGetSearchParam( searchParam) {
    const searchQuery = window.location.search;
    const urlParams = new URLSearchParams( searchQuery);
    const searchParamValue = urlParams.get( searchParam);
    return searchParamValue;
}

async function loadThreads (arrayOfThreads, noResultMessage, pushNotifications=[]) {
    
    const mainThreadAllThreads = document.querySelector( ".mainThread-allThreads");
    mainThreadAllThreads.innerHTML = ``;
    
    if( arrayOfThreads.length === 0) {
        mainThreadAllThreads.innerHTML = noResultMessage;
    }
    
    //loops all users and creates postContainers
    arrayOfThreads.forEach(threadObject => {
        const postContainerDOM = document.createElement("div");
        postContainerDOM.classList.add("postContainer-mainThread");

        postContainerDOM.innerHTML = `
        <div class="userInfoContainer-mainThread">
                <div class="postTitleContainer-mainThread">
                    <h3 class="post_title-mainThread">${threadObject.title}</h3>
                    <div class="time_stamp-mainThread"> ${threadObject.timestamp["time"]} - ${threadObject.timestamp["date"]}</div>
                </div>
                
                <div class="usersPost-mainThread">
                    <img class="profileImg userInfoPostPicture" src="${serverEndpoint}/API/PROFILE_IMG/${threadObject.img_name}">
                    <p class="user_name-mainThread"><a href="${serverEndpoint}/PAGE/user.php?un=${threadObject.username}">@${threadObject.username}</a></p>
                </div>                    
            </div>
            <div class="threadTags-container"></div>

            <div class="postContent-mainThread">${threadObject.description}</div>

            <div class="informationContainer-interactions-mainThread">
                <div class="NR-comments-interactions">${threadObject.comments.length}</div>
                <div class="NR-views-interactions">${threadObject.views}</div>
            </div>
        `;
        document.querySelector( ".mainThread-allThreads").prepend( postContainerDOM);
        
        // add Tags if they exist
        if( threadObject.tags.length != 0) {
            threadObject.tags.forEach( tag => {
                const tagContainerDOM = document.createElement( "div");
                tagContainerDOM.textContent = `#${tag}`;
                tagContainerDOM.classList.add( "tagContainer-mainThread");
                document.querySelector( `.threadTags-container`).append( tagContainerDOM);
            })
        }
        
        // create link to threadPage
        const linkToThreadpageElement = document.querySelector( ".post_title-mainThread");
        linkToThreadpageElement.dataset.thread_id = threadObject.thread_id;

        linkToThreadpageElement.addEventListener( "click", changeToThreadPageEvent);

        // create link to userpage
        const linkToUserPage = document.querySelector( ".userInfoPostPicture");
        linkToUserPage.dataset.username = threadObject.username;

        linkToUserPage.addEventListener( "click", changeToUserPageEvent);
        
        // This if statment checks the user have a comment on thier post that they have not yet seen
        if(pushNotifications.includes(parseInt(linkToThreadpageElement.dataset.thread_id))){
            document.querySelector(".postTitleContainer-mainThread").classList.add("pushNotification");
        }
        
        
    });
}

function changeToUserPageEvent( event) {
    event.stopPropagation();
    const dataUsername = event.explicitOriginalTarget.dataset.username;
    window.location = `${serverEndpoint}/PAGE/user.php?un=${dataUsername}`;
}

function changeToThreadPageEvent( event) {
    event.stopPropagation();
    const parentElement = event.currentTarget.parentElement;
    if(parentElement.classList.contains("pushNotification")){
        parentElement.classList.remove("pushNotification")
    }
    const threadID = event.explicitOriginalTarget.dataset.thread_id;
    window.location = `${serverEndpoint}/PAGE/thread.php?thread_id=${threadID}`;
}


function backToTopDisplayOnLimit( limiter) {
    const backToTopButton = document.querySelector( ".backToTop");

    const scrollContainer = () => {
        return document.documentElement || document.body;
    }

    document.addEventListener( "scroll", () => {
        console.log( "here");
        if( scrollContainer().scrollTop > limiter) {
            backToTopButton.classList.remove("hidden");
        }else {
            backToTopButton.classList.add("hidden");
        }
    })
}

function displayAlert (message) {
    window.alert(message);
}

function deployCharacterLimit () {
    document.querySelectorAll(".inputMaxCharacters").forEach(element => {
        element.addEventListener("keyup", (event) => {
            maxCharacters(event.currentTarget);
        })
    })
}

function maxCharacters (element) {
    let inputValue = element.value
        let inputMaxCharacters = element.getAttribute("maxlength");
        if(inputValue.length == inputMaxCharacters) {
            element.classList.add("maxCharacters");
            const animated = document.querySelector(".maxCharacters");
            animated.addEventListener("animationend", (event2) => {
                event2.currentTarget.classList.remove("maxCharacters");
            });
        }
}

function switchViewMode() {
    if( localStorage.getItem( "lightMode")) {
        localStorage.removeItem( "lightMode");
        document.documentElement.setAttribute( "data-theme", "dark");
        document.querySelector( "body > img").src = `${serverEndpoint}/RESOURCES/backgroundImageBlur.jpg`;
    }else {
        localStorage.setItem( "lightMode", true);
        document.documentElement.setAttribute( "data-theme", "light");
        document.querySelector( "body > img").src = `${serverEndpoint}/RESOURCES/lightmodeBackground.jpg`;
    }
}