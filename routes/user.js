const Router = require('express-promise-router');
const passport = require('passport');
const UsersController = require('../controller/user.controller');

const router = new Router();

module.exports = router;



router.get('/:id',async (req,res) => {
    hasil = await UsersController.getUserByID(req.params.id);
    res.send(hasil);
})
