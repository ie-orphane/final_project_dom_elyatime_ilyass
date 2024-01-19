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

//& events / gallery carousel : start
class myCarousel {

    // right slide function
    right_slide(times) {
        if (times == 0) {
            this.onSlide = false
            return
        }

        this.onSlide = true

        // get the first carousel item
        const firstItem = this.container.firstElementChild
        // clone first carousel item
        const clonedItem = firstItem.cloneNode(true)
        // add first carousel item to carousel container
        this.container.appendChild(clonedItem)
        
        // move the caroussel container
        this.container.style.transform = `translateX(calc( -${firstItem.clientWidth}px - .5rem))`

        const activeItem = this.container.querySelector('.myCarousel-item.active')
        activeItem.classList.remove('active')

        const nextItem = activeItem.nextElementSibling || this.container.firstElementChild
        nextItem.classList.add('active')

        setTimeout(() => {
            // remove out carousel item
            firstItem.remove()
            
            // remove active class from current carousel item
            const activeBtn = this.navigation.querySelector('button.active')
            activeBtn.classList.toggle('active')
            
            // add active class to the next carousel item
            const nextBtn = activeBtn.nextElementSibling || this.navigation.firstElementChild
            nextBtn.classList.toggle('active')
            
            // remove transition
            this.container.style.transition = 'none'
            // undo translation
            this.container.style.transform = `translate(0)`
            
            setTimeout(() => {
                // add back transition
                this.container.style.transition = 'transform 1s ease-in-out'
                this.right_slide(times - 1)
            }, .1 * 1e+3);
        }, 1 * 1e+3);
    }

    // left slide function
    left_slide(times) {
        console.log(this)
        if (times == 0) {
            this.onSlide = false
            return
        }

        this.onSlide = true

        // get the last carousel item
        const lastItem = this.container.lastElementChild
        // clone last carousel item
        const clonedItem = lastItem.cloneNode(true)

        // add last carousel item to carousel container
        this.container.insertAdjacentElement('afterbegin', clonedItem)

        // remove transition
        this.container.style.transition = 'none'

        // move the caroussel container
        this.container.style.transform = `translateX(calc( -${lastItem.clientWidth}px - .5rem))`

        const activeItem = this.container.querySelector('.myCarousel-item.active')
        activeItem.classList.remove('active')

        const previousItem = activeItem.previousElementSibling || this.container.lastElementChild
        previousItem.classList.add('active')
        
        setTimeout(() => {
            // readd transition
            this.container.style.transition = 'transform 1s ease-in-out'

            // undo translation
            this.container.style.transform = `translate(0)`
            
            setTimeout(() => {
                // remove out carousel item
                lastItem.remove()
                
                // remove active class from current carousel item
                const activeBtn = this.navigation.querySelector('button.active')
                activeBtn.classList.toggle('active')
                
                // add active class to the previous carousel item
                const previousBtn = activeBtn.previousElementSibling || this.navigation.lastElementChild
                previousBtn.classList.toggle('active')

                
                setTimeout(() => {
                    // add back transition
                    this.container.style.transition = 'transform 1s ease-in-out'
                    this.left_slide(times - 1)
                }, .1 * 1e+3);
            }, 1 * 1e+3);
        }, 1);
    }

    constructor(id) {
        this.id = id
        this.onSlide = false
        
        this.carousel = document.querySelector(id)
        this.container = document.querySelector(`${id} .myCarousel-container`)
        this.navigation = document.querySelector(`${id} .myCarousel-navigation`)

        this.navigation.querySelectorAll('button').forEach((btn, key) => {
            btn.addEventListener('click', function () {
                console.log(this)
                if (!this.onSlide) {
                    // get active button
                    const activeBtn = this.navigation.querySelector('button.active')

                    // get index of active button
                    const activeKey = parseInt(activeBtn.dataset.slideTo)

                    // const slide = key - activeKey > 0 ? this.right_slide : this.left_slide
                    // slide(Math.abs(key - activeKey))

                    if (key - activeKey > 0) {
                        this.right_slide
                        }
                    else {
                        this.left_slide
                    }
                }
            })
        })
        
        setInterval(() => this.right_slide(1), 5 * 1e+3)
    }
}

new myCarousel("#galleryCarousel")
new myCarousel("#eventsCarousel")
//& events / gallery carousel : end