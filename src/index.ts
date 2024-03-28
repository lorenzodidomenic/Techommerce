import express from "express";

const app = express();
app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/src/views');

app.use('/', express.static('./src/views'));
app.use('/shop', express.static('./src/views'));

//Routes
app.use('/', require('./routes/routes'));

app.listen(process.env.DEV_PORT);
