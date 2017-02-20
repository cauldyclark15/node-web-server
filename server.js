const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

const app = express();

app.set('view engine', hbs);
app.use((req, res, next) => {
    res.render('maintenance.hbs');
});
app.use(express.static(__dirname + '/public'));
app.use((req, res, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}`
    console.log(log);
    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append server.log.')
        }
    })
    next();
});

app.get('/', (req, res) => {
    // res.send('<h1>hello express</h1>');
    res.send({
        name: 'Jc',
        likes: [
            'corn',
            'rice'
        ]
    })
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
        currentYear: new Date().getFullYear()
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: 'Bad Request'
    })
})

app.listen(1515, () => {
    console.log('server is up on port 3000');
});