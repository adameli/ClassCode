console.log("hello world");
console.log("Hello from TEO!");
console.log("Hello from ISAK");

const header = document.querySelector("header");
header.querySelector(".loginButtonHeader").addEventListener("click", loginpage);
const main = document.querySelector("main");

if( !localStorage.getItem( "user")) {
    renderWelcomePage();
}else {
    renderMainThread();
}

// feedpage();
// loginpage()
// registerpage()