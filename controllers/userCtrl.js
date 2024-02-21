const users = require('../models/userModel')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const userCtrl = {
    registerUser: async (req, res) =>{
        try{
            const {username, email, password} = req.body;
            const user = await users.findOne({email: email})
            if(user) return res.status(400).json({msg: "This email already exists boss"})
            const passwordHash = await bcrypt.hash(password, 10)
            const newUser = new users({
                username: username,
                email: email,
                password: passwordHash
            })
            await newUser.save()
            res.json(newUser)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    loginUser: async (req, res) => {
        try{
            const {email, password} = req.body;
            const user = await users.findOne({email: email})
            if (!user) return res.status(400).json({msg: "User does not exist."})

            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(400).json({msg: "Incorrect password."})

            const payload = {id: user._id, name: user.username}
            const token = jwt.sign(payload, process.env.TOKEN_SECRET, {expiresIn: "1d"})

            res.json({Token: token, name: user.username})
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    verifiedToken: (req, res) => {
        try {
            const token = req.header("Authorization")
            if(!token) return res.send(false)

            jwt.verify(token, process.env.TOKEN_SECRET, async (err, verified) =>{
                if(err) return res.send(false)

                const user = await users.findById(verified.id)
                if(!user) return res.send(false)

                return res.send(true)
            })
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }
}

module.exports = userCtrl