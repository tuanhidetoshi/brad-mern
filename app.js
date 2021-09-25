const express = require('express');
const app = express();

app.use('/', (req, res) => {
    res.send({test: 'test'})
})

const _PORT = 5000;

app.listen(_PORT, () => console.log(`Server is running at port ${_PORT}`))