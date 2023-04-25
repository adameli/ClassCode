const serverEndpoint = "http://localhost:9999";

document.querySelector( ".homebutton-navigation").addEventListener( "click", event => {
    window.location = `${serverEndpoint}`
})