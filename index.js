const express       = require('express');
const bodyParser    = require('body-parser');
const fs            = require('fs');

const app = express();


let data = fs.readFileSync(__dirname + '/data/en.json', 'UTF-8');

data = JSON.parse(data);


app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', function (req, res) {

    let wordCount = 0;

    let responseData = '<form method="POST" action="/thankyou">';

    for (let key in data) {
        responseData += '<div><p>' + key + '</p>';
        responseData += '<textarea style="margin-bottom: 20px" rows="4" cols="50" name="' + key + '" value="' + data[key] +'">' + data[key] +'</textarea></div>';

        wordCount += data[key].split(' ').length;
    }
    responseData += '<div><button type="submit">Salva</button></div>';
    responseData += '</form>';
    responseData += 'word count: ' + wordCount;


    res.send(responseData);

});

app.post('/thankyou', function (req, res) {
    console.log(req.body);
    let newData = JSON.stringify(req.body, null, 2);

    fs.writeFile(__dirname + '/data/en.json', newData);

    res.sendFile(__dirname + '/_/thankyou.html');
});

app.use(express.static('_'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
