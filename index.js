const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override')
const { v4: uuidv4 } = require('uuid');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

let comments = [
    {
        username: 'Todd',
        comment: 'lol that is so funny!',
        id: uuidv4()
    },
    {
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog',
        id: uuidv4()
    },
    {
        username: 'SkBerBoi',
        comment: 'Plz delete your account, Todd',
        id: uuidv4()
    },
    {
        username: 'Onlysayswoof',
        comment: 'woof woof woof',
        id: uuidv4()
    }
]
app.get('/comments', (req, res) => {
    res.render('comments/index', { comments })
});
app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});
app.post('/comments', (req, res) => {
    const { username, comment } = req.body;
    comments.push({ username, comment, id: uuidv4() });
    res.redirect('/comments');
});
app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/show', { comment });
});
app.get('/comments/:id/edit', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id);
    res.render('comments/edit', { comment });
});
app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const foundComment = comments.find(c => c.id === id);
    const newCommentText = req.body.comment;
    foundComment.comment = newCommentText;
    res.redirect('/comments');
});
app.delete('/comments/:id', (req, res) => {
    const { id } = req.params;

    comments = comments.filter(c => c.id !== id);
    res.redirect('/comments');
});

app.get('/tacos', (req, res) => {
    res.send('Get /tacos response')
});
app.post('/tacos', (req, res) => {

    const { meat, qty } = req.body;
    res.send(`Ok, here are your ${qty} ${meat} tacos`)
});


app.listen(3000, () => {
    console.log('On Port 3000!');
});