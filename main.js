function Init(){
    const slides = document.querySelectorAll('.slide');
    const pages = document.querySelectorAll('.page');
    const backgrounds = [
    `radial-gradient(#2b3760, #161616)`, 
    `radial-gradient(#800d0d, #161616)`, 
    `radial-gradient(#c7a614, #161616)`];

    //Page number tracker
    let current = 0;
    let scrollIndex = 0;

    slides.forEach((slide, index) => {
        slide.addEventListener('click', function(){
            ChangeDots(this);
            NextSlide(index);
            scrollIndex = index;
        })
    });

    /// Changing the dots
    function ChangeDots(dot){
        slides.forEach(slide => {
            slide.classList.remove('active');
        })
        dot.classList.add("active");
    }

    /// Animations page components transitions
    function NextSlide(pageNumber){
        const nextPage = pages[pageNumber];
        const currentPage = pages[current];
        const nextPicLeft = nextPage.querySelector('.hero .model-left');
        const nextPicRight = nextPage.querySelector('.hero .model-right');
        const currentPicLeft = currentPage.querySelector('.hero .model-left');
        const currentPicRight = currentPage.querySelector('.hero .model-right');
        const nextText = nextPage.querySelector('.details');
        const portfolio = document.querySelector('.portfolio');

        var timeline = gsap.timeline({
            onStart: function(){
                slides.forEach(slide => {
                    slide.style.pointerEvents = 'none';
                })
            },
            onComplete: function(){
                slides.forEach(slide => {
                    slide.style.pointerEvents = 'all';
                })
            }
        });

        timeline.fromTo(currentPicLeft, 0.3, {y: '=10%'}, {y: '-100%'})
        .fromTo(currentPicRight, 0.3, {y: '=10%'}, {y: '-100%'}, '-=0.2')
        .to(portfolio, 0.3, {backgroundImage: backgrounds[pageNumber]})
        .fromTo(currentPage, 0.3, {opacity:1, pointerEvents: 'all'}, {opacity:0, pointerEvents: 'none'})
        .fromTo(nextPage, 0.3, {opacity:0, pointerEvents: 'none'}, {opacity:1, pointerEvents: 'all'}, '-=0.6')
        .fromTo(nextPicLeft, 0.3, {y: '-100%'}, {y: '-10%'}, '-=0.6')
        .fromTo(nextPicRight, 0.3, {y: '-100%'}, {y: '10%'}, '-=0.8')
        .fromTo(nextText, 0.2, {opacity: 0, y: 0}, {opacity: 1, y:0})
        .set(nextPicLeft, {clearProps: 'all'})
        .set(nextPicRight, {clearProps: 'all'});

        current = pageNumber;
    }

    /// Event Listener scrolling
    document.addEventListener("wheel", throttle(scrollChange, 1000));
    document.addEventListener("touchmove", throttle(scrollChange, 1000));

    /// For indicating the switching to different pages
    function switchDots(dotIndex){
        const activeDot = document.querySelectorAll('.slide')[dotIndex];
        slides.forEach(slide => {
            slide.classList.remove('active');
        })
        activeDot.classList.add("active");
    }

    /// For giving the scrollwheel the function to scroll through pages
    function scrollChange(e){
        if(e.deltaY > 0){
            scrollIndex += 1;
        }
        else{
            scrollIndex -= 1;
        }

        if(scrollIndex > 2){
            scrollIndex = 0;
        }
        else if( scrollIndex < 0){
            scrollIndex = 2;
        }
        switchDots(scrollIndex);
        NextSlide(scrollIndex);
    }

    const hamburger = document.querySelector('.hamburger-menu');
    const navOpen = document.querySelector('.nav-open');
    const contact = document.querySelector('.contact');
    const social = document.querySelector('.social');
    const logo = document.querySelector('.logo');

    const timeline = gsap.timeline({paused: true, reversed: true});

    timeline.to(navOpen, 0.5, {y:0})
    .fromTo(contact, 0.3, {opacity: 0, y: 10}, {opacity: 1, y:0})
    .fromTo(social, 0.3, {opacity: 0, y: 10}, {opacity: 1, y:0}, '-=0.3')
    .fromTo(logo, 0.5, {color: 'white'}, {color: 'black'}, '-=1')
    .fromTo(hamburger, 0.5, {fill: 'white'}, {fill: 'black'}, '-=1');

    hamburger.addEventListener('click', () => {
        timeline.reversed() ? timeline.play() : timeline.reverse();
    })
}

/// A throttle function that checks what action you did and what the limit is to that action
function throttle(func, limit){
    let inThrottle;
    return function(){
        const args = arguments;
        const context = this;
        if(!inThrottle){
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => (inThrottle = false), limit);
        }
    };
}

Init();