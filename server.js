const express = require('express');
const Datastore = require('nedb');
const app = express();


app.listen(5000, () => console.log('listening at 5000'));
app.use(express.static('public'));
app.set('view engine', 'ejs')

app.use(express.json({limit : '1mb'}));

const database = new Datastore('database.db');
database.loadDatabase();


app.post('/mydata', (request, response) =>{
    const data = request.body;
    console.log(data);
    database.insert(data);
});
   
app.get('/mydata', (request, response) => {
    database.find({}, (err, data) => {
        if(err){
            response.end();
            return;
        }
        response.json(data);
    });
});

