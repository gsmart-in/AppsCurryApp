var path = require('path');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry:{
      lib:'./server/src/lib.js'
  },
  output: 
  {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '../deploy/gas'),
    libraryTarget: 'var',
    library: 'AppLib'
  },
  module:
  {
	  rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: [
                [
                  '@babel/preset-env',
                  {
                    useBuiltIns: 'usage'
                  }
                ]
              ]
            }
          }
        }
      ] 
  },
  plugins: [
    new CopyPlugin([
        'server/src/onFormSubmit.js',
        'server/src/requestFolder.js',
        'server/src/generateTrelloCard.js',
        'server/src/trelloUpdates.js',
        'server/src/brief.js',
        'server/src/emails.js',
        'server/src/detectUnprocessedRequest.js',
        'server/src/utils.js',
        'server/src/api.js',
        'appsscript.json',
        '.clasp.json'
      ])
  ]
};