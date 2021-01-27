// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes - zainstalowalam 
const express = require('express');

// Start up an instance of app

const app = express()

/* Middleware*/ // posredniczace orogramwoanie przez ktore przechodzi moj req
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Cors for cross origin allowance - zainstalowałam i dodałam
const cors = require('cors') // odpowiedzialny za bezpieczenstwo :D troche 
app.use(cors());

// Initialize the main project folder
app.use(express.static('.')); // w tym miejscu serwuje pliki stayczne app.js style z katalogu website 


// Setup Server  - 

const port = 3000;

const server = app.listen(port, listening);

function listening() {
    // console.log(server);
    console.log(`running on localhost: ${port}`);
};




// GET route


server.get('/data', () => { // w momencie kiedy zrobei zapytanie localhost:3000/data , post na ten adres , moj kod sie wywola

})


// POST route
// server side code -  otrzymuje zapytanie req przetwarza je (leci jeszcze przez te middleware) i zwraca res leci do clinet na jej... 

//endpoint 

server.post('/data', () => { // w momencie kiedy zrobei zapytanie localhost:3000/data , post na ten adres , moj kod sie wywola

})

