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