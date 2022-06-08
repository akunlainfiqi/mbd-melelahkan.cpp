const db = require('../db');

const getUserByID = async (id) =>{
    try{
        const { rows } = await db.query(`SELECT * FROM traveluser where id_user = $1`,[id]);
        if(rows.length === 0) return([]);
        else return(rows);
    } catch(err){
        return Promise.reject(err);
    }
}

const getUserByEmail = async (email) =>{
    try{
        const { rows } = await db.query(`SELECT * FROM traveluser where email = $1`,[email]);
        if(rows.length === 0) return([]);
        else return(rows);
    } catch(err){
        return Promise.reject(err);
    }
}

const createUser = async(email, nama, dob, password) => {
    try{
        const check = await db.query(`select email FROM traveluser WHERE email = $1`,[email]);
        if(check.rows[0]){
            return 409
        } else {
            db.query(`BEGIN`);
            const status = await db.query(
                `INSERT INTO traveluser VALUES (nextval('user_seq'),$1,$2,$3,$4)`, 
                [email,nama,dob, password]
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
    getUserByEmail,
    createUser,
}