const http = require('http');
const fs = require('fs');
const path = require('path');

const paths = [
	{ re: /html$/i, result: path.join(__dirname, '../frontend/index.html'), content_type: 'text/html' },
	{ re: /style\.css$/i, result: path.join(__dirname, '../frontend/style.css'), content_type: 'text/css' },
	{ re: /app\.js$/i, result: path.join(__dirname, '../frontend/app.js'), content_type: 'text/javascript' },
	{ re: /dice-\d\.png$/i, result: undefined, content_type: 'image/png' },
	{ re: /back\.jpg$/i, result: path.join(__dirname, '../../assets/back.jpg'), content_type: 'image/jpg' },
];

http.createServer(function (request, response) {
	console.log('request.url:', request.url);

	const item = paths.find(item => item.re.test(request.url));
	console.log('item', item)

	if (!item) {
        response.end('Sorry didnt find the file, try ending the url with /html -> 127.0.0.1:8000/html');
		return;
	}

	if (!item.result) {
		fs.readFile(path.join(__dirname, '../..', request.url.slice(1)), (err, content) => {
			if (err) {
				console.error(err);
				response.writeHead(400, {});
				response.end('');
				return;
			}

			response.writeHead(200, { 'Content-Type': item.content_type });
			response.write(content);
			response.end();
		});
		return;
	}

	console.log('ASSETY?:', item);
	fs.readFile(item.result, (err, content) => {
		if (err) {
			console.error(err);
			response.end('');
			return;
		}

		response.writeHead(200, { 'Content-Type': item.content_type });
		console.log('file content:', content);
		response.write(content);
		response.end();
	});
}).listen(8000);
