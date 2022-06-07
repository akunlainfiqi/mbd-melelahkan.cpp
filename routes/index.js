const routes = {
 admin : require('./admin'),
 users : require('./user'),
 country : require('./country'),
 destination : require('./destination'),
 maskapai : require('./maskapai'),
 penerbangan : require('./penerbangan'),
 penginapan : require('./penginapan'),
 region : require('./region'),
 travelplan : require('./travelplan'),
 travelplandest : require('./travelplandest'),
 usertravelplan : require('./usertravelplan')
}

module.exports = (app) => {
    for (const [routeNames, routeDir] of Object.entries(routes)){
        app.use(`/${routeNames}`,routes[routeNames]);
    }
}