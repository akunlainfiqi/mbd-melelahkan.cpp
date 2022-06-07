const db = require('../db');

const getUserByID = async (id) =>{
    try{
        const { rows } = await db.query(`SELECT * FROM public.user where id_user = $1`,[id]);
        if(rows.length === 0) return([]);
        else return(rows);
    } catch(err){
        return Promise.reject(err);
    }
}

const getUserByName = async (name) =>{
    try{
        const { rows } = await db.query(`SELECT * FROM public.user where nama_user = $1`,[name]);
        if(rows.length === 0) return([]);
        else return(rows);
    } catch(err){
        return Promise.reject(err);
    }
}

const createUser = async(nik, nama, dob, password) => {
    try{
        const check = await db.query(`select nama_user FROM public.user WHERE nama_user = $1`,[nama]);
        if(check.rows[0]){
            return 409
        } else {
            db.query(`BEGIN`);
            const status = await db.query(
                `INSERT INTO public.user VALUES (nextval('public.user_seq'),$1,$2,$3,$4)`, 
                [nik,nama,dob, password]
            );
            db.query(`COMMIT`);
            console.log(status);
            return 200;
        }
    } catch(err){
        console.log(err);
        return 400;
    }
}

module.exports = {
    getUserByID,
    getUserByName,
    createUser,
}