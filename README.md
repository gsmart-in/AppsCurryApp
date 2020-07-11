# Request Management App
This  app is a Request Management App, to be used as a UI for a Google Form's spreadsheet. The requests can be 'Closed' or 'Cancelled'.

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
npm run prod
```

will build the 'production' version that is ready to be uploaded to Apps Script. 
