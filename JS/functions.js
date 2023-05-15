const serverEndpoint = "http://localhost:9999";

async function fetchFunction( request) {

    try {

        const serverResponse = await fetch( request);
        const resource = await serverResponse.json();
        return { response: serverResponse, resource: resource };

    } catch (e) {
        console.log( "error in fetch func");
    };
};

function removeUserLocalStorage() {
    localStorage.removeItem( "user");
    window.location = `${serverEndpoint}`;
}

 function getCurrentUserLocalStorage() {
    return localStorage.getItem( "user");
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
    const startIndex = codefield.value.lastIndexOf("*+*") + 3;
    const endIndex = codefield.value.lastIndexOf("*-*");

    // Set the selection range to focus on the text between the start and end symbols
    codefield.setSelectionRange(startIndex, endIndex);
    codefield.focus();
}

// Converts *-* & *+* into pre code tags, later converted into hljs higlights.
function convertToCodeblock( input) {
    let firstStageConversion = input.replaceAll("*+*", "<pre><code>");
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


async function loadThreads (arrayOfThreads, noResultMessage) {
    
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
                <div class"postTitleContainer-mainThread">
                    <h3 class="post_title-mainThread">${threadObject.title}</h3>
                    <div class="time_stamp-mainThread"> ${threadObject.timestamp["time"]} - ${threadObject.timestamp["date"]}</div>
                    </div>
                
                <div class="usersPost-mainThread">
                    <img class="profileImg userInfoPostPicture" src="${serverEndpoint}/API/PROFILE_IMG/${threadObject.img_name}">
                    <p class="user_name-mainThread">${threadObject.username}</p>
                </div>                    
            </div>

            <div class="postContent-mainThread">${threadObject.description}</div>
            <div class="threadTags">#${threadObject.tags.join(" #")}</div>
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
