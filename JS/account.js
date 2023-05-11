console.log("hello");

const modal = document.querySelector("#accountDialog");
document.querySelector("#editButton").addEventListener("click", () => {
    modal.showModal();
})
let form = document.querySelector("form");
form.addEventListener("submit",  function (event) {
    event.preventDefault();
    modal.close();
    const values = form.querySelectorAll("input");
    const bioText = form.querySelector("textarea").value;
    console.log(bioText);
    document.querySelector(".userInfo").innerHTML = `
        <div class="infoParent">
            <div class="info">${values[0].value}</div>
            <div class="info">${values[1].value}</div>
            <div class="info">${values[2].value}</div>
        </div>
        <div class='profileBio'>${bioText}</div>
    `;
            
})

modal.addEventListener("click", e => {
    const dialogDimensions = modal.getBoundingClientRect()
    if (
      e.clientX < dialogDimensions.left ||
      e.clientX > dialogDimensions.right ||
      e.clientY < dialogDimensions.top ||
      e.clientY > dialogDimensions.bottom
    ) {
      modal.close()
    }
  })


// document.querySelector(".secondDiv button").addEventListener("click", event => {
//     console.log(event);
//     let values = Array.from(document.querySelectorAll(".info")).map(Element => Element.textContent);
//     console.log(values);
//     let bioText = document.querySelector(".profileBio").textContent;
//     console.log(bioText);

//     document.querySelector(".userCredntials-accountPage").innerHTML = `
//     <div class='userInfo'>
//         <input class='info' value="${values[0]}">
//         <input class='info' value="${values[1]}">
//         <input class='info' value="${values[2]}">
//     </div>
//     <div class='secondDiv'>
//         <textarea class='profileBio'>${bioText}</textarea>
//         <button>Save</button 
//         <button>Cancel</button 
//     </div 
//     `;
// })