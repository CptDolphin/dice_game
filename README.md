# To run the programm on a web server download and run node.js

# On mac

## Install Homebrew
ruby -e "$(curl ~fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"] 

## Install Node.js
brew install node 

## And all the modules
npm install

## Install Grunt and other packages manually
- npm install -g grunt-cli; 
- npm i -D eslint@latest 
- npm i pm2@latest 

## Start the server
- npx pm2 --watch src/backend/server.js --name dice-game --attach start ./src/backend/server.js;
- or run: npm run dev
