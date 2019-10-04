## To run the programm on a web server download and run node.js

## On mac

brew install node
npm install -g grunt-cli
npm init -y
npx pm2 --watch ./server.js --name abc --attach  start ./server.js
