const Router = require('express-promise-router');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const UsersController = require('../controller/user.controller');

const router = new Router();

module.exports = router;
router.post('/signup',async(req, res)=>{
    try {
        const { email,nama,dob,password }=req.body;
        hasil = await UsersController.createUser(email,nama,dob,password);
        res.sendStatus(hasil)
    } catch(error){
        console.log(error);
        res.sendStatus(400);
    }
})

router.post('/signin', async (req,res)=>{
    try{
        console.log(req.body);
        const user = await UsersController.getUserByEmail(req.body.email);
        console.log(user[0].password_user,req.body.password);
        if(user==[]){
            res.sendStatus(401);
        };
        if(user[0].password_user == req.body.password){
            const token = jwt.sign(user[0],'secretthing',{ expiresIn:"1d" });
            jwt.verify(token,'secretthing',(err,data)=>{
                console.log(err,data);
            })
            res.json({success: true, token: 'JWT ' + token});
        } else {
            res.sendStatus(401);
        }
    } catch(error){
        console.log(error);
        res.sendStatus(400);
    }
});