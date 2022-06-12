const db = require('../db');
const getDestinationByTravelId = async (travel_id) =>{
    try{
        const { rows } = await db.query(`
        SELECT id_destination, nama_destination, alamat_destination, status, country_id_country 
        from destination, travel_plan_destination
        where travel_plan_destination.travel_plan_id_plan = $1 
        and travel_plan_destination.destination_id_destination = destination.id_destination
        `,[travel_id]);
        return rows;
    } catch (err) {
        console.log(err);
        return 500;
    }
}

module.exports = {
    getDestinationByTravelId,
}