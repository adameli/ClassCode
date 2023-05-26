// control if logged in or not
if( !localStorage.getItem( "classcode_user")) {
    renderWelcomePage();
}else {
    renderMainThread();
}

const main = document.querySelector( "main");

function loginRegisterPage( type, changeTypeMessage) {
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
            <div id=change>${changeTypeMessage}</div>
        </div>
    `;

    deployCharacterLimit();

    // These variables are the input elements where we will get the users credentials
    const usernameInput = document.getElementById( "username");
    const passwordInput = document.getElementById( "password");

    // We add a click function to the "alredy user button" so the user can navigate back to the loginpage
    let button = document.getElementById( "change");
    if( type === "Login") {
        button.addEventListener( "click", () => loginRegisterPage( "Register", "Already got an account? Login here"));
        
        loginRegisterSubmit( "login.php");
 
    }
    else if( type === "Register") {
        button.addEventListener( "click", () => loginRegisterPage( "Login", "Not a user? Register here!"));

        loginRegisterSubmit( "register.php");
        
    }
    
    function loginRegisterSubmit( phpFileName) {
        // We add a submit function to the form element, when the user submits we send the a new Request to try an login as a user
        let form = main.querySelector( "form");
        form.addEventListener( "submit", async function ( event) {
            event.preventDefault();
            let message = main.querySelector( "#message");

            // We make an Requst that we will send to the fetchFunction
            let request = new Request(`API/${phpFileName}`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username: usernameInput.value,
                    password: passwordInput.value
                })
            });

            // We fetch and get back an object with {response: serversresponse and resource: the data the server sent back(username)}
            let post = await fetchFunction( request);

            // controlls if the serverresponse is ok (true or false)
            // if the users credentials is correct, they access their account and redirects to the MainThreadPage
            // else will let the user know that the credentials are wrong
            
            if( phpFileName === "login.php"){
                if( post.response.ok) {
                    window.localStorage.setItem( "classcode_user", JSON.stringify( post.resource.username));
                    window.localStorage.setItem( "img_name", JSON.stringify( post.resource.img_name));

                    renderMainThread();
                } else {
                    message.innerHTML = `${ post.resource.message}, please try agin`;
                    message.classList.add( "notSuccses");
                }
            }
            else if( phpFileName === "register.php"){ 
                if (post.response.ok) {
                    message.innerHTML = `The registration was a success, welcome to ClassCode ${post.resource}`;
                    message.classList.add( "succses");
                } else {
                    message.innerHTML = `Something went wrong, ${post.resource.message}`;
                    message.classList.add( "notSuccses");
                }
            }
        });   
    }
}

function renderWelcomePage() {
    activeTheme();
    assignHomeButton( "../");
    
    document.querySelector( ".modularCss").setAttribute( "href", "CSS/welcomePage.css");

    document.querySelector( "main").innerHTML = `
    <section>
        <div>
            <h1>Welcome to <span>ClassCode!<span></h1>
            <p class="welcomeTextUH">The place where WDU helps You!<br>Let's Get Going.</p>
        </div>

        <a href="#findAnswers"><div class="bouncingArrow"></div></a>
    </section>

    <section id="findAnswers">
        <div>
            <h1>Find your Answers!</h1>
            <p><span>ClassCode</span> is designed with you in mind,<br>
            Here You can ask all <span>questions</span> or share a discovery with your class,<br>
            And the best thing! <span>Everyone</span> can Contribute with their own input!</p>
        </div>

        <div class="iframeContainer hidden">
            <iframe src="PAGE/thread.php?thread_id=1" title="threadInsight"></iframe> 
        </div>
        <div class="hidden"></div>
        <div class="hidden"></div>
        </section>
        
        <section>
            <h1>Join your Class</h1>
            <p><span>CodeClass</span> is a community based platform, it works because of our contributing <span>classmates</span>. We all exist for each other, here we strive to learn and <span>help</span> each other become better programmers each and every day.<br><strong><span>Join You too!</span></strong></p>
            <div class="hoveringUsers-WelcomePage hidden">
                <div class="hoveringUser hidden">
                    <img src="API/PROFILE_IMG/AdamE.jpg">
                    <div>AdamE</div>
                </div>
                <div class="hoveringUser HU-transform hidden">
                    <img src="API/PROFILE_IMG/DeoHard.jpg">
                    <div>DeoHard</div>
                </div>
                <div class="hoveringUser HU-transform hidden">
                    <img src="API/PROFILE_IMG/Isak.png">
                    <div>Isak</div>
                </div>
                <div class="hoveringUser hidden">
                    <img src="API/PROFILE_IMG/ClassCode.png">
                    <div>ClassCode</div>
                </div>
            </div>

            <div class="flexItem-joinClass">
                <div>
                    <p><strong><span>Create your account here!</span></strong>
                    <br>And lets get going...</p> 
                </div>
                <div class="registerButtonHeader clearButton buttonAnimation">Sign Up</div>
            </div>
        </section>
        `;

    document.querySelector( ".loginButtonHeader").addEventListener( "click", () => loginRegisterPage( "Login", "Not a user? Register here!"));
    document.querySelector( ".registerButtonHeader").addEventListener( "click", () => loginRegisterPage( "Register", "Already got an account? Login here"));
}
    