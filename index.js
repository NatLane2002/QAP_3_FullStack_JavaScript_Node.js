const express = require('express');
const methodOverride = require('method-override');
const app = express();
const PORT = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

global.DEBUG = true;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true, }));
app.use(methodOverride('_method'));

app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.get('/about', (request, response) => {
    response.render('about.ejs');
});

const postsRouter = require('./routes/posts')
app.use('/posts', postsRouter);

const commentsRouter = require('./routes/comments')
app.use('/comments', commentsRouter);

const usersRouter = require('./routes/users')
app.use('/users', usersRouter);

// // anything beginning with "/api" will go into this
// const apiRouter = require('./routes/api')
// app.use('/api', apiRouter);

app.use((req, res) => {
    res.status(404).render('404');
});

app.listen(PORT, () => {
    console.log(`Simple app running on port ${PORT}.`)
});