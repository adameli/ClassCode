const tags = document.getElementById("tagsListParent");
console.log(tags);

let tagsArray = [];

createTag()

function createTag() {
    tags.innerHTML += `<input type="text" name="tag" id="tagInput">`;

    const tagInput = document.getElementById("tagInput")
    tagInput.addEventListener("keyup", event => {

        // console.log(event.key);
        // console.log(event.currentTarget.value);

        let value = event.currentTarget.value;
        let key = event.key;
        if (key === "Enter") {
            tags.lastElementChild.remove();
            tags.innerHTML += `<li class="listTags">${value} <div class="removeTag">X</div></li>`;
            tagsArray.push(value);
            const remove = document.querySelector(".removeTag");
            remove.addEventListener("click", removeTag);
            createTag();
        }
    })
    console.log(tagsArray);
}

function removeTag(event) {
    console.log(event);

}