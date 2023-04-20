async function fetchFunction(request) {

    try {

        const serverResponse = await fetch(request);
        const resource = await serverResponse.json();
        return { response: serverResponse, resource: resource };

    } catch (e) {

    };
};

// function registerpage() {
//     // Redners the registerpage with new html
//     main.innerHTML = `
//         <h2>Register</h2>
//         <p id=message></p>
//         <form>
//             <input type=text id=username placeholder=Username>
//             <input type=password id=password placeholder=Password>
//             <button type=submit>Register</button>
//         </form>
//         <button id=login>Already got an account? Login here</button>
//     `;

//     // These variables are the input elements where we will get the users credentials
//     let usernameInput = document.getElementById("username");
//     let passwordInput = document.getElementById("password");

//     // We add a click function to the "alredy user button" so the user can navigate back to the loginpage
//     let loginButton = document.getElementById("login");
//     loginButton.addEventListener("click", loginpage);

//     // We add a submit function to the form element, when the user submits we send the a new Request to register a new user
//     let registerForm = main.querySelector("form");
//     registerForm.addEventListener("submit", async function (event) {
//         event.preventDefault();
//         let message = main.querySelector("#message");

//         try {
//             // We make an Requst that we will send to the fetchFunction
//             let registerRequest = new Request("../API/register.php", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     username: usernameInput.value,
//                     password: passwordInput.value
//                 }),
//             });

//             // We fetch and get back an object with {response: serversresponse and resource: the data the server sent back(username)}
//             let post = await fetchFunction(registerRequest);

//             console.log(post);
//             console.log(post.response.ok);

//             // controlls if the serverresponse is ok (true or false)
//             if (post.response.ok) {
//                 message.innerHTML = `The registration was a success, welcome to ClassCode ${post.resource}`;
//             } else {
//                 message.innerHTML = `Something went wrong, ${post.resource.message}`;
//             }

//         } catch (error) {

//         }
//     });
// }


// function loginpage() {
//     // Redners the loginpage with new html
//     main.innerHTML = `
//         <h2>Login</h2>
//         <p id=message></p>
//         <form>
//             <input type=text id=username placeholder=Username>
//             <input type=password id=password placeholder=Password>
//             <button type=submit>Log in</button>
//         </form>
//         <button id=register>Not a user? Register here!</button>
//     `;

//     // These variables are the input elements where we will get the users credentials
//     let usernameInput = document.getElementById("username");
//     let passwordInput = document.getElementById("password");

//     // We add a click function to the "not a user button" so the user can navigate back to the registernpage
//     let registerButton = document.getElementById("register");
//     registerButton.addEventListener("click", registerpage);

//     // We add a submit function to the form element, when the user submits we send the a new Request to try an login as a user
//     let loginForm = main.querySelector("form");
//     loginForm.addEventListener("submit", async function (event) {
//         event.preventDefault();
//         let message = main.querySelector("#message");

//         try {
//             // We make an Requst that we will send to the fetchFunction
//             let registerRequest = new Request("../API/login.php", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     username: usernameInput.value,
//                     password: passwordInput.value
//                 }),
//             });

//             // We fetch and get back an object with {response: serversresponse and resource: the data the server sent back(username)}
//             let post = await fetchFunction(registerRequest);

//             console.log(post);
//             console.log(post.response.ok);

//             // controlls if the serverresponse is ok (true or false)
//             // if the users credentials is correct, they access their account and lands on to the feedpage
//             // else will we send that the credentials are wrong
//             if (post.response.ok) {
//                 window.localStorage.setItem("user", JSON.stringify(post.resource));

//                 feedpage();
//             } else {
//                 message.innerHTML = `${post.resource.message}, please try agin`;
//             }

//         } catch (error) {

//         }
//     });
// }

// function feedpage() {
//     let currentUser = JSON.parse(window.localStorage.getItem("user"));

//     main.innerHTML = `
//     <div>
//         <div id="profilepick"></div>
//         <h3>${currentUser}</h3>
//     </div>
//     <p> You are know in the feedpage </p>
//     <form>
//         <input type=text id=title placeholder=Title>
//         <input type=text id=content placeholder=Content!>
//         <button type=submit>Post!</button>
//     </form>
//     `;

//     // These variables are the input elements where we will get the users credentials
//     let titleInput = document.getElementById("title");
//     let contentInput = document.getElementById("content");

//     // We add a submit function to the form element, when the user submits we send the a new Request to try an login as a user
//     let postContentForm = main.querySelector("form");
//     postContentForm.addEventListener("submit", async function (event) {
//         event.preventDefault();


//         try {
//             // We make an Requst that we will send to the fetchFunction
//             let registerRequest = new Request("../API/thread.php", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({
//                     username: currentUser,
//                     title: titleInput.value,
//                     content: contentInput.value,
//                 }),
//             });

//             // We fetch and get back an object with {response: serversresponse and resource: the data the server sent back(username)}
//             let post = await fetchFunction(registerRequest);

//             console.log(post);
//             console.log(post.response.ok);

//             // controlls if the serverresponse is ok (true or false)
//             if (post.response.ok) {
//                 // If the post was a success we print the thread direct to the feed
//                 main.innerHTML += `
//                 <div id="thred">
//                     <div id="threadheader">
//                         <div id="user_icon">${post.resource.username}</div>
//                         <div id="thread_title">${post.resource.title}</div>
//                         <div id="time_stamp">${post.resource.timestamp["date"]} ${post.resource.timestamp["time"]}</div>
//                     </div>
//                     <div id="description">${post.resource.content}</div>
//                     <div id="code"></div>
//                 </div>
//                 `;
//                 // feedpage();
//             } else {
//                 message.innerHTML = `Hmm! Something did not work, ${post.resource.message}`;
//             }

//         } catch (error) {

//         }
//     });
// }