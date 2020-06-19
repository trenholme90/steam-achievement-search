const api = require('axios')

module.exports = {
    async getGameData(req, res) {
        try {
            const gameId = Object.keys(req.params).length === 0 ? 1284410 : req.params.id
            console.log(gameId)
            const gameReq = await api.get(`http://api.steampowered.com/ISteamUserStats/GetSchemaForGame/v2/?key=${process.env.STEAM_API_Key}&appid=${gameId}`)
            const gameData = gameReq.data.game

            const { gameName, availableGameStats } = gameData

            return res.render('dashboard', { 
                gameName,
                availableGameStats
            }) 
        } catch(error) {
            throw Error(`Error while getting Steam Data: ${error}`)
        }
    },

    async sendToGamePage(req, res) {
        try {
            const { gameId } = req.body
            const resParams = {
                params: `/dashboard/${gameId}`
            }

            return res.send(resParams) 
        } catch(error) {
            throw Error(`Error while getting Steam Data: ${error}`)
        }
    }
}