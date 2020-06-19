import api from './api'

async function LoginUser(e) {
    e.preventDefault()
    try {
        console.log('login fired')
        const formData = {
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value
        }

        console.log(formData)

        await api({
            method: 'POST',
            url: '/user/login',
            data: formData 
        })
        .then(res => {
            console.log(res.message)

            const userId = res.data._id || false

            if (userId) {
                localStorage.setItem('user', userId);
                res.status === 200 ? window.location.href = '/dashboard' : ''
            } else {
                const message = response.data;
                console.log(message);
            }
        }) 
    } catch(err) {
        console.log(err)
        clearFormData()
        const formLog = document.querySelector('.form-log')
        formLog.innerHTML = 'Sorry something went wrong. Does this user already exist?'
    }
}

function clearFormData() {
    document.querySelector('#email').value = ''
    document.querySelector('#password').value = ''
}

export default LoginUser
