const http = require("http");
const fs = require("fs");

http.createServer(function (request, response) {
    switch (request.url) {
        case '/html':
            fs.readFile('./index.html', function(err, html) {
                if(err) {
                    throw err;
                }

                //  console.log(response.write(html))
                response.writeHead(200, {"Content-Type": "text/html"});
                response.write(html);
                response.end();
            });
            break;
        case '/style.css':
            fs.readFile('./style.css', function(err, file) {
                if(err) {
                    throw err;
                }
                response.writeHead(200, {"Content-Type": "text/css"});
                response.write(file);
                response.end();
            });
            break;
        case '/app.jst':
            fs.readFile('./app.js', function(err, file) {
                if(err) {
                    throw err;
                }
                response.writeHead(200, {"Content-Type": "text/plain"});
                response.write(file);
                response.end();
            });
            break;
        default:
            response.end("");
            console.log("My Server is running at http://127.0.0.1:8000/");
    }
}).listen(8000);
