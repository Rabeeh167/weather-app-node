const path = require('path');
const express = require('express');
const hbs = require('hbs');
const Weather = require('./weatherController');



const app = express();
const port = process.env.PORT || 3000;

// Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//setup handlebars engine
app.set('view engine', 'hbs')
app.set('views', viewsPath)

hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('',(req, res) =>{
    res.render('index',{
        name:'Rabeeh',
        title:'Weather app'
    })
    })

app.get('/about',(req, res) =>{
res.render('about',{
    name:'Rabeeh',
    title:'Weather app'
})
})

app.get('/help',(req, res) =>{
    res.render('help',{
        name:'Rabeeh',
        title:'Weather app'
    })
    })
app.get('/weather',(req, res) =>{
    if(!req.query.location){
        return res.send({
            name:'Error : No location provided',
            title:'Weather app'
        }); 
    }

Weather.getWeatherstackInfo(req.query.location, (error, data) => {
        if (error) {
            // console.log(error)
            // return error;
            return res.send({
                location:req.query.location,
                result: error,
                title:'Weather app'
            });
        }
        else {
            console.log(data)
            return res.send({
                location:req.query.location,
                result: data,
                title:'Weather app'
            });
        }
    })
  
    })    
app.get('/help/*',(req, res) =>{
    res.render('404',{
        name:'Rabeeh',
        title:'Weather app',
        errorMessage:'ERROR - Help page not found'
    })
})   

app.get('*',(req, res) =>{
    res.render('404',{
        name:'Rabeeh',
        title:'Weather app',
        errorMessage:'ERROR - Page not found'
    })
})



app.listen(port, ()=>{
    console.log("server started to listen on port 3000")
})