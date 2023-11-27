const router = require('express').Router();
const controller = require('../../controller/main/carController')
const requireAuth = require('../../middlewares/middleware')
router.post('/add',requireAuth, controller.add)
router.put('/update',requireAuth, controller.update)
router.get('/get',requireAuth, controller.get)
router.delete('/delete',requireAuth, controller.delete)

module.exports = router