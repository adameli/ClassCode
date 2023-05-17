
const threadId = getGetSearchParam( "thread_id");

const currentDate = new Date();
const date = currentDate.getFullYear()+'-'+(currentDate.getMonth()+1)+'-'+currentDate.getDate();
const time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();

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

const threadContainer = document.querySelector( ".postContainer-pageThread");
fillThreadPage();

async function fillThreadPage() {
    const threadObject = await fetchFunction( requestThreadPage);
    
    if( !threadObject) {
        document.querySelector( "main").innerHTML = `
            <h3>Thread Nr: ${threadId} is on vacation...</h3>
        `;
        return;
    }
    
    threadContainer.innerHTML = ` 
    <div class='topInfoFlexContainer-pageThread'>
        
        <div class='userInfoContainer-pageThread'>
            <img class='profileImg userInfoPostPicture' src='${serverEndpoint}/API/PROFILE_IMG/${threadObject.resource.img_name}'>
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

    const commentContainer = document.querySelector( ".commentsContainer-threadPage");
    if( threadObject.resource.comments.length != 0) {
        threadObject.resource.comments.forEach( comment => {
            commentContainer.innerHTML += `
                <div class='comment-threadPage'>
                    <div class='likeContainer-comment'>
                        <div class='numberLikes-comment'>${comment.likes.total}</div>
                    </div>
                    
                    <div class='commentContainer-comment'>
        
                        <div class='topInfoFlexContainer-pageThread'>
        
                            <div class='userInfoContainer-comment'>
                                <img class='profileImg userInfoPostPicture-comment' src='${serverEndpoint}/API/PROFILE_IMG/${comment.img_name}'> 
                                <div class='user_name-comment'>${comment.username}</div>                   
                            </div>
        
                            <div class='information-comment'>
                                <p>Posted: ${comment.timestamp.time}<br>Date: ${comment.timestamp.date}</p>
                            </div>
        
                        </div>

                        <p>${comment.content}</p>
                    
                    </div>
                </div>`;
            
            comment.likes.accounts.forEach( like => {
                if( like === getCurrentUserLocalStorage()) {
                    document.querySelector( ".numberLikes-comment").classList.add( "likedComment-pseudo");
                    console.log( "like")
                }else {
                    document.querySelector( ".numberLikes-comment").classList.add( "unlikedComment-pseudo");
                    console.log( "bottom")
                }
            })
        });

    }else {
        commentContainer.innerHTML += `No comments exists on this page...`;
    }


    hljs.highlightAll();
    prepareAddComments();
}


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