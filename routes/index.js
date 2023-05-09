const express = require('express')
const router = express.Router()

router.get('/', (req, res) => {
    res.render('index') //render our view that is index.ejs file
})

module.exports = router