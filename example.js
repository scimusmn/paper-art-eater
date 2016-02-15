var artEater = require('./index.js');

// Set up Art Reader
var jsonFormPath = './public/forms/double-12-frame.json';
var outputDirectory = './public/output/';
var watchDirectory = __dirname + '/public/scans/';

// Load JSON file defining expected regions in scan.
artEater.loadFormJSON(jsonFormPath);

// Set the output folder where final assets end up.
artEater.setOutputDirectory(outputDirectory);

// Set the directory to watch for new scans.
artEater.setWatchDirectory(watchDirectory, onDigestionComplete);

// Do post-processing after art-reader returns results.
function onDigestionComplete(results) {

  console.log('\nDigestion complete ... <{ BURP! }');
  console.log(results);

  // // Open preview from finder.
  // var sys = require('sys');
  // var exec = require('child_process').exec;

  // setTimeout(function() {
  //   console.log('open' + ' ' + results.myAnimation);
  //   exec('open' + ' ' + results.myAnimation);
  // }, 1500);

}
