import express from "express";

const app = express();
const session = require('express-session');  

// views
app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/src/views');


app.use(session({
    secret : '1234567890abcdefghijklmnopqrstuvwxyz',
	resave : false,
	saveUninitialized : true,
	cookie : { secure : false }
}));
app.use(express.json());
app.use(express.urlencoded({extended: true}));
// views
app.use('/', express.static('./src/views'));
app.use('/shop', express.static('./src/views'));
// routes
app.use('/', require('./routes/routes'));

app.listen(process.env.DEV_PORT);

