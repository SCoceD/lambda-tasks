const express = require('express');
const {PORT} = require("../constants/constants");
const router = require("../routes/routes");
const app = express();
app.use(express.json());
app.use('/', router)

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`)
})
