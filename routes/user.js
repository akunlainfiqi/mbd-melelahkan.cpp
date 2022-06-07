const Router = require('express-promise-router');
const UsersController = require('../controller/user.controller');

const router = new Router();

module.exports = router;

router.get('/:id',async (req,res) => {
    hasil = await UsersController.getUserByID(req.params.id);
    res.send(hasil);
})

router.post('/',async(req, res)=>{
    try {
        const { nik,nama,dob,password }=req.body;
        hasil = await UsersController.createUser(nik,nama,dob,password);
        res.sendStatus(hasil)
    } catch(error){
        console.log(error);
        res.sendStatus(400);
    }
})