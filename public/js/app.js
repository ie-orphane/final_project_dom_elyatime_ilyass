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
