var parser = function() {
  var data = {};
  var counter = 0;

  var parse = function(dataset) {
    for (var idx in dataset) {
      var entry = dataset[idx];
      data[idx] = {
        start:entry.start,
        end:Infinity,
        entry:entry
      };
      if (data[idx-1]) {
        data[idx-1].end = entry.start;
      }

      counter++;
    }
  }

  var getItem = function(idx) {
    return data[idx];
  }

  var on = function(what, func) {
    if (what == "change") {
      for (key in data) {
        func({
          "key": key,
          value: data[key]
        });
      }
    }
  }

  var self = {};
  self.on = on;
  self.parse = parse;
  self.getItem = getItem;
  self.length = function() {return counter};

  return self;
}
var next_stations = [
  {
    start:0,
    name:"Majorstua"
  }, {
    start:36,
    name:"Frøen"
  }, {
    start:174.2,
    name:"Steinerud"
  }, {
    start:277,
    name:"Vinderen"
  }, {
    start:332,
    name:"Gaustad"
  }, {
    start:400,
    name:"Ris"
  }, {
    start:502,
    name:"Slemdal"
  }, {
    start:641,
    name:"Gråkammen"
  }, {
    start:751,
    name:"Gulleråsen"
  }, {
    start:845,
    name:"Vettakollen"
  }, {
    start:954,
    name:"Skådalen"
  }, {
    start:1034,
    name:"Midtstuen"
  }, {
    start:1150,
    name:"Besserud"
  }, {
    start:1236,
    name:"Holmenkollen"
  }, {
    start:1595.5,
    name:"Voksenlia"
  }, {
    start:1962,
    name:"Skogen"
  }, {
    start:2093,
    name:"Lillevann"
  }, {
    start:2210,
    name:"Voksenkollen"
  }, {
    start:2368,
    name:"Frogneseteren"
  }
];