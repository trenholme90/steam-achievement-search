import api from './api'

async function searchSteamId(e) {
    e.preventDefault()
    try {
        console.log('search fired')
        const formData = {
            gameId: document.querySelector('#steamId').value,
        }

        console.log(formData)

        await api({
            method: 'POST',
            url: '/dashboard',
            data: formData 
        })
        .then(res => {
            console.log(res)
            res.status === 200 ? window.location.href = res.data.params : ''
        }) 
    } catch(err) {
        console.log(err)
        clearFormData()
        const formLog = document.querySelector('.form-log')
        formLog.innerHTML = 'Sorry something went wrong. Does this user already exist?'
    }
}

function clearFormData() {
    document.querySelector('#steamId').value = ''
}

export default searchSteamId
