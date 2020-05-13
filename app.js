const express = require('express');
const Datastore = require('nedb');
const app = express();
const port = process.env.PORT || 2745


app.listen(port, () => console.log('listening at port'));
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

