#Paper Art Eater
Quickly integrate hand-drawn art into exhibits.

![Art Eater](http://www.animalstown.com/animals/a/anteater/anteater-image-04.jpg "Art Eater")


#Status
In-progress prototype. This is all speculation. Will eventually be separated into a node package and example usage project. Don't even pay attention to the below info because it will change.


Your computer must have ImageMagick installed for this code to work.

```brew install imagemagick```

#Hardware Notes
This is intended to be used with a portable scanner (http://goo.gl/dWVEOp). However you can use any hardware that imports images (USB Cameras, Wand-scanners). The only assumption is that your image backgrounds are flat white. 

## Forms
Provide Art Reader a json file that represents the regions you'd like returned. You must know beforehand what size/resolution your scans will be. Once that is decided check the alignment of your regions by checking the exported debug images (e.g. ```MyScan-1-debug.png```).

Types of regions:
* "art" - returns trimmed art from the region specified
* "stitch" - returns single image created from the array of regions specified
* "fill" - returns boolean or array of booleans if region(s) is filled in.


## Example usage

index.js
```javascript
  var artEater = require('art-eater');

  artEater.loadForm('./public/forms/regions.json');
  artEater.setOutput('./public/output/');
  artEater.watchDirectory('./public/scanner/', onScanDigested);

  function onScanDigested(results) {

    console.log(results.myArt); // './public/output/123456789/myArt.png'
    console.log(results.myFillGrid); // [false, false, true, false, true, true, false, false, true]
    console.log(results.myStitchedImage); // './public/output/123456789/myStitchedImage.png'

  }
```

form.json
```json
{
  "myArt": {
    "type": "art",
    "x": 100,
    "y": 100,
    "w": 700,
    "h": 300
  },
  "myFillGrid": {
    "type": "fill",
    "x": 100,
    "y": 400,
    "w": 200,
    "h": 200,
    "cols": 3,
    "rows": 3
  },
  "myStitchedImage": {
    "type": "stitch",
    "rectArray": [
      {
        "x": 100,
        "y": 700,
        "w": 100,
        "h": 100
      },
      {
        "x": 400,
        "y": 700,
        "w": 100,
        "h": 100
      }
    ]
  }
}
```
