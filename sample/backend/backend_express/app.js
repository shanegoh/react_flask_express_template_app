const express = require('express')
const app = express()
const port = 5000
const dotenv = require('dotenv');
const bodyParser = require('body-parser')
const cors = require('cors')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors())
dotenv.config();

const db = require("./models/index.js");
db.sequelize.sync()

// Controller Routes
app.use('/api/manager', require('./routes/manager.js'));
app.use('/api/staff', require('./routes/staff.js'));
app.use('/api', require('./routes/route.js'));


app.listen(port, () => {
    console.log(`Express app listening on port ${port}`)
})