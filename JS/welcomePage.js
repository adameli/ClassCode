function renderWelcomePage() {
    document.querySelector( ".modularCss").setAttribute( "href", "CSS/welcomePage.css");

    document.querySelector( "main").innerHTML = `
    <section>
        <h1>Welcome to CodeClass!</h1>
        <p>The place where WDU helps You!<br>Let's Get Going.</p>
    </section>

    <section>
        <h1>The AIT HELPER</h1>
    </section>

    <section>
        <h1>Join the community</h1>
        <div class="registerButtonHeader">Sign Up</div>
    </section>
    `;

    document.querySelector(".loginButtonHeader").addEventListener("click", loginpage);
    document.querySelector(".registerButtonHeader").addEventListener("click", registerpage);

}