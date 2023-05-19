
const loggedInBoolean = getCurrentUserLocalStorage() ? true : false;
const threadContainer = document.querySelector( ".postContainer-pageThread");

// control if logged in (true => display navigation user) (false => viewing mode message)
if( loggedInBoolean) {
    renderNavigationLoggedIn( getCurrentUserLocalStorage());
}else {
    threadContainer.innerHTML = `<p class="notLoggedInMessage">You are now in viewing Mode, <a href='${serverEndpoint}'>Sign In or Register</a> to Comment & Like</p>`;
}

const threadId = getGetSearchParam( "thread_id");

const currentDate = new Date();
const date = currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate();
const time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();

// declare request for given thread 
const requestThreadPage = new Request( `${serverEndpoint}/API/thread.php`, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        thread_id: threadId,
        username: getCurrentUserLocalStorage(), 
        timestamp: {
            date: date,
            time: time
        }
    })
})


fillThreadPage();
async function fillThreadPage() {
    const threadObject = await fetchFunction( requestThreadPage);
    
    // If no Object is returned, (falsy) the thread wasnt found or doesnt exist. display message and abort
    if( !threadObject) {
        AppendLoadingAnimation( document.querySelector( "main"))
        document.querySelector( "main").innerHTML += `
            <h3 style="text-align:center;">Thread Nr: ${threadId} is on vacation or does not exist...<br><a href='${serverEndpoint}'>RETURN HOME</a></h3>
        `;
        return;
    }
    
    // fill ThreadContainer with Thread
    threadContainer.innerHTML += ` 
    <div class='topInfoFlexContainer-pageThread'>
        
        <div class='userInfoContainer-pageThread'>
            <img class='profileImg userInfoPostPicture' data-username="${threadObject.resource.username}" src='${serverEndpoint}/API/PROFILE_IMG/${threadObject.resource.img_name}'>
            <div class='user_name-pageThread'>${threadObject.resource.username}</div>                 
        </div>

        <div class='postInformationZone-pageThread'>
            <div class='views'><span class='InformationText-tread'>Views: ${threadObject.resource.views}</span></div>
            <div class='time_stamp-pageThread'><span class='InformationText-tread'>Posted: ${threadObject.resource.timestamp.time}</span><br>
                <span class='InformationText-tread'>Date: ${threadObject.resource.timestamp.date}</span></div>
            </div>
        </div>


        <div class='postTitleContainer-pageThread'>
            <h2 class='post_title-pageThread'>${threadObject.resource.title}</h2>
        </div>

        <div class='usersPost-pageThread'>
            <p class='postDescription-pageThread'>${threadObject.resource.description}</p>
            <div class='postContent-pageThread'>${threadObject.resource.content}</div>           
        </div>
    </div>
    `;

    // link to Threads creators UserPage
    document.querySelector( ".userInfoPostPicture").addEventListener( "click", changeToUserPageEvent);

    // control if comments exist or not
    const commentContainer = document.querySelector( ".commentsContainer-threadPage");
    if( threadObject.resource.comments.length != 0) {
        
        let likeIdentifyer = 0;
        threadObject.resource.comments.forEach( comment => {

            commentContainer.innerHTML += `
                <div class='comment-threadPage'>
                    <div class='likeContainer-comment'>
                        <div class='numberLikes-comment LI${likeIdentifyer}' data-comment_id="${comment.id}">${comment.likes.total}</div>
                    </div>
                    
                    <div class='commentContainer-comment'>
        
                        <div class='topInfoFlexContainer-pageThread'>
        
                            <div class='userInfoContainer-comment'>
                                <img class='profileImg userInfoPostPicture-comment UI${likeIdentifyer}' data-username="${comment.username}" src='${serverEndpoint}/API/PROFILE_IMG/${comment.img_name}'> 
                                <div class='user_name-comment'>${comment.username}</div>                   
                            </div>
        
                            <div class='information-comment'>
                                <p>Posted: ${comment.timestamp.time}<br>Date: ${comment.timestamp.date}</p>
                            </div>
        
                        </div>

                        <p>${comment.content}</p>
                    
                    </div>
                </div>`;

                // detirmines unique class to identify during assigning of like or not
                const likeQuery = document.querySelector( `.LI${likeIdentifyer}`);
                
                // if logged in = true, enable like functions 
                if( loggedInBoolean) {
                    // control if current user has already liked comment
                    if( comment.likes.accounts.includes( getCurrentUserLocalStorage())) {
                        likeQuery.classList.add( "likedComment-pseudo");
                        document.querySelector( ".likedComment-pseudo").addEventListener( "click", likeCommentEvent); 

                    // controls if there are no likes in comment
                    }else if( comment.likes.accounts.length === 0){
                        likeQuery.classList.add( "unlikedComment-pseudo"); 
                        document.querySelector( ".unlikedComment-pseudo").addEventListener( "click", likeCommentEvent); 
                        
                    // there are likes but current user has not liked
                    }else {
                        likeQuery.classList.add( "unlikedComment-pseudo"); 
                        document.querySelector( ".unlikedComment-pseudo").addEventListener( "click", likeCommentEvent); 
                    }
                }
            
            likeIdentifyer ++;
        }); 

        document.querySelectorAll( ".userInfoPostPicture-comment").forEach( user => {
            user.addEventListener( "click", changeToUserPageEvent);
        })
    }else {
        commentContainer.innerHTML += `No comments exists on this page...`;
    }
    
    // highlights all code within precodecodepre
    hljs.highlightAll();

    // if logged in = true allow comments else remove button.
    if( loggedInBoolean) {
        prepareAddComments();
    }else {
      document.querySelector( ".openModalButton-comment").remove();  
    }
}

async function likeCommentEvent( e) {

    const currentCommentId = e.explicitOriginalTarget.dataset.comment_id;
    const removeOrLikeBoolean = document.querySelector( "likedComment-pseudo") ? true : false;
    
    const likeRequest = new Request( 
        `${serverEndpoint}/API/comment.php`, {
            method: "PATCH",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                thread_id: threadId,
                comment_id: currentCommentId,
                username: getCurrentUserLocalStorage(),
                remove: removeOrLikeBoolean 
            })
    });        
    
    const response = await fetchFunction( likeRequest);
    console.log( response);
    
    if( response.resource.boolean) {
        e.explicitOriginalTarget.classList.remove( "unlikedComment-pseudo");
        e.explicitOriginalTarget.classList.add( "likedComment-pseudo");
        document.querySelector( `[data-comment_id='${currentCommentId}']`).textContent = response.resource.number_likes;

    }else if( response.resource.boolean) {
        e.explicitOriginalTarget.classList.remove( "likedComment-pseudo");
        e.explicitOriginalTarget.classList.add( "unlikedComment-pseudo");
        document.querySelector( `[data-comment_id='${currentCommentId}']`).textContent = response.resource.number_likes;
    }

    
};

function prepareAddComments() {
    const openCreateCommentButton = document.querySelector( ".openModalButton-comment");
    const CommentContainer = document.querySelector( ".createCommentModal-comment");
    const closeCommentContainer = document.querySelector( ".closeCommentModal");
    
    
    // opens modal
    openCreateCommentButton.addEventListener( "click", () => {
        if( localStorage.getItem( "user")) {
            CommentContainer.show();
        }else {
            // error, not logged in
        }
    })
    
    // closes Modal
    closeCommentContainer.addEventListener( "click", () => {
        CommentContainer.close();
    })
    
    // Add Codeblock
    document.querySelector( ".addCodeField-event").addEventListener( "click", addCodeBlocktoTextArea);
    
    // Post Comment
    document.querySelector( ".sendComment-modal").addEventListener( "click", postComment);
    
    async function postComment() {
        // convert codeblocks and retain new lines \n
        let unconvertedContentInput = document.getElementById( "content").value;
        const convertedComment = convertToCodeblock( unconvertedContentInput);
        
        const commentPost = new Request(`${serverEndpoint}/API/comment.php`, {
                method: "POST",
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({
                    username: getCurrentUserLocalStorage(), 
                    content: convertedComment, 
                    thread_id: threadId
                })
            });
            
        const response = await fetchFunction( commentPost);

        setTimeout( () => { location.reload();}, 1000);  

    }

}