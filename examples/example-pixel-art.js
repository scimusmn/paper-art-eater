var artEater = require('../index.js');
var gm = require('gm').subClass({imageMagick: true}); // GraphicMagick/ImageMagick

var scanPath = './public/scans/myScan.png';

var pixelCols = 10;
var pixelRows = 10;

// Set up Art Reader
// Where final assets end up.
artEater.setOutputDirectory('./public/output/');

artEater.expectFillBox('pixelArt', {  x: 208,
                                      y: 254,
                                      w: 862,
                                      h: 862,
                                      cols: pixelCols,
                                      rows: pixelRows,
                                      padding: 10,
                                      returnColors: true, // This flag is what asks it to return colors instead of bools
                                    });

artEater.digest(scanPath, function(results) {

  console.log('\nDigestion complete ... <{ BURP! }');
  console.log(results);

  // Generate draw arguments from returned colors
  var pixelImagePath = results.digestPath + 'pixel-art-character.png';
  var drawArgs = '';
  var i = 0;
  for (var row = 0; row < pixelRows; row++) {
    for (var col = 0; col < pixelCols; col++) {
      var pixelColor = results.pixelArt[i];
      drawArgs += ' fill rgb(' + pixelColor + ') point ' + col + ',' + row;
      i++;
    };
  };

  // Generate pixel art image.
  gm(pixelCols, pixelRows, '#FFFFFF00')
    .draw(drawArgs) // Draw at single-pixel size
    .sample(200, 200) // Scale up without blurring.
    .transparent('#ffffff') // Convert all white pixels to transparent
    .write(pixelImagePath, function(err) {
      if (err) {
        throw err;
      } else {
        console.log('Pixel art image save success.');
      }
    });

});
