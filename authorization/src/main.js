const express = require('express');
const {PORT} = require("./constants/constants");
const router = require("./routes/router");
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(bodyParser.json())
app.use('/', router)


app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
})
