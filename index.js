const express = require('express');

const path = require('path');

const bodyParser = require('body-parser');
const logger = require('morgan');

const admin = require('firebase-admin');
const serviceAccount = require('./firenode-5276f-firebase-adminsdk-dpge6-57ad5538af.json');

const firebaseAdmin = admin.initializeApp({
    credential:admin.credential.cert(serviceAccount),
    databaseURL:'https://firenode-5276f.firebaseio.com'
})

const database = firebaseAdmin.database();

const port = process.env.PORT || 3000;

const app = express();

// Set View Engine
app.set('view engine','ejs');

// Static Views Folder
app.use(express.static('views'));
app.set('views',path.join(__dirname,'views'));

app.use(logger('dev'));

// Seeting Middle Ware For Body Parser
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());


// Now The Access Controlling Part
app.use((req,res,next) => {

	res.header("Access-Control-Allow-Origin","*");
	res.header("Access-Control-Allow-Headers",
		"Origin, X-Requested-With, Content-Type, Accept, Authorization");

	if(req.method ==='OPTIONS'){
		res.header('Access-Control-Allow-Methods','GET,POST,PUT,PATCH,DELETE');

		return res.status(200).json({});
	}

	next();

});

//Authentication MiddleWare

function isAuthenticated(req,res,next){
    //Check is User is Loggin
    //If they are , attach them to the Req Object

    // If they are Not, Send them a Message Login

    next()

}

app.get('/homecoming-queen',isAuthenticated,(req,res)=>{
    res.render('homeCominQueen');
})

app.get('/',(request,response)=>{
    response.render('home.ejs');
});

app.post('/',(req,res)=>{
    var breakfast =req.body.breakfast;

    res.render('result',{data:breakfast});
})

app.get('/restaurents',(req,res)=>{

     database.ref('restaurents')
        .once('value',snapshot=>{
            data = snapshot.val();

            if(!data){
                data ={}
            }
            console.log(data);
            console.log(res.statusCode);
            res.render('restaurent',{restaurents:data});
        })

})

app.listen(port,()=>{
    console.log("App is Start and Listening from a Port "+port);
})