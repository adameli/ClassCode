function registerpage() {
    
    // change Css href and add HOME button
    prepareLoginRegister();
    
    // Redners the registerpage with new html
    main.innerHTML = `
        <h2>Register</h2>
        <p id=message></p>
        <form>
            <input type=text id=username placeholder=Username>
            <input type=password id=password placeholder=Password>
            <button type=submit>Register</button>
        </form>
        <button id=login>Already got an account? Login here</button>
    `;

    // These variables are the input elements where we will get the users credentials
    let usernameInput = document.getElementById("username");
    let passwordInput = document.getElementById("password");

    // We add a click function to the "alredy user button" so the user can navigate back to the loginpage
    let loginButton = document.getElementById("login");
    loginButton.addEventListener("click", loginpage);

    // We add a submit function to the form element, when the user submits we send the a new Request to register a new user
    let registerForm = main.querySelector("form");
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        let message = main.querySelector("#message");

        try {
            // We make an Requst that we will send to the fetchFunction
            let registerRequest = new Request("../API/register.php", {
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
            if (post.response.ok) {
                message.innerHTML = `The registration was a success, welcome to ClassCode ${post.resource}`;
            } else {
                message.innerHTML = `Something went wrong, ${post.resource.message}`;
            }

        } catch (error) {

        }
    });
}