const express = require("express")
const router = express.Router();

router.get('/', (req, res) => {
    res.send('User Page');
});

router.get('/new', (req, res) => {
    res.send('User New Page')
});


module.exports = router;