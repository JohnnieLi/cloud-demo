const app = require('./app/app');
const config = require('./app/config/config');

//db connection
const db = require('./app/db/index')
db.connect()
.then(()=>{
    console.log("we are connected to mongo in ", config.environment);
    app.listen(config.port, function () {
        console.log('listening on port ', config.port);
    });
}, (err)=>{
    console.log(err);
})
