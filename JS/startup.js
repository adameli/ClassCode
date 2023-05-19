
if( !localStorage.getItem( "user")) {
    renderWelcomePage();
}else {
    renderMainThread();
}

const main = document.querySelector( "main");

function loginRegisterPage(type, changeTypeMessage) {
    document.querySelector( ".userInformation").innerHTML = ``;
    
    // Redners the registerpage with new html
    main.innerHTML = `
        <div class="loginRegisterContainer">
            <h2>${type}</h2>
            <p id=message></p>
            <form>
                <div class="inputAnimationContainer">
                    <input class="inputMaxCharacters" type="text" id="username" required="required" maxlength="20" >
                    <span>Username</span>
                </div>
                <div class="inputAnimationContainer">
                    <input class="inputMaxCharacters" type="password" id="password" required="required" maxlength="20" >
                    <span>Password</span>
                </div>
                <button type=submit>${type}</button>
            </form>
            <button id=change>${changeTypeMessage}</button>
        </div>
    `;

    deployCharacterLimit();

    // These variables are the input elements where we will get the users credentials
    const usernameInput = document.getElementById("username");
    const passwordInput = document.getElementById("password");

    // We add a click function to the "alredy user button" so the user can navigate back to the loginpage
    let button = document.getElementById( "change");
    if( type === "Login") {
        button.addEventListener( "click", () => loginRegisterPage("Register", "Already got an account? Login here"));
        
        loginRegisterSubmit("login.php");
 
    }
    else if( type === "Register") {
        button.addEventListener( "click", () => loginRegisterPage("Login", "Not a user? Register here!"));

        loginRegisterSubmit("register.php");
        
    }
    
    function loginRegisterSubmit(phpFileName) {
        // We add a submit function to the form element, when the user submits we send the a new Request to try an login as a user
        let form = main.querySelector("form");
        form.addEventListener("submit", async function (event) {
            event.preventDefault();
            let message = main.querySelector("#message");

            try {
                // We make an Requst that we will send to the fetchFunction
                let request = new Request(`../API/${phpFileName}`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        username: usernameInput.value,
                        password: passwordInput.value
                    })
                });

                // We fetch and get back an object with {response: serversresponse and resource: the data the server sent back(username)}
                let post = await fetchFunction(request);

                console.log( post);
                console.log( post.response.ok);

                // controlls if the serverresponse is ok (true or false)
                // if the users credentials is correct, they access their account and lands on to the feedpage
                // else will we send that the credentials are wrong
                
                if( phpFileName === "login.php"){
                    if( post.response.ok) {
                        window.localStorage.setItem( "user", JSON.stringify( post.resource.username));
                        window.localStorage.setItem( "img_name", JSON.stringify( post.resource.img_name));
    
                        renderMainThread();
                    } else {
                        message.innerHTML = `${ post.resource.message}, please try agin`;
                        displayAlert(post.resource.message)
                    }
                }
                else if( phpFileName === "register.php"){ 
                    if (post.response.ok) {
                        message.innerHTML = `The registration was a success, welcome to ClassCode ${post.resource}`;
                    } else {
                        message.innerHTML = `Something went wrong, ${post.resource.message}`;
                    }
                }

            } catch (error) {

            }
        });   
    }
}

function renderWelcomePage() {
    document.querySelector( ".modularCss").setAttribute( "href", "CSS/welcomePage.css");

    document.querySelector( "main").innerHTML = `
    <section>
        <h1>Welcome to ClassCode!</h1>
        <p class="hidden">The place where WDU helps You!<br>Let's Get Going.</p>
    </section>

    <section class="hidden">
        <h1>The AIT HELPER</h1>
    </section>

    <section class="hidden">
        <h1>Join the community</h1>
        <div class="registerButtonHeader clearButton buttonAnimation">Sign Up</div>
    </section>
    `;

    document.querySelector( ".loginButtonHeader").addEventListener("click", () => loginRegisterPage( "Login", "Not a user? Register here!"));
    document.querySelector( ".registerButtonHeader").addEventListener("click", () => loginRegisterPage( "Register", "Already got an account? Login here"));
}