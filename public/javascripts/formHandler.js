import registerUser from './register';
import loginUser from './login';
import searchSteamId from './searchTitle'

const formHandler = {

    registerFormHandler: () => {
        console.log('register handler')
        const registrationForm = document.querySelector('[data-component="register-form"]');
        registrationForm.addEventListener('submit', registerUser)
    },
    loginFormHandler: () => {
        console.log('login handler')
        const loginForm = document.querySelector('[data-component="login-form"]');
        loginForm.addEventListener('submit', loginUser)
    },
    searchFormHandler: () => {
        console.log('search handler')
        const loginForm = document.querySelector('[data-component="search-form"]');
        loginForm.addEventListener('submit', searchSteamId)
    }

}

export default formHandler