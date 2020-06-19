const User = require('../models/User');
const bcrypt= require('bcrypt');

module.exports = {
    async createUser(req, res) {
        try {
            const {firstName, lastName, password, email} = req.body;
            const existingUser = await User.findOne({email});

            if(!existingUser) {
                // sets hash password to database for security. The higher the number the bigger the password.
                const hashedPassword = await bcrypt.hash(password, 10)

                const user = await User.create({
                    firstName,
                    lastName,
                    email,
                    password: hashedPassword,
                })

                return res.json({
                    _id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                })

            }

            return res.status(400).json({
                message: 'Email user already exists! Do you want to login instead'
            })

        } catch(error) {
            throw Error(`Error while registering new user: ${error}`)
        }
    },

    async loginUser(req, res) {
        try {
            const { email, password } = req.body;
 
            // check if required fields are filled out
            if(!email || !password) {
                return res.status(200).json({message: 'Required field missing'})
            }
 
            const user = await User.findOne({ email })
 
            // if no user in the database
            if(!user) {
                 return res.status(200).json({message: 'User not found. Do you want to register instead?'})
            }
 
            // if password matches return user and email to be stored in browser
            if(user && await bcrypt.compare(password, user.password)) {
                const userResponse = {
                     _id: user._id,
                     firstName: user.firstName,
                     lastName: user.lastName, 
                     email: user.email
                }
 
                return res.json(userResponse)
            } else {
                 return res.status(401).json({message: 'User email or password does not match'})
            }
        } catch (error) {
            throw Error(`Error while Authenticating our user ${error}`)
        } 
    }
}