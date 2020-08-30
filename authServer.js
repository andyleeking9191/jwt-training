require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())

app.post('/login', (req, res) => {
    // Authentification of the user can be used here in future. The code below assumes that the user was already authenticated.

    const username = req.body.username
    const user = { name: username }

    const accessToken = jwt.sign(user, process.env.PRIVATE_KEY )
    res.json({accessToken: accessToken})
})

app.listen(4000, () => console.log('The authorization server is listening on port 4000!'))