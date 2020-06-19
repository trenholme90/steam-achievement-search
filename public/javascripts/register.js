import api from './api'

async function registerUser(e) {
    e.preventDefault()
    try {
        console.log('fired')
        const formData = {
            firstName: document.querySelector('#first-name').value,
            lastName: document.querySelector('#last-name').value,
            email: document.querySelector('#email').value,
            password: document.querySelector('#password').value
        }

        console.log(formData)

        const res = await api({
            method: 'POST',
            url: '/user/register',
            data: formData 
        })
        .then(res => {
            console.log(res)
            res.status === 200 ? window.location.href = '/dashboard' : ''
        }) 
        

    } catch(err) {
        clearFormData()
        const formLog = document.querySelector('.form-log')
        formLog.innerHTML = 'Sorry something went wrong. Does this user already exist?'
        throw new Error(err)
    }
}

function clearFormData() {
    document.querySelector('#first-name').value = ''
    document.querySelector('#last-name').value = ''
    document.querySelector('#email').value = ''
    document.querySelector('#password').value = ''
}

export default registerUser
