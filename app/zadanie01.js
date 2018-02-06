const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use(express.static('./public/zadanie01/'));
app.use(bodyParser.urlencoded({extended: false}));

app.post('/dzielnik', (req, res) => {
   const {dzielnik, dzielna} = req.body;
   let result = (dzielna % dzielnik === 0) ? 'Tak!' : 'Nie!';
   res.send(result);
});

app.listen(3000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});
