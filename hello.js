const http = require("http");
const fs = require("fs");

http.createServer(function (request, response) {
    fs.readFile('./index.html', function(err, html) {
        if(err) {
            throw err;
        }
        //  console.log(response.write(html))
        switch (request.url) {
            case '/html':
                response.writeHead(200, {"Content-Type": "text/html"});
                response.write(html);
                response.end(request.path);
                //			console.log(request.headers);
                break;
            case: '/css':
                response.writeHead(200, {"Content-Type": "text/css"});
                response.write()
                break;
            default:
                response.end("aa");
                console.log("My Server is running at http://127.0.0.1:8000/");
        }
    });
}).listen(8000);
