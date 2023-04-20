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

    let registerForm = main.querySelector("form");
    registerForm.addEventListener("submit", async function (event) {
        event.preventDefault();
        let message = main.querySelector("#message");

        try {
            let response = await fetch("../API/register.php", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: usernameInput.value,
                    password: passwordInput.value
                }),
            });

            let responseData = await response.json();
            console.log(responseData);
            if (!responseData.ok) {
                message.innerHTML = `Something went wrong, ${responseData.message}`;
            } else {
                message.innerHTML = `The registration was a success, welcome to ClassCode ${responseData.username}`;
            }
        } catch (error) {

        }
    })

}
