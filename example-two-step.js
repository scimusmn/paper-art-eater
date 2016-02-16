var artEater = require('./index.js');

var scanPath = './public/scans/options-scan-3.png';

// Set up Art Reader
// Where final assets end up.
artEater.setOutputDirectory('./public/output/');

// STEP 1 - Read option fill boxes on form.
artEater.expectFillBox('fps', { x: 180,
                                y: 1175,
                                w: 340,
                                h: 85,
                                cols: 4,
                                rows: 1,
                              });

artEater.expectFillBox('transparentBG', { x: 760,
                                          y: 1175,
                                          w: 170,
                                          h: 85,
                                          cols: 2,
                                          rows: 1,
                                        });

artEater.expectFillBox('padding', { x: 180,
                                    y: 1365,
                                    w: 340,
                                    h: 85,
                                    cols: 4,
                                    rows: 1,
                                  });

artEater.expectFillBox('looping', { x: 760,
                                    y: 1365,
                                    w: 170,
                                    h: 85,
                                    cols: 2,
                                    rows: 1,
                                  });

artEater.digest(scanPath, function(results) {

  console.log('\nStep 1 Digestion complete ... <{ BURP! }');
  console.log(results);

  var fpsMap = [2,6,12,24];
  var tbgMap = [true,false];
  var padMap = [0,5,15,30];
  var loopMap = [true,false];

  var fps = fpsMap[results.fps.indexOf(true)];
  var transparentBG = tbgMap[results.transparentBG.indexOf(true)];
  var padding = padMap[results.padding.indexOf(true)];
  var looping = loopMap[results.looping.indexOf(true)];

  // STEP TWO - Create animation using gathered options
  artEater.clear();

  artEater.expectAnimation('my12FrameAnimation', {
                                                    x: 172,
                                                    y: 315,
                                                    w: 930,
                                                    h: 693,
                                                    cols: 4,
                                                    rows: 3,
                                                    fps:fps,
                                                    transparentBackground:transparentBG,
                                                    padding: padding,
                                                    looping:looping,
                                                  });

  artEater.digest(scanPath, function(results) {

    console.log('\nStep 2 Digestion complete ... <{ BURP! }');
    console.log(results);

  });

});
