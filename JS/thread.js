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
    const user = localStorage.getItem( "user");

    // convert codeblocks and retain new lines \n
    let unconvertedContentInput = document.getElementById( "content").value;
    const convertedComment = convertToCodeblock( unconvertedContentInput);

    const searchQuery = window.location.search;
    const urlParams = new URLSearchParams( searchQuery);
    const threadId = urlParams.get( "thread_id");

    const commentPost = new Request(`${serverEndpoint}/API/comment.php`, {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                username: user, 
                content: convertedComment, 
                thread_id: threadId
            })
        });
        const response = await fetchFunction( commentPost);
        setTimeout( () => {
                location.reload();
            }, 1000);  
}