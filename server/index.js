const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const authorize = require('./app/middlewares/authorize')
require('dotenv').config();
const app = express();
app.use(express.json());
app.use(cors());
mongoose.connect(process.env.DB).then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`Server is running on port ${process.env.PORT}`);
    })
}).catch(e => console.log(e))
app.get('/', authorize);
app.use('/user', require('./app/routes/user/user'))
app.use('/category', require('./app/routes/main/categoryRoute'))
app.use('/car', require('./app/routes/main/carRoute'))