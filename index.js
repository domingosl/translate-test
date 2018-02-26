const express       = require('express');
const bodyParser    = require('body-parser');
const fs            = require('fs');

const app = express();



app.use(bodyParser.urlencoded({ extended: true }));



app.get('/', function (req, res) {

    let data = fs.readFileSync(__dirname + '/data/en.json', 'UTF-8');

    data = JSON.parse(data);

    let wordCount = 0;

    let responseData = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8"><title>Test page</title><link rel="stylesheet" type="text/css" href="/styles.css"></head><body>';

    responseData += '<form method="POST" action="/thankyou">';

    for (let key in data) {
        responseData += '<div class="translation-box"><p>' + key + '</p>';
        responseData += '<textarea style="margin-bottom: 20px" rows="4" cols="50" name="' + key + '" value="' + data[key] +'">' + data[key] +'</textarea></div>';

        wordCount += data[key].split(' ').length;
    }
    responseData += '<div><button type="submit">Salva</button></div>';
    responseData += '</form>';
    responseData += 'word count: ' + wordCount;


    responseData += '</body></html>';


    res.send(responseData);

});

app.post('/thankyou', function (req, res) {
    console.log(req.body);
    let newData = JSON.stringify(req.body, null, 2);

    fs.writeFileSync(__dirname + '/data/en.json', newData);

    res.sendFile(__dirname + '/_/thankyou.html');
});



app.get('/2', function (req, res) {

    let dataUs = fs.readFileSync(__dirname + '/data/en_US.json', 'UTF-8');

    dataUs = JSON.parse(dataUs);

    let wordCount = 0;

    let responseData = '<form method="POST">';

    for (let key in dataUs) {
        responseData += '<div style="margin-bottom:40px"><input type="checkbox" style="vertical-align:25px; margin-right:15px"><textarea rows="4" cols="50" value="'+ key +'">' + key + '</textarea>';
        responseData += '<textarea style="margin-left:20px" rows="4" cols="50" name="' + key + '" value="' + dataUs[key] +'">' + dataUs[key] +'</textarea></div>';

        wordCount += dataUs[key].split(' ').length;
    }
    responseData += '<div><button type="submit">Salva</button></div>';
    responseData += '</form>';
    responseData += 'word count: ' + wordCount;


    res.send(responseData);

});


app.post('/2', function (req, res) {
    console.log(req.body);
});




app.use(express.static('_'));

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});
