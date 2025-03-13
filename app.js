const express = require('express')
const app = express()
const port = 3000
const bodyParser = require('body-parser');
const jobRoutes = require('./src/routes/job.routes');
const categoryRoutes = require('./src/routes/categories.routes');


app.use(express.static("public"));
app.use(bodyParser.json());
app.use('/api/v1/jobs', jobRoutes);
app.use('/api/v1/categories', categoryRoutes);


app.get('/', (req, res) => {
    res.json({
        message: 'Welcome to the API!'
    })
})

app.use((req, res) => {
    res.json({
        message: 'Page Not Found'
    })
})

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
})