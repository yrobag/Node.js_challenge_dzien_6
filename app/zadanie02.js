const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.static('./public/zadanie02/'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.post('/cookie/set', (req, res) => {
    const {name} = req.body
    res.cookie('name', name, {
        maxAge : 43200000,
    });
    res.send("Cookie was save");
});

app.get('/cookie/show', (req, res) => {
    const name = req.cookies.name;
    if(name){
        res.send(`Your name is ${name}!`);
    }else{
        res.send("I done't know what is your name :(");
    }
});

app.listen(3000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});
