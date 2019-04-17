# AppsCurryApp
This is a sample app showing the potential of Apps Script to create complete (server/client) web apps.
This sample app is a Request Management App, where the users can submit their purchase requests. The requests are saved to a Google Sheet 'Back End'. The requests can be 'approved' or 'declined'.

The front-end (client side) uses VueJS and Bootstrap. The back-end uses ES6 Javascript that gets compiled and bundled to Apps Script compatible code using webpack.

This project is intended only as a proof-of-concept and there is no performance optimization. The app will be slow because of the inefficiencies. 

## Usage

Install clasp command line tool (if you don't have it already)

```bash
npm install @google/clasp -g
```

Then login to your Google account:

```bash
clasp login
```
Open the terminal and clone this project.

You have to create an Apps Script project to run this code.

```bash
clasp create --type standalone --title "Apps Script Request Management App Sample"
```

Now build the project and upload to your newly created Apps Script project

```bash
npm install
npm run deploy
```
## Local development

You don't have to upload the project everytime to see the changes.
run:

```bash
npm run local
```
This will open a http://localhost:9090/ where you can view your development site.

In order to Mock the responses from your Google Apps Script API, update client/src/services/MockBackEnd.js

## Project Structure

The client/src/pages contains the partial pages. See src/pages/routes.js where the routes are configured.
You can customize the global styles in src/pages/scss. This project uses bootstrap as CSS framework.

The server/src folder contains the server side (Apps Script) code. You can use ES6 or npm modules in lib.js and any classes/files included in lib.js. 
api.js exposes the Apps Script API that the client side calls (see client/src/services/GASBackEnd.js)


## How does it work?
In the front end, it uses webpack and babel to cross compile and generate the bundle.
Then it uses html-webpack-inline-source-plugin to inline the whole Javascript and CSS in to the generated index.html file.
You can see the client side setup in the client/webpack.prod.js 

## Building the project

```bash
npm run build
```

will build the local development version. The output files are placed in deploy/local folder.

```bash
npm run prod
```

will build the 'production' version that is ready to be uploaded to Apps Script. 


## Unit Tests
The server/tests folder contains the unit tests for the server side. 
Run 
```bash
npm run test
```
to run the unit tests

### Disclaimers
The author does not represent nor associated with Google in any way. This is project is only for learning purposes.




