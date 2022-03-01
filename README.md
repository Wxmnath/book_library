Step 1
Create repo on git hub and connect local repo to the remote Github.

Step 2
Create an empty .gitignore file and input "node_modules" inside.

Step 3
Initialise NPM project with npm init -y (note -y calls for default options in your npm init)

Step 4
Create src directory with app.js file inside - configure app.js to export a basic Express application.
Create index.js file but outside of src directory. - inside index call app.listen() and then console.log() the port that the app is listening on.

Step 5
Install express & mysql2 as dependencies.
Install dotenv and nodemon as development dependencies. (npm i -D ......)

Step 6
Add a start script to your package.json file with the following command: nodemon -r dotenv/config index.js. This uses nodemon to execute the index.js file with the environment variables loaded from a .env file.

Step 7
Add create-database.js and drop-database.js.

Step 8
Add a prestart script to package.json. set the command to node scripts/create-database.js

Step 9
Create a .env file

Step 10
Create .gitignore file by running npx gitignore node & add .env to .gitignore
