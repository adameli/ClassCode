activeTheme( "../");

const loggedInBoolean = getCurrentUserLocalStorage() ? true : false;
const viewmode = getCurrentUserLocalStorage() ? false : true;
const threadContainer = document.querySelector( ".postContainer-pageThread");

// control if logged in (true => display navigation user) (false => viewing mode message)
controlViewingMode( loggedInBoolean, threadContainer, "PAGE");

const threadId = getGetSearchParam( "thread_id");

const currentDate = new Date();
const date = currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate();
const time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();

// declare request for given thread 
const requestThreadPage = new Request( `../API/thread.php`, {
    method: "POST",
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify({
        thread_id: threadId,
        username: getCurrentUserLocalStorage(), 
        timestamp: {
            date: date,
            time: time
        },
        viewmode: viewmode
    })
})


fillThreadPage();
async function fillThreadPage() {
    const threadObject = await fetchFunction( requestThreadPage);
    
    // If no Object is returned, (falsy) the thread wasnt found or doesnt exist. display message and abort
    if( !threadObject.response.ok) {
        AppendLoadingAnimation( document.querySelector( "main"))
        document.querySelector( "main").innerHTML += `
            <h3 style="text-align:center;">Thread Nr: ${threadId} is on vacation or does not exist...<br><a href='/'>RETURN HOME</a></h3>
        `;
        return;
    }
    
    // fill ThreadContainer with Thread
    threadContainer.innerHTML += ` 
    <div class='topInfoFlexContainer-pageThread'>
        
        <div class="threadUserContainerFlexItem">
            <div class='userInfoContainer-pageThread'>
                <img class='profileImg userInfoPostPicture' data-username="${threadObject.resource.username}" src='../API/PROFILE_IMG/${threadObject.resource.img_name}'>
                <div class='user_name-pageThread'><a href="user.php?un=${threadObject.resource.username}">${threadObject.resource.username}</a></div>                 
            </div>
            <div class='views'><span class='InformationText-tread NRviews-pageThread'>${threadObject.resource.views}</span></div>
        </div>

        <div class='postInformationZone-pageThread'>
            <p class='time_stamp-pageThread'><span class='InformationText-tread'>${threadObject.resource.timestamp.time}</span> -
                <span class='InformationText-tread'>${threadObject.resource.timestamp.date}</span></div>
            </p>
        </div>

        <div class="thread-PostContainer">
            <div class='postTitleContainer-pageThread'>
                <h2 class='postTitle-pageThread'>${threadObject.resource.title}</h2>
            </div>

            <div class='usersPost-pageThread'>
                <p class='postDescription-pageThread'>${threadObject.resource.description}</p>
                <div class='postContent-pageThread'>${threadObject.resource.content}</div>           
            </div>
        </div>
    </div>
    `;

    // link to Threads creators UserPage
    document.querySelector( ".userInfoPostPicture").addEventListener( "click", changeToUserPageEvent);

    // control if comments exist or not
    const commentParentContainer = document.querySelector( ".commentsContainer-threadPage");
    if( threadObject.resource.comments.length != 0) {
        
        let likeIdentifyer = 0;
        threadObject.resource.comments.forEach( comment => {
            const commentContainer = document.createElement( "div");
            commentContainer.classList.add( "comment-threadPage");
            commentContainer.innerHTML += `
                    <div class='likeContainer-comment'>
                        <div class='numberLikes-comment LI${likeIdentifyer}' data-comment_id="${comment.id}">${comment.likes.total}</div>
                    </div>
                    
                    <div class='commentContainer-comment'>
        
                        <div class='topInfoFlexContainer-pageThread'>
        
                            <div class='userInfoContainer-comment'>
                                <img class='profileImg userInfoPostPicture-comment UI${likeIdentifyer}' data-username="${comment.username}" src='../API/PROFILE_IMG/${comment.img_name}'> 
                                <p class='user_name-comment'><a href="user.php?un=${comment.username}">${comment.username}</a></p>                   
                            </div>
        
                            <div class='information-comment'>
                                <p>${comment.timestamp.time} - ${comment.timestamp.date}</p>
                            </div>
        
                        </div>

                        <p>${comment.content}</p>
                    
                    </div>`;

                commentParentContainer.append( commentContainer);

                // detirmines unique class to identify during assigning of like or not
                const likeQuery = document.querySelector( `.LI${likeIdentifyer}`);
                
                // if logged in = true, enable like functions 
                if( loggedInBoolean) {
                    // control if current user has already liked comment
                    if( comment.likes.accounts.includes( getCurrentUserLocalStorage())) {
                        likeQuery.id = "likedComment-pseudo";
                        commentContainer.querySelector( "#likedComment-pseudo").addEventListener( "click", likeCommentEvent); 

                    // controls if there are no likes in comment
                    }else if( comment.likes.accounts.length === 0){
                        likeQuery.id = "unlikedComment-pseudo"; 
                        commentContainer.querySelector( "#unlikedComment-pseudo").addEventListener( "click", likeCommentEvent); 
                        
                    // there are likes but current user has not liked
                    }else {
                        likeQuery.id = "unlikedComment-pseudo"; 
                        commentContainer.querySelector( "#unlikedComment-pseudo").addEventListener( "click", likeCommentEvent); 
                    }
                }
            
            likeIdentifyer ++;
        }); 

        document.querySelectorAll( ".userInfoPostPicture-comment").forEach( user => {
            user.addEventListener( "click", changeToUserPageEvent);
        })
    }else {
        document.querySelector( ".commentsContainer-threadPage").innerHTML += `No comments exists on this page...`;
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

    // Gets targeted event containers ID
    const currentCommentId = e.explicitOriginalTarget.dataset.comment_id;
    
    // Determines if it is a like or Unlike
    let removeOrLikeBoolean = e.explicitOriginalTarget.id === "likedComment-pseudo" ? true : false;
    
    const likeRequest = new Request( `../API/comment.php`, {
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
    
    // Sent fetch change the class to display like or unlike
    if( !response.resource.remove_boolean) {
        setIdLikeOrUnLike( "likedComment-pseudo");

    }else if( response.resource.remove_boolean) {
        setIdLikeOrUnLike( "unlikedComment-pseudo");
    }

    function setIdLikeOrUnLike( idName) {
        e.explicitOriginalTarget.removeAttribute( "id");
        e.explicitOriginalTarget.id = idName;
        document.querySelector( `[data-comment_id='${currentCommentId}']`).textContent = response.resource.number_likes;
    }
    
};

function prepareAddComments() {
    const openCreateCommentButton = document.querySelector( ".openModalButton-comment");
    const CommentContainer = document.querySelector( ".createCommentModal-comment");
    const closeCommentContainer = document.querySelector( ".closeCommentModal");
    
    
    // opens modal
    openCreateCommentButton.addEventListener( "click", () => {
        CommentContainer.show();
        window.scrollTo(0, document.body.scrollHeight);
    })
    
    // closes Modal
    closeCommentContainer.addEventListener( "click", () => {
        document.querySelector( ".createCommentModal-comment > textarea").value = "";
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
        
        const commentPost = new Request(`../API/comment.php`, {
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