require('dotenv').config()
const express = require('express')
const jwt = require('jsonwebtoken')

const app = express()
app.use(express.json())

const posts = [
    {
        username: 'Andrew',
        title: 'Post 1'
    },
    {
        username: 'John',
        title: 'Post 2'
    }
]


app.get('/posts', authenticateToken, (req, res) => {
    res.json(posts.filter(post => post.username === req.user.name))
})

app.post('/login', (req, res) => {
    // Authentification of the user can be used here in future. The code below assumes that the user was already authenticated.

    const username = req.body.username
    const user = { name: username }

    const accessToken = jwt.sign(user, process.env.PRIVATE_KEY )
    res.json({accessToken: accessToken})
})

function authenticateToken(req, res, next) {
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (token == null) return res.sendStatus(401)

    jwt.verify(token, process.env.PRIVATE_KEY, (err, user) => {
        if (err) return res.sendStatus(403)
        req.user = user
        next()
    })
}

app.listen(5000, () => console.log('The server is listening on port 5000!'))