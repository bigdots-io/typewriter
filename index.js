"use strict";

var Textbox = require('./lib/textbox');
var ImageExploder = require('./lib/image-exploder');

class DotGenerator {
  constructor() {
    // Nothing...
  }

  text(options) {
    var result = new Textbox({
      font: options.font,
      hex: options.color,
      alignment: options.alignment,
      width: options.width,
      height: options.height,
      startingColumn: options.startingColumn,
      startingRow: options.startingRow,
      spaceBetweenLetters: options.spaceBetweenLetters,
      spaceBetweenLines: options.spaceBetweenLines
    }).write(options.text);

    var out = this.color('#000000', {
      width: result.width,
      height: result.height
    });

    result.dots.forEach(function(dot) {
      var index = out.dots.findIndex(function(item) {
        return item.y === dot.y && item.x === dot.x;
      });

      if(index) {
        out.dots[index].hex = dot.hex
      } else {
        out.dots.push(dot);
      }
    });

    return out;
  }

  image(url, callbacks) {
    new ImageExploder(url).process(callbacks);
  }

  color(color, dimensions) {
    var height = dimensions.width,
        width = dimensions.width,
        out = [];

    for(var y = 0; y < height; y++) {
      for(var x = 0; x < width; x++) {
        out.push({y: y, x: x, hex: color});
      }
    }

    return {
      width: dimensions.width,
      height: dimensions.height,
      dots: out
    };
  }
}

module.exports = DotGenerator;
