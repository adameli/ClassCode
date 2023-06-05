// observer in welcome page, observes all hidden classes during scroll, if viewport intersects with element, .show is assigned and element-
// animates into view
const observer = new IntersectionObserver( entries => {
    entries.forEach( entry => {
        
        if( entry.isIntersecting) {
            entry.target.classList.add( "show");
        }else {
            entry.target.classList.remove( "show");
        }
    });
});

const hiddenElements = document.querySelectorAll( ".hidden");
hiddenElements.forEach( element => observer.observe( element));


const firstSectionText = document.querySelectorAll( "animateBottomToTop");
firstSectionText.forEach( element => observer.observe( element));