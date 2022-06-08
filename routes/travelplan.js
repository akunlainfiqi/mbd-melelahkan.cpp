const Router = require('express-promise-router');
const passport = require('passport');
const router = new Router();

const TravelController = require('../controller/travelplan.controller');

module.exports = router;

router.get('/',passport.authenticate('jwt', {session :false}),async(req,res)=>{
    console.log(req.user);
    hasil = await TravelController.getTravelPlanByUserId(req.user.id_user);
    res.send(hasil);
})