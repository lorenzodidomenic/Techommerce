import express from "express";

const app = express();
app.set('view engine', 'ejs');
app.set('views', process.cwd() + '/src/views');

app.use('/', express.static('./src/views'));
app.use('/shop', express.static('./src/views'));

//Routes
app.use('/', require('./routes/routes'));

const PORT = 8000;
app.listen(PORT);
