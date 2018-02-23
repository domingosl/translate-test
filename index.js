const express       = require('express');
const bodyParser    = require('body-parser');
const fs            = require('fs');

const app = express();


let data = fs.readFileSync(__dirname + '/data/en.json', 'UTF-8');

data = JSON.parse(data);


app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', function (req, res) {

    let responseData = '<form method="POST" action="/thankyou">';

    for (let key in data) {
        responseData += '<p>' + key + '</p>';
        responseData += '<input name="' + key + '" value="' + data[key] +'"/>';
    }

    responseData += '<button type="submit">Salva</button>';
    responseData += '</form>';

    res.send(responseData);

});

app.post('/thankyou', function (req, res) {
    console.log(req.body);
    res.sendFile(__dirname + '/_/thankyou.html');
});

app.use(express.static('_'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
