const express = require('express');
const db = require('./database');
const routes = require('./routes')

const app = express();

require('dotenv').config();

db.connect();
app.use(express.json({ extended: false }))

// app.use('/', (req, res) => {
//     res.send({test: 'test'});
// })

app.use('/api', routes)

const _PORT = process.env.PORT || 5000;

app.listen(_PORT, () => console.log(`Server is running at port ${_PORT}`));