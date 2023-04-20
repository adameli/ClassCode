async function fetchFunction(request) {

    try {

        const serverResponse = await fetch(request);
        const resource = await serverResponse.json();
        return { response: serverResponse, resource: resource };

    } catch (e) {
        feedbackAnswer.textContent = "NetworkError! Please try again."
    };
};

function registerpage() {
    // redners the register page with new html
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

    // 
    let usernameInput = document.getElementById("username");
    let passwordInput = document.getElementById("password");

    let button = document.getElementById("login");

    // get the format wich we send the request to register a new user
    let registerForm = main.querySelector("form");
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        let message = main.querySelector("#message");

        try {
            let registerRequest = new Request("../API/register.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: usernameInput.value,
                    password: passwordInput.value
                }),
            });

            let post = await fetchFunction(registerRequest);

            console.log(post);
            console.log(post.response.ok);

            if (post.response.ok) {
                message.innerHTML = `The registration was a success, welcome to ClassCode ${post.resource}`;
            } else {
                message.innerHTML = `Something went wrong, ${post.resource.message}`;
            }
        } catch (error) {

        }
    })

}
