function loginpage() {
    // Redners the loginpage with new html
    main.innerHTML = `
        <h2>Login</h2>
        <p id=message></p>
        <form>
            <input type=text id=username placeholder=Username>
            <input type=password id=password placeholder=Password>
            <button type=submit>Log in</button>
        </form>
        <button id=register>Not a user? Register here!</button>
    `;

    // These variables are the input elements where we will get the users credentials
    let usernameInput = document.getElementById("username");
    let passwordInput = document.getElementById("password");

    // We add a click function to the "not a user button" so the user can navigate back to the registernpage
    let registerButton = document.getElementById("register");
    registerButton.addEventListener("click", registerpage);

    // We add a submit function to the form element, when the user submits we send the a new Request to try an login as a user
    let loginForm = main.querySelector("form");
    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        let message = main.querySelector("#message");

        try {
            // We make an Requst that we will send to the fetchFunction
            let registerRequest = new Request("../API/login.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: usernameInput.value,
                    password: passwordInput.value
                }),
            });

            // We fetch and get back an object with {response: serversresponse and resource: the data the server sent back(username)}
            let post = await fetchFunction(registerRequest);

            console.log(post);
            console.log(post.response.ok);

            // controlls if the serverresponse is ok (true or false)
            // if the users credentials is correct, they access their account and lands on to the feedpage
            // else will we send that the credentials are wrong 
            if (post.response.ok) {
                window.localStorage.setItem("user", JSON.stringify(post.resource));

                renderMainThread();
            } else {
                message.innerHTML = `${post.resource.message}, please try agin`;
            }

        } catch (error) {

        }
    });
}
