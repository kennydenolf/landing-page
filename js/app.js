/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/

let sectionElements = document.querySelectorAll('section');
let navbarList = document.getElementById('navbar__list');

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/

let isInViewport = function(el) {
      let bounding = el.getBoundingClientRect();
      return(bounding.top  <= 250 && bounding.top >= -300);
    };

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav

function buildNav(){
    const fragment = document.createDocumentFragment();
    /**
     *  TODO: a possible improvement is to replace the next lines of code 
     *  with a more elegant innerHTML + Template Literals solution
    */
    for (const el of sectionElements) {
        const newLi = document.createElement('li');
        newLi.setAttribute('class','menu__link');
        newLi.setAttribute('data-link',el.id);
        newLi.textContent= el.dataset.nav;
        fragment.appendChild(newLi);
    }
    navbarList.appendChild(fragment);
}

// Add class 'active' to section when near top of viewport

function activateSectionInView(){
    for (const el of sectionElements) {
        const navListElement = document.querySelector(`.menu__link[data-link='${el.id}']`);
        if (isInViewport(el)) {
            el.classList.add('your-active-class');
            navListElement.classList.add('active__link');
        } else {
            el.classList.remove('your-active-class');
            navListElement.classList.remove('active__link');
        }
    }
}

// Scroll to anchor ID using scrollTO event

function scrollToSection(evt){
    if (evt.target.hasAttribute('data-link')) {
        const scrollToElement = document.getElementById(evt.target.dataset.link);
        /**
         * code commented out underneath also works, but has issues with fixed navbar on top of section content.
         * scrollToElement.scrollIntoView({block: 'center', behavior: 'smooth'});
        */
        window.scrollTo({top:scrollToElement.offsetTop - 100, behavior:'smooth'});
    }
}

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
document.addEventListener('DOMContentLoaded', buildNav);
// Scroll to section on link click
navbarList.addEventListener('click', scrollToSection);
// Set sections as active
window.addEventListener('scroll', activateSectionInView,false);