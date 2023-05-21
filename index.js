document.querySelector( ".homebutton-navigation").addEventListener( "click", event => {
    window.location = `${serverEndpoint}`
})

// themeSwap
if( localStorage.getItem( "lightMode")) {
    document.documentElement.setAttribute( "data-theme", "light");
    document.querySelector( "body > img").src = `${serverEndpoint}/RESOURCES/lightmodeBackground.jpg`;
}else {
    document.documentElement.setAttribute( "data-theme", "dark");
    document.querySelector( "body > img").src = `${serverEndpoint}/RESOURCES/backgroundImageBlur.jpg`;
}