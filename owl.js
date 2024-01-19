const carousel = document.querySelector('.myCarousel')
const carousselContainer = document.querySelector('.myCarousel-container')

const rightSlide = document.querySelector('.right-slide')
const leftSlide = document.querySelector('.left-slide')

const carousselNav = document.querySelector('.myCarousel-navigation')
const carousselItems = carousselContainer.children

let onSlide = false

function child_index(childrens, searchChild) {
    for (const index in childrens) {
        if (childrens[index] == searchChild) {
            return index
        }
    }
}

function update_nav() {
    console.log(carousselItems)
    carousselNav.innerHTML = ''
    for (const index in carousselItems) {
        if (index === 'length') {
            break
        }
    
        if (carousselItems[index].classList.contains('active')) {
            carousselNav.innerHTML += `
                <div id="item-${index}">
                    <input id="carousel-item-${index}" name="active-carousel-item" type="radio">
                    <label for="carousel-item-${index}"><i class="fa-regular fa-circle-dot"></i></label>
                </div>`
        } else {
            carousselNav.innerHTML += `
            <div id="item-${index}">
                <input id="carousel-item-${index}" name="carousel-item" type="radio">
                <label for="carousel-item-${index}"><i class="fa-regular fa-circle"></i></label>
            </div>`
        }
    
    }
}

update_nav()

// right slide function
const right_slide = function () {
    if (!onSlide) {
        onSlide = true

        // search for the last active caroussel item
        const activeItems = carousel.querySelectorAll('.active')
        const firstActiveItem = activeItems.item(0)
        const lastActiveItem = activeItems.item(activeItems.length - 1)

        // get next caroussel item
        const nextItem = lastActiveItem.nextElementSibling // || carousselContainer.firstElementChild

        // remove 'active' class from first active caroussel item
        firstActiveItem.classList.remove('active')

        // add 'active' class to next caroussel item
        nextItem.classList.add('active')

        // move the caroussel container
        carousselContainer.style.transform = `translateX(calc( -${lastActiveItem.clientWidth}px - 2rem))`

        setTimeout(() => {
            // first caroussel item
            const firstItem = carousselContainer.firstElementChild
            firstItem.remove()
            carousselContainer.appendChild(firstItem)

            carousselContainer.style.transition = 'none'
            carousselContainer.style.transform = `translate(0)`

            setTimeout(() => {
                carousselContainer.style.transition = 'transform 1s ease-in-out'
                
                const lastNav = carousselNav.lastElementChild
                lastNav.remove()

                carousselNav.innerHTML = `
                <div id="${lastNav.id}">
                    <input id="carousel-${lastNav.id}" name="active-carousel-item" type="radio">
                    <label for="carousel-${lastNav.id}"><i class="fa-regular fa-circle"></i></label>
                </div>` + carousselNav.innerHTML
                onSlide = false
            }, .1 * 1e+3);
        }, 1 * 1e+3);
    }
}


// left slide function
const left_slide = function () {
    if (!onSlide) {
        onSlide = true

        // last caroussel item
        const lastCarousselItem = carousselContainer.lastElementChild
        lastCarousselItem.remove()
        carousselContainer.insertAdjacentElement('afterbegin', lastCarousselItem)

        carousselContainer.style.transition = 'none'
        carousselContainer.style.transform = `translateX(calc( -${lastCarousselItem.clientWidth}px - 2rem))`

        // search for the last active caroussel item
        const activeItems = carousel.querySelectorAll('.active')
        const lastActiveItem = activeItems.item(activeItems.length - 1)

        const previousItem = carousselContainer.firstElementChild

        // remove 'active' class from last active caroussel item
        lastActiveItem.classList.remove('active')

        // add 'active' class to previous caroussel item
        previousItem.classList.add('active')

        // move the caroussel container
        setTimeout(() => {
            carousselContainer.style.transition = 'transform 1s ease-in-out'
            carousselContainer.style.transform = `translateX(0)`
            setTimeout(() => {
                onSlide = false
                update_nav()
            }, 1 * 1e+3);
        }, 1);
    }
}


// auto slide
// setInterval(right_slide, 2 * 1e+3)

// click slide
rightSlide.addEventListener('click', right_slide)
leftSlide.addEventListener('click', left_slide)
