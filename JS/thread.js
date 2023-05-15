// POST thread.php -> body: threadID, UN, Timestamp: date, time;
// returns ThreadObject, fill Conent based on Response

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


console.log( requestThreadPage);

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
            <img class='profileImg userInfoPostPicture' src='${server_endpoint}/API/PROFILE_IMG/${threadObject.img_name}'>
            <div class='user_name-pageThread'>${threadObject.username}</div>                 
        </div>

        <div class='postInformationZone-pageThread'>
            <div class='views'><span class='InformationText-tread'>Views: ${threadObject.views}</span></div>
            <div class='time_stamp-pageThread'><span class='InformationText-tread'>Posted: ${threadObject.timestamp.time}</span><br>
                <span class='InformationText-tread'>Date: ${threadObject.timestamp.date}</span></div>
            </div>
        </div>


        <div class='postTitleContainer-pageThread'>
            <h2 class='post_title-pageThread'>${threadObject.title}</h2>
        </div>

        <div class='usersPost-pageThread'>
            <p class='postDescription-pageThread'></p>
            <div class='postContent-pageThread'></div>           
        </div>
    </div>
    `;
    
    document.querySelector( ".postDescription-pageThread").textContent = threadObject.description;
    document.querySelector( ".postContent-pageThread").textContent = threadObject.content;

    if( threadObject.comments.length != 0) {
        fillComments()
    }else {
        document.querySelector( ".commentsContainer-threadPage").innerHTML += `
        No comments exists on this page...
        `;
    }

    function fillComments() {

    }
}

hljs.highlightAll();

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