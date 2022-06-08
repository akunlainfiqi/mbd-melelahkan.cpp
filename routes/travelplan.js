const Router = require('express-promise-router');
const passport = require('passport');
const router = new Router();

const TravelController = require('../controller/travelplan.controller');

module.exports = router;

router.get('/',passport.authenticate('jwt', {session :false}),async(req,res)=>{
    hasil = await TravelController.getTravelPlanByUserId(req.user.id_user);
    res.send(hasil);
})

router.post('/',passport.authenticate('jwt', {session :false}),async(req,res)=>{
    try{
        const { nama, start, end, price } = req.body, { id_user } = req.user;
        hasil = await TravelController.createTravelPlan(nama, start, end, price, id_user);
        res.sendStatus(hasil);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})