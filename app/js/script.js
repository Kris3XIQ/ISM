/*
    => Navbar Functionality <=
*/
const navbarScrollFunctionality = () => {
    window.addEventListener("scroll", function(){
        const header = document.querySelector('header');
        const headerLogo = document.getElementsByClassName("header__logo");

        header.classList.toggle("sticky", window.scrollY > 0);
        window.scrollY > 0 ? (headerLogo[0].style.display = "none") : (headerLogo[0].style.display = "");
    
    });
}
/* 
    => Light/Dark --mode button, built into the navbar <=
*/
const switchLightDarkMode = () => {
    const body = document.querySelector('body');
    const themeSwitch = document.getElementById('theme-switch-container');
    const userPreferDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const userPreferLightMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: light)').matches;
    if(userPreferDarkMode){
        console.log("User prefers a dark interface");
        body.classList = "dark";
    }
    if(userPreferLightMode){
        console.log("User prefers a light interface");
        body.classList = "light";
    }
    themeSwitch.addEventListener('click', (e) => {
        toggleTheme();
    })
    const toggleTheme = () => {
        if (body.classList.contains("dark")) {
            body.classList.toggle("dark");
            body.classList.toggle("light");
        } else if (body.classList.contains("light")) {
            body.classList.toggle("light");
            body.classList.toggle("dark");
        }
    }
}

/*
    => Slideshow Functinality <=
*/
const HomePageSlider = () => {
    const indicators = document.querySelectorAll('.slideshow__controlls__indicators ul .indicator');
    let slides = document.querySelectorAll('#slideshow__slides .slide');
    let currentSlide = 0;

    const nextSlide = () => {
        goToSlide(currentSlide + 1);
    }
    const previousSlide = () => {
        goToSlide(currentSlide - 1);
    }

    // Which slide to go to, denoted to s &
    // Set Slider Interval and initiate the slideshow (to remove onload delay)
    let initiateSlide = false;
    let slideInterval;
    const goToSlide = (s) => {
        slides[currentSlide].className = 'slide';
        indicators[currentSlide].className = 'indicator';
        currentSlide = (s + slides.length) % slides.length;
        slides[currentSlide].className = 'slide active';
        indicators[currentSlide].className = 'indicator active';
        if (!initiateSlide) {
            slideInterval = setInterval(nextSlide, 4000);
            initiateSlide = true;
        }
    }
    
    if (!initiateSlide) {
        goToSlide(currentSlide);
    }

    // Autoplay play/pause functionality
    const autoplay = document.querySelector('.slideshow__controlls__autoplay .autoplay');
    let autorun = true;
    autoplay.addEventListener('click', () => {
        if (autorun){ 
            autoplay.classList.remove("playing");
            autoplay.classList.add("paused");
            pauseSlideshow(); 
        } else {
            autoplay.classList.remove("paused");
            autoplay.classList.add("playing");
            playSlideshow();
        }
    });

    const pauseSlideshow = () => {
        autorun = false;
        clearInterval(slideInterval);
    }
    const playSlideshow = () => {
        autorun = true;
        slideInterval = setInterval(nextSlide, 4000);
    }

    // Slideshow button(arrow) functionality
    let previous_btn = document.querySelector('.slideshow__controlls__arrows .previous');
    let next_btn = document.querySelector('.slideshow__controlls__arrows .next');
    next_btn.onclick = () => {
        pauseSlideshow();
        nextSlide();
     };
    previous_btn.onclick = () => {
        pauseSlideshow();
        previousSlide();
    };

    let index = 0;
    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            index = i;
            goToSlide(index)
            document.querySelector('.indicator .active').classList.remove('active');
            indicator.classList.add('active');
        });
    });
}

// Footer button, scroll to top
const scrollToTop = () => {
    button = document.getElementById("scrollToTopButton");
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; //Chrome, Firefox, IE & Opera
}

switchLightDarkMode();
navbarScrollFunctionality();
HomePageSlider();