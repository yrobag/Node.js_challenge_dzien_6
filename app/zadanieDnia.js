const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(express.static('./public/zadanieDnia/'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());

app.post('/save', (req, res) => {
    const {comment, author} = req.body;
    let comments = req.cookies.comments;

    comments = comments ? JSON.parse(comments) : [];

    const newComment = {comment, author};

    comments.push(newComment);

    res.cookie('comments', JSON.stringify(comments), {
        maxAge : 43200000,
    });
    res.send("<a href='/'>Back To Comments</a>");
});

app.get('/', (req, res) => {
    let comments = req.cookies.comments;
    if(!comments){
        res.send('There is no comments yet :(');
        return;
    }
    comments = JSON.parse(comments);
    let result = '';
    comments.forEach(comment => {
        if(comment['author'] && comment['comment']) {
            result += `${comment['author']}: ${comment['comment']}<br>`;
        }
    });
    res.send(result);
});

app.listen(3000, () => {
    console.log('Serwer uruchomiony na porcie 3000');
});
