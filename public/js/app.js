//~ navbar : start 
const navbarOpen = document.getElementById('navbar-open')
const navbarClose = document.getElementById('navbar-close')

const navbar_toggle = () => {
    navbarOpen.classList.toggle("d-none")
    navbarClose.classList.toggle("d-none")
    const navbar = document.querySelector('nav')
    navbar.classList.toggle('closed')
    navbar.classList.toggle('bg--light')
}

navbarOpen.addEventListener('click', navbar_toggle)
navbarClose.addEventListener('click', navbar_toggle)

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', () => {
        document.querySelector('nav .active').classList.toggle('active')
        link.classList.toggle('active')
    })
})
//~ navbar : end 

//^ register modal : start
for (const btn of document.getElementsByTagName('button')) {
    if (btn.dataset.toggle == 'myModal') {
        const modal = document.getElementById(btn.dataset.target)

        btn.addEventListener('click', () => {
            modal.classList.add('d-flex')
        })

        modal.addEventListener('click', (e) => {
            if (e.target == modal && !modal.dataset.backdrop) {
                modal.classList.remove('d-flex')
            }
        })
    }
}
//^ register modal : end

//& signup/login : start
document.querySelectorAll('.register-toggle').forEach(toggle => {
    toggle.addEventListener('click', () => {
        document.querySelectorAll('.register-toggle').forEach(toggle => {
            toggle.classList.toggle('active')
        })
        document.querySelectorAll('.register-form').forEach(form => {
            form.classList.toggle('d-none')
            form.classList.toggle('d-flex')
        })
    })
})
//& signup/login : end

//^ nav/tab menu : start
const menuNavs = document.querySelectorAll('.nav-item')

menuNavs.forEach(nav => {
    nav.addEventListener('click', () => {
        const activeNav = document.querySelector('.nav-item.active')

        activeNav.classList.remove('active')
        nav.classList.add('active')

        document.querySelector(`#${activeNav.dataset.toggle}`).classList.add('d-none')
        document.querySelector(`#${nav.dataset.toggle}`).classList.remove('d-none')
    })
})
//^ nav/tab menu : end

//& events carousel : start
let onSlide = false

const carousel = document.querySelector('#eventsCarousel')
const carouselContainer = carousel.querySelector('.myCarousel-container')

const carouselNavigation = carousel.querySelector('.myCarousel-navigation')
const navigationBtns = carouselNavigation.querySelectorAll('button')

// right slide function
const right_slide = function (times) {
    if (times == 0) {
        onSlide = false
        return
    }

    onSlide = true

    // get the first carousel item
    const firstItem = carouselContainer.firstElementChild
    // clone first carousel item
    const clonedItem = firstItem.cloneNode(true)
    // add first carousel item to carousel container
    carouselContainer.appendChild(clonedItem)

    // move the caroussel container
    carouselContainer.style.transform = `translateX(calc( -${firstItem.clientWidth}px - .5rem))`

    setTimeout(() => {
        // remove out carousel item
        firstItem.remove()

        // remove active class from current carousel item
        const activeBtn = carouselNavigation.querySelector('button.active')
        activeBtn.classList.toggle('active')

        // add active class to the next carousel item
        const nextBtn = activeBtn.nextElementSibling || carouselNavigation.firstElementChild
        nextBtn.classList.toggle('active')

        // remove transition
        carouselContainer.style.transition = 'none'
        // undo translation
        carouselContainer.style.transform = `translate(0)`

        setTimeout(() => {
            // add back transition
            carouselContainer.style.transition = 'transform 1s ease-in-out'
            right_slide(times-1)
        }, .1 * 1e+3);
    }, 1 * 1e+3);
}

// left slide function
const left_slide = function (times) {
    if (times == 0) {
        onSlide = false
        return
    }

    onSlide = true

    // get the last carousel item
    const lastItem = carouselContainer.lastElementChild
    // clone last carousel item
    const clonedItem = lastItem.cloneNode(true)

    // add last carousel item to carousel container
    carouselContainer.insertAdjacentElement('afterbegin', clonedItem)

    // remove transition
    carouselContainer.style.transition = 'none'

    // move the caroussel container
    carouselContainer.style.transform = `translateX(calc( -${lastItem.clientWidth}px - .5rem))`


    setTimeout(() => {
        // readd transition
        carouselContainer.style.transition = 'transform 1s ease-in-out'

        // undo translation
        carouselContainer.style.transform = `translate(0)`

        setTimeout(() => {
            // remove out carousel item
            lastItem.remove()

            // remove active class from current carousel item
            const activeBtn = carouselNavigation.querySelector('button.active')
            activeBtn.classList.toggle('active')

            // add active class to the previous carousel item
            const previousBtn = activeBtn.previousElementSibling || carouselNavigation.lastElementChild
            previousBtn.classList.toggle('active')


            setTimeout(() => {
                // add back transition
                carouselContainer.style.transition = 'transform 1s ease-in-out'
                left_slide(times-1)
            }, .1 * 1e+3);
        }, 1 * 1e+3);
    }, 1);
}

navigationBtns.forEach((btn, key) => {
    btn.addEventListener('click', () => {
        if (!onSlide) {
            console.log('notonslide')
            // get active button
            const activeBtn = carouselNavigation.querySelector('button.active')

            // get index of active button
            const activeKey = parseInt(activeBtn.dataset.slideTo)

            const slide = key - activeKey > 0 ? right_slide : left_slide
            slide(Math.abs(key - activeKey))
        }
    })
})

// auto slide
setInterval(() => right_slide(1), 5 * 1e+3)
//& events carousel : end
