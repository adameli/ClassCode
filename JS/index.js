console.log("hello world");
console.log("Hello from TEO!");
console.log("Hello from ISAK");

const header = document.querySelector("header");
const main = document.querySelector("main");

if( !localStorage.getItem( "user")) {
    renderWelcomePage();
    header.querySelector(".loginButtonHeader").addEventListener("click", loginpage);
    main.querySelector(".registerButtonHeader").addEventListener("click", registerpage);
}else {
    renderMainThread();
}



// feedpage();
// loginpage()
// registerpage()