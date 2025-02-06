const express = require('express');
const app = express();
const dotEnv = require('dotenv');
require('dotenv').config();
const responseTime = require('response-time');
const path = require('path');
const cors = require('cors');

const apiRoutes = require('./routes/api');
const builtInAdminRoutes = require('./routes/built-in-admin');
const { monitorLog } = require('./utils/helper');
var bodyParser = require('body-parser');

/*** Setting views folder for root path error page start */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
global.__basedir = (__dirname + '/public');

//*** Enable cors */
app.use(cors());
app.options('*', cors());

//*** Parse json request body */
app.use(express.json());

//** Parse urlencoded request body */
app.use(express.urlencoded({ extended: true }));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// //*** If api resource not found: send error html */
// app.use((req,res)=>{
//     if (404) {
//         return res.render('error', {});
//     }
// });

//*** Tracking API */
app.use(responseTime(async (req, res, time) => {
    console.log("<====== Api Req ======>", req?.method);

    if (req?.method !== 'OPTIONS') {
        console.log(`⏳ ${req.method} ${req.originalUrl} - ${time.toFixed(2)} ms`);
        const logData = {
            resource: req.originalUrl,
            response_time: `${time.toFixed(2)} ms`,
            meta_data: { req_body: req?.body, reqHeaders: req?.headers, method: req?.method }
        }
        await monitorLog(logData);
    } else {
        console.log("It's a pre flight req.🧑‍✈️ Ready to take off.");
    }
}));

//*** Defining api routes */
app.use('/api/v1', apiRoutes);

//*** Defining built in admin(as console) routes */
app.use('/console', builtInAdminRoutes);

//*** 🚀 Starting Node server */
app.listen(process.env.PORT, () => {
    console.log("🚀 Node js project running in ===>", process.env.PORT);
})