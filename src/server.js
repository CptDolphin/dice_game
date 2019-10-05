const http = require("http");
const fs = require("fs");

const paths = [
    [/html$/i, 'index.html', 'text/html'],
    [/style\.css$/i, 'style.css', 'text/css'],
    [/app\.js$/i, 'app.js', 'text/javascript'],
    [/dice-\d\.png$/i, undefined, 'image/png'],
    [/back\.jpg$/i, 'back.jpg', 'image/jpg'],
];

http.createServer(function (request, response) {
    console.log(request.url);

    paths.find(([re, filepath, type]) => {
        const matches0 = request.url.match(re);
        if (!matches0) {
            // tutaj zwracamy plik ktorego nie zmatchowal zaden regex
            return;
        }

        const matches1 = matches0.slice(1);

        fs.readFile(filepath || matches0[0], (err, file) => {
            if(err) {
                throw err;
            }

            //  console.log(response.write(html))
            response.writeHead(200, { "Content-Type": type });
            response.write(file);
            response.end();
        });
    });
}).listen(8000);
