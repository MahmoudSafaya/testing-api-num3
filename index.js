
const express = require('express');
const app = express();

const fs = require('fs');

const cors = require('cors');
app.use(cors()); // Prevents CORS error

app.get('/', function(req, res) {

    if (req.url === '/favicon.ico') {
        res.end();
    } 
    // Ends request for favicon without counting

    const json = fs.readFileSync('views.json', 'utf-8');
    const obj = JSON.parse(json);
    // Reads views.json and converts to JS object

    obj.pageviews = obj.pageviews+1;
    if (req.query.type === 'visit-pageview') {
        obj.visits = obj.visits+1;
    }
    // Updates pageviews and visits (conditional upon URL param value)

    const newJSON = JSON.stringify(obj);
    // Converts result to JSON

    fs.writeFileSync('views.json', newJSON);
    res.send(newJSON);
    // Writes result to file and sends to user as JSON

})

app.listen(process.env.PORT || 5000, () => {
    console.log("Server running on port 5000");
})