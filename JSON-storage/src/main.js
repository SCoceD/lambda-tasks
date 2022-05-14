const express = require('express');
const {PORT} = require("./constants/constants");
const router = require("./router/router");
const bodyParser = require("body-parser");
const app = express();

app.use(express.json());
app.use(bodyParser.json())
app.use('/', router)

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
