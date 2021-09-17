const darkButton = document.getElementById('dark');
const lightButton = document.getElementById('light');

const setColorMode = () => {
    if (localStorage.getItem('colorMode') == 'dark') {
        setDarkMode();
        darkButton.click();
    } else if (localStorage.getItem('colorMode') == 'light') {
        setLightMode();
        lightButton.click();
    }
};

const checkMode = () => {
    if (localStorage.getItem('colorMode') == null) {
        if (window.matchMedia('(prefers-color-scheme: light)').matches) {
            lightButton.click();
        } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
            darkButton.click();
        }
    }
};

const checkModeChange = () => {
    window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (event) => {
        checkMode();
    });
};

const setDarkMode = () => {
    document.querySelector('body').classList = 'dark';
};

const setLightMode = () => {
    document.querySelector('body').classList = 'light';
};

setColorMode();
checkMode();
checkModeChange();

const radioButtons = document.querySelectorAll('.toggle__wrapper input');
for (let i = 0; i < radioButtons.length; i++) {
    radioButtons[i].addEventListener('click', (event) => {
        if (darkButton.checked) {
            localStorage.setItem('colorMode', 'dark');
            setDarkMode();
        } else {
            localStorage.setItem('colorMode', 'light');
            setLightMode();
        }
    });
}

// Navbar Functionality
const header = document.querySelector('header');
window.addEventListener("scroll", function(){
    header.classList.toggle("sticky", window.scrollY > 0)
});

// Slideshow Functionality
const HomePageSlider = () => {
    const left = document.querySelector('.sliderarrow-prev');
    const right = document.querySelector('.sliderarrow-next');
    const slider = document.querySelector('.slideshow__slider');

    const indicatorParent = document.querySelector('.slideshow__controller ul');
    const indicators = document.querySelectorAll('.slideshow__controller li');
    let index = 0;

    indicators.forEach((indicator, i) => {
        indicator.addEventListener('click', () => {
            console.log(index)
            document.querySelector('.slideshow__selected').classList.remove('slideshow__selected');
            indicator.classList.add('slideshow__selected');
            //slider.style.transform = 'translateX(' + (i) * - 100 + '%)';
            index = i;
            // Sort the right image ontop
            document.querySelector('.slideshow__image').classList.remove('slideshow__image')
            slider.children[index].classList.add('slideshow__image');
        });
    });

    left.addEventListener('click', function() {
        console.log(index)
        index = (index > 0) ? index - 1 : 2;
        // Sort the right image ontop
        document.querySelector('.slideshow__image').classList.remove('slideshow__image');
        slider.children[index].classList.add('slideshow__image');
        // Sort the controller to match current image
        document.querySelector('.slideshow__selected').classList.remove('slideshow__selected');
        indicatorParent.children[index].classList.add('slideshow__selected');
        //slider.style.transform = 'translateX(' + (index) * - 33.33 + '%)';
    });

    right.addEventListener('click', function() {
        console.log(index)
        index = (index < 3 - 1) ? index + 1 : 0;
        // Sort the right image ontop
        document.querySelector('.slideshow__image').classList.remove('slideshow__image');
        slider.children[index].classList.add('slideshow__image');
        // Sort the controller to match current image
        document.querySelector('.slideshow__selected').classList.remove('slideshow__selected');
        indicatorParent.children[index].classList.add('slideshow__selected');
        //slider.style.transform = 'translateX(' + (index) * - 33.33 + '%)';
    });
}

// Footer button, scroll to top
const scrollToTop = () => {
    button = document.getElementById("scrollToTopButton");
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; //Chrome, Firefox, IE & Opera
}

HomePageSlider();