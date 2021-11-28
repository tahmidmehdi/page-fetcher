// take a URL as a command-line argument as well as a local file path and download the
// resource to the specified path
const request = require('request');
const fs = require('fs');

// command-line arguments:
const url = process.argv[2];
const path = process.argv[3];

const savePage = function(done) {
    request(url, (error, response, body) => {
        if (error) {
            console.log(error);
        } else {
            if (response.statusCode === 200) {
                done(body);
            } else {
                console.log(`Got ${response.statusCode} status code`);
            }
        }
    });
};

const fileWriter = function(data) {
    fs.writeFile(path, data, (error) => {
        if (error) {
            console.log(error);
        } else {
            console.log(`Downloaded and saved ${data.length} bytes to ${path}`);
        }
    });
};

// check path is valid
if (path) {
    savePage(fileWriter);
} else {
    console.log('Invalid file path');
}
