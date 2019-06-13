const express = require('express')
const sass = require('node-sass');
const cssbeautify = require('cssbeautify');

// Start our webservice
const app = express();

// Set some headers to allow access
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.setHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers");
    next();
});

app.listen(8081, () => console.log('SCSS to CSS converter started on port 8081'))

app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// Set a default page to check whether working
app.get('/', (req, res) => res.send('Hello World!'))

function SassMe(scss) {
    return sass.renderSync({
        data: scss
    });
}

app.post('/convert', function(req, res) {
    console.log('Converter called');
    var scssFile = req.body.scss;
    console.log(req.body);
    var result = SassMe(scssFile)
    console.log('node-sass has ran');
    var css = cssbeautify(result.css.toString('utf8'));
    console.log('Made the code pretty');
    console.log('Replying with file');
    res.send(css.toString('utf8'));
});