// here we get the ul element so we can change it's innerHTML
const tagsContainer = document.getElementById( "tagsListParent");
// we create an empty array so we can push in the tags the user wants on it's post
let tagsArray = [];

createTag( 1);

function createTag(numberOfTags) {
    // We keep track of how many tags the user has put in, to limit the amount of tags the user can use
    if( numberOfTags === 1) {
        tagsContainer.innerHTML = `<input class="inputMaxCharacters" type="text" id="tagInput" placeholder="ex Javascript, CSS, Html, PHP" maxlength="20">`;
    }
    if( numberOfTags !== 1){
        // We create an input element to write the name of the tag
        tagsContainer.innerHTML += `<input class="inputMaxCharacters" type="text" id="tagInput" maxlength="20">`;
        const tagInput = document.getElementById( "tagInput");
        tagInput.focus();
        // We get the X mark symbol so the user can remove a current tag
        const deleteTags = document.querySelectorAll( ".removeTag");
        deleteTags.forEach(element => {
            element.removeEventListener( "click", removeTag);
            element.addEventListener( "click", removeTag);
        });
        if( numberOfTags > 8){
            document.getElementById( "tagErrorMessage").textContent = "You can not have more then 8 tags";
            return
        }
    }
    deployCharacterLimit();

    function removeTag ( event) {
        const listElement = event.currentTarget.parentElement;
        const tagName = event.currentTarget.parentElement.childNodes[0].textContent;
        // This finds the li element the user whants to delete, we remove the tag name from the tagsarray so we don't send a false tagname to the API
        tagsArray.find( ( element, index) => {
            if( element === tagName){
                tagsArray.splice( index, 1);
            }
        });
        // Here we remove the li element (tag) 
        listElement.remove();
        tagInput.focus();
        tagsContainer.lastElementChild.remove();
        document.getElementById( "tagErrorMessage").textContent = "";
        numberOfTags--;
        createTag( numberOfTags);
    }
    // we keep track on every keypress so when ENTER is hit, we run the rest of the code
    tagInput.addEventListener( "keyup", event => {
        let tagValue = event.currentTarget.value;
        tagValue = tagValue.toLowerCase();
        let key = event.key;
        if ( key === "Enter") {
            //we remove the lastchild witch is the input element so we can replace it with an Li element
            tagsContainer.lastElementChild.remove();
            tagsContainer.innerHTML += `<li class="listTags"><p>${tagValue}</p><div class="removeTag">&#10006</div></li>`;
            tagsArray.push( tagValue);
        
            numberOfTags++;
            createTag( numberOfTags);
        }
    })
}
