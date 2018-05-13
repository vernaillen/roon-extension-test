first tryout using the Roon API for Javascript (https://github.com/RoonLabs/node-roon-api)

To use:

1. git clone git@github.com:vernaillen/roon-extension-test.git
2. cd roon-extension-loop-test
3. npm install
4. node app.js
5. open Roon, go to settings -> extensions -> "Roon API Test" -> Enable

After that you can send ctrl commands to Roon: node app.js [zone] [ctrl]

e.g.:
node app.js LivingRoom play
