const Router = require('express-promise-router');

const db = require('../db')

const router = new Router();

module.exports = router;

router.get('/:id',async (req,res) => {
    try{
        const { id } = req.params;
        const { rows } = await db.query(`SELECT * FROM public.user`)
        if(rows.length === 0) res.json({ message: 'invalid user' });
        else res.send(rows);
    } catch(err){
        return Promise.reject(err);
    }
})