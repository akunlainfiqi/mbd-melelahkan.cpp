const Router = require('express-promise-router');
const passport = require('passport');
const router = new Router();

const TravelController = require('../controller/travelplan.controller');
const DestinationController = require('../controller/destination.controller');


module.exports = router;

router.get('/',passport.authenticate('jwt', {session :false}),async(req,res)=>{
    hasil = await TravelController.getTravelPlanByUserId(req.user.id_user);
    res.send(hasil);
})

router.get('/:id',passport.authenticate('jwt', {session :false}), async(req,res)=>{
    try{
        detail_plan = await TravelController.getTravelPlanById(req.params.id,req.user.id_user);
        member_plan = await TravelController.getTravelPlanMemberByTravelId(req.params.id);
        dest_plan = await DestinationController.getDestinationByTravelId(req.params.id);
        hasil = {detail_plan, member_plan, dest_plan};
        res.send(hasil);
    } catch(err){
        console.log(err);
        return 400;
    }
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
});

router.delete('/:id_plan',passport.authenticate('jwt',{session:false}),async (req,res)=>{
    try{
        hasil = await TravelController.deleteTravelPlan(req.params.id_plan,req.user.id_user);
        res.sendStatus(hasil);
    }catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})

router.post('/invite',passport.authenticate('jwt',{session:false}),async (req,res) => {
    try{
        const { id_plan, invited_email } = req.body, { id_user } = req.user;
        hasil = await TravelController.addUserToPlan(id_plan, invited_email, id_user);
        res.sendStatus(hasil);
    } catch(err){
        console.log(err);
        res.sendStatus(500);
    }
})