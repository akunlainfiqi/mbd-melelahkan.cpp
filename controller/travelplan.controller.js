const db = require('../db');
const getTravelPlanByUserId = async (id_user)=>{
    try{
        const { rows } = await db.query(
            `SELECT id_plan, nama_plan, start_date, end_date, price_plan
            FROM travel_plan, user_travel_plan
            WHERE $1 = user_travel_plan.user_id_user AND travel_plan.id_plan = user_travel_plan.travel_plan_id_plan
            `, [id_user]
        );
        rows.forEach(e => {
            const oldStartDate = new Date(e.start_date);
            const oldEndDate = new Date(e.end_date);
            let convertOSD = oldStartDate.toLocaleString().split(',')[0];
            let convertOED = oldEndDate.toLocaleString().split(',')[0];
            e.start_date = convertOSD;
            e.end_date = convertOED;
        });
        return rows;
    } catch(e) {
        console.log(e);
        return 400
    }
}

const createTravelPlan = async (nama, start, end, price, admin) =>{
    try{
        db.query(`BEGIN`);
        const insert = await db.query(
            `INSERT INTO travel_plan 
            VALUES (nextval('travel_plan_seq'),$1,$2,$3,$4,$5)`,
            [nama, start, end, price, admin]
        );
        db.query(`COMMIT`);
        console.log(insert);
        return 200;
    } catch(e) {
        console.log(e);
        return 500;
    }
}
const deleteTravelPlan = async(id_plan,user_id)=>{
    try{
        db.query(`BEGIN`);
        const remove = await db.query(
            `DELETE FROM travel_plan WHERE id_plan = $1 AND admin_user_id = $2`,[id_plan,user_id]
            );
        db.query(`COMMIT`);
        console.log(remove);
        return 200;
    }catch(e){
        console.log(e);
        return 500;
    }
}
const addUserToPlan = async(id_plan,invited_user,admin_id)=>{
    db.query(`BEGIN`);
    const invite = await db.query(`
    insert into user_travel_plan values ((select id_user from traveluser where email = $1),(select id_plan from travel_plan where id_plan = $2 and admin_user_id = $3)) `
    ,[invited_user, id_plan, admin_id]);
    db.query(`COMMIT`);
    return 200;
}
module.exports={
    getTravelPlanByUserId,
    createTravelPlan,
    deleteTravelPlan,
    addUserToPlan,
}