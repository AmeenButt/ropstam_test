const router = require('express').Router();
const controller = require('../../controller/user/user')
router.post('/sign-up', controller.signUp)
router.post('/sign-in', controller.signIn)

module.exports = router