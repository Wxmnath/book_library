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

Step 11
Install mocha, chai and supertest as a dev dependencies

Step 12
copy over test-setup from music library

Step 13
chanhe test scrip in package json file to "test": "mocha tests/\*_/_.js --exit --recursive --timeout 60000 --file ./tests/test-setup.js"
Add a pretest script to your package.json. Set the command to: node scripts/create-database.js test. Note that this time we pass the test option at the end of the command. This tells the script to load the variables from .env.test instead of .env.
Add a posttest script, set the command to: node scripts/drop-database.js. This will delete your test database after your tests have finished running.
