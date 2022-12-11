const express = require('express')
const PORT = 8888;
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const employeeRoutes=require('./routes/employeeRoutes');

app.use('/api/',employeeRoutes)

app.listen(PORT, (err) => {
    if (err) throw err;
    else {
        console.log(`Working on ${PORT}`)
    }
})
