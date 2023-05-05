// here we get the ul element so we can change its innerHTML
const tags = document.getElementById( "tagsListParent");
// we create an empty array so we can push in the tags the user wants on its post
let tagsArray = [];
createTag()

function createTag() {
    // we create an input element to write the name of the tag
    tags.innerHTML += `<input type="text" name="tag" id="tagInput">`;

    const tagInput = document.getElementById( "tagInput")
    tagInput.focus();
    // we keep track on every keypress so when ENTER is hit we run the rest of the code
    tagInput.addEventListener("keyup", event => {
        let tagValue = event.currentTarget.value;
        let key = event.key;
        if (key === "Enter") {
            //we remove the lastchild witch is the input element so we can replace it with an Li element
            tags.lastElementChild.remove();
            tags.innerHTML += `<li class="listTags">${tagValue} <div class="removeTag">X</div></li>`;
            tagsArray.push(tagValue);
            // Here we get the remove symbol so the user can remove a tag
            const deleteTags = document.querySelectorAll(".removeTag");
            deleteTags.forEach(deleteTag => {
                deleteTag.removeEventListener("click", removeTag);
                deleteTag.addEventListener("click", removeTag);
            });
            createTag();
        }
    })
}

function removeTag(event) {
    console.log(event);
}