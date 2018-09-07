const express = require('express');
const fs = require('fs');
const hbs = require('hbs');

const PORT = process.env.PORT || 3000;

hbs.registerPartials(__dirname + '/views/partials');
hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

const app = express();
app.set('view engine', 'hbs');
app.use((req, resp, next) => {
    let now = new Date().toString();
    let log = `${now}: ${req.method} ${req.url}\n`;
    console.log(log);
    fs.appendFile(__dirname + '/logging/server.log', log, (err) => {
        console.error(err);
    })

    next();
});

//uncomment for maintainig poproses
// app.use((req, res) => res.render('maintenence.hbs'));

app.use(express.static(__dirname + '/public'));

app.get('/', (req, resp) => {
    // resp.send('<hr><h1>hello express!</h1><hr>');
    resp.render(__dirname + '/views/home.hbs', {
        pageTitle: 'Home page',
        content: 'welcome to my brand new page',
        owner: 'Denys Kukhar'
    })
});
app.get('/about', (req, resp) => {
    resp.render(__dirname + '/views/about.hbs', {
        pageTitle: 'About page',
        owner: 'Denys Kukhar'
    });
});
app.get('/bad', (req, resp) => {
    resp.send({
        errorMessage: "something went wrong or requested page does not exist!"
    });
});
app.listen(PORT, () => console.log(`server is up on port: ${PORT}`));