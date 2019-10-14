# Dice Game 

## Table of contents
* [Install Brew and Node.js](#install-brew-and-node.js)
* [Install modules](#install-modules)
* [Start the server](#start-the-server)
* [Technologies](#technologies)
* [Libraries](#libraries)
* [Install Packages Manually](#install-packages-manually)

## Install Brew and Node.js

```
ruby -e "$(curl ~fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"] 
brew install node 
```

## Install modules

```
npm install
```

## Start the server

```
npx pm2 --watch src/backend/server.js --name dice-game --attach start ./src/backend/server.js;
```
or run: 
```
npm run dev
```
## Technologies

* HTML5
* CSS3
* JavaScript
* Node.js

## Libraries

* eslint
* pm2
* grunt-cli

## Install packages manually

```
npm install -g grunt-cli; 
npm i -D eslint@latest 
npm i pm2@latest 
```

