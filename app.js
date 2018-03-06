const express = require('express');
const nunjucks = require('nunjucks');
const app = express();

app.use(function (req, res, next) {
    // do your logging here
    // call `next`, or else your app will be a black hole — receiving requests but never properly responding
    console.log(req.method,req.path);
    next();
})

app.set('view engine', 'html');
app.engine('html', nunjucks.render);
nunjucks.configure('views');

var locals = {
    title: 'An Example',
    people: [
        {name: 'Gandalf'},
        {name: 'Frodo'},
        {name: 'Hermione'}
    ]
};

app.get('/', (req, res) => res.render('index', locals));

app.listen(3000, () => console.log('Example app listening on port 3000!'));


// nunjucks.render('index.html', locals, function(err, output){
//     console.log(output);
// });
