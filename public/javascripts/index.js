// Webpack Entry Point

import formHandler from './formHandler'
import sessionHandler from './sessionHandler'

// Script Handler
window.addEventListener('load', function () {
    const pathName = window.location.pathname;

    if(pathName === "/") sessionHandler.userLoggedIn()
    if(pathName.indexOf('register') > -1) formHandler.registerFormHandler()
    if(pathName.indexOf('login') > -1) formHandler.loginFormHandler()
    if(pathName.indexOf('dashboard') > -1) {
        sessionHandler.userLoggedIn()
        formHandler.searchFormHandler()
    }
})