require('dotenv').config()

const express = require('express')
const app = express()
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

app.use(express.json())

let refreshTokens = []

const users = [
  {
    username: "test",
    password: "$2b$10$ogIIWcYWXJ2h19EDa0tkh.YT9hqFEuh9Y0mOnh6gljNxpC.9ZnqKS",
    role: "admin"
  }
]

app.post('/token', (req, res) => {
  const refreshToken = req.body.token
  if (refreshToken == null) return res.sendStatus(401)
  if (!refreshTokens.includes(refreshToken)) return res.sendStatus(403)
  jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET, (err, user) => {
    if (err) return res.sendStatus(403)
    const accessToken = generateAccessToken({ name: user.name })
    res.json({ accessToken: accessToken })
  })
})

app.delete('/logout', (req, res) => {
  refreshTokens = refreshTokens.filter(token => token !== req.body.token)
  res.sendStatus(204)
})

app.post('/login', async (req, res) => {
  // Authenticate User
  const user = users.find(user => user.username === req.body.username)
  if (user == null) {
    return res.status(400).send('Cannot find user')
  }
  try {
    if(await bcrypt.compare(req.body.password, user.password)) {
      const username = req.body.username
      const userObj = { name: username, role: user.role }
      const accessToken = generateAccessToken(userObj)
      const refreshToken = jwt.sign(userObj, process.env.REFRESH_TOKEN_SECRET)
      refreshTokens.push(refreshToken)
      res.json({ accessToken: accessToken, refreshToken: refreshToken })
      res.send("test")
    } else {
      res.send('Not Allowed')
    }
  } catch {
    res.status(500).send()
  }

})

app.get('/users', (req, res) => {
    res.json(users)
  })
  
app.post('/register', async (req, res) => {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10)
      const user = { username: req.body.username, password: hashedPassword, role: "basic" }
      users.push(user)
      res.status(201).send()
    } catch {
      res.status(500).send()
    }
})
  

function generateAccessToken(user) {
  return jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '60s' })
}

app.listen(4000)