import registerUser from './register';
import loginUser from './login';

const sessionHandler = {

    userLoggedIn: () => {
        console.log('Is user logged in')

        const userId = localStorage.getItem('user') || false;
        console.log(userId)
        if (userId && window.location.pathname === '/') window.location.href = '/dashboard'
        else if (!userId && window.location.pathname === '/') return
        else if (!userId) window.location.href = '/'
    }

}

export default sessionHandler