document.querySelector( ".homebutton-navigation").addEventListener( "click", event => {
    window.location = `/`;
})

// themeSwap
if( localStorage.getItem( "lightMode")) {
    document.documentElement.setAttribute( "data-theme", "light");
    document.querySelector( "body > img").src = `/RESOURCES/BACKGROUND/lightmodeBackground.jpg`;
}else {
    document.documentElement.setAttribute( "data-theme", "dark");
    document.querySelector( "body > img").src = `/RESOURCES/BACKGROUND/backgroundImageBlur.jpg`;
}