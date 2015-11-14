
/*    function hexPoints(x, y, radius) {
      var points = [];
      for (var theta = 0; theta < Math.PI * 2; theta += Math.PI / 3) {
        var pointX, pointY;
        pointX = x + radius * Math.sin(theta);
        pointY = y + radius * Math.cos(theta);
        points.push(pointX + ',' + pointY);
      }
      return points.join(' ');
    }
    var x, y, row, col, pointX, pointY, theta;
    var svg = document.getElementById('s');
    var radius = 300;
    for (col = 0; col < 4; col += 1) {
      for (row = 0; row < 4; row += 1) {
        var offset = (Math.sqrt(3) * radius) / 2;
        x = 40 + offset * col * 2;
        y = 40 + offset * row * Math.sqrt(3);
        if (row % 2 !== 0) x += offset;
        var polygon = document.createElementNS("http://www.w3.org/2000/svg", "polygon");
        polygon.style.fill = 'white';
        polygon.style.stroke = 'black';
        polygon.style.strokeWidth = '4px';
        polygon.setAttribute('points', hexPoints(x, y, radius));
        polygon.addEventListener('click', function (event) {
          event.target.style.boxShadow = '0 0 5px blue inset';
        }, false);
        svg.appendChild(polygon);
      }
    }*/

function buildHexGrid(opts) {
  if (!(this instanceof buildHexGrid)) { return new buildHexGrid(opts); }

  for (var key in opts) {
    if ( opts.hasOwnProperty(key) ) { this.opts[key] = opts[key]; }
  }
  
  this.instance = Math.round(Math.random() * 2000);

  return this.createSVG();
}

buildHexGrid.prototype = {
  opts: {
    cols: 6,
    rows: 6,
    spacing: 0,
    size: 300,
    offsetX: 0,
    offsetY: 0
  },

  createPolygon: function(size,sides) {

    sides = sides || 6;
    size = size || 150;
    
    size = size * 0.59;

    var i = sides,
        points = [];

    while (i--) {
      points.push(
        Math.round(size + size * Math.sin(i * (Math.PI * 2) / sides))
        +','+
        Math.round(size + size * Math.cos(i * (Math.PI * 2) / sides))
      );
    }

    return '<polygon id="hex'+this.instance+'" points="'+points.join(' ')+'"></polygon>';

  },
  
  createGrid: function(){
    var hex = '<use x="{{x}}" y="{{y}}" fill="{{fill}}" class="hex" xlink:href="#hex'+this.instance+'" />',
        odd = false,
        size = this.opts.size + this.opts.spacing,
        grid = '',
        total = this.opts.rows * this.opts.cols,
        count = 0,
        x, y, i, j, fill;

    for ( i = 0; i < this.opts.rows; i++ ){
      odd = i % 2;
      y = i * (size * 0.87) + this.opts.offsetY;
      for ( j = 0; j < this.opts.cols + (odd ? 1 : 0); j++ ){
        x = j * size + (odd ? -size / 2 : 0 ) + this.opts.offsetX;
        count++;

        fill = 'hsla('+Math.round((count / total) * 50)+', 80%, ' + Math.round((Math.random()*15) + 40) +'%, 1)';
        
        grid += hex.replace('{{x}}',x).replace('{{y}}',y).replace('{{fill}}',fill);
      }
    }
    
    return grid;
  },

  createSVG: function(){
    var div = document.createElement('div'),
        size = this.opts.size + this.opts.spacing;

    div.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 '
          + (size * this.opts.cols) + ' '
          + (size * this.opts.rows) +'">'
    
          + '<defs>'
          + this.createPolygon(this.opts.size)
          + '</defs>'
          + this.createGrid()
          + '</svg>';

    return div.children[0];
  }
};


document.body.appendChild(buildHexGrid({
  cols: 6,
  rows: 20,
  size: 100,
  spacing: 20,
  offsetX: -5, //58,
}));

////////////////////////////////////////


(function(){
  "use strict";

  var W = window,
      D = document,
      winHeight = W.innerHeight,
      rAF = W.requestAnimationFrame || W.mozRequestAnimationFrame || W.webkitRequestAnimationFrame || W.msRequestAnimationFrame || W.oRequestAnimationFrame || function(callback) { W.setTimeout(callback, 20); };
  
  function onResize(){
    winHeight = W.innerHeight;
  }

  function viewPoll(opts) {
    if (!(this instanceof viewPoll)) { return new viewPoll(opts); }
    
    var selector;
    
    if ( typeof opts === 'string' ) {
      selector = opts;
    } else {

      for (var key in opts) {
        if ( opts.hasOwnProperty(key) ) { this.opts[key] = opts[key]; }
      }
      
      selector = opts.selector;
    }
    
    this.elems = Array.prototype.slice.call(D.querySelectorAll(selector)),
    this.count = this.elems.length;

    W.addEventListener('resize', this.update.bind(this), false);
    D.addEventListener('scroll', this.update.bind(this), false);
    D.addEventListener('touchmove', this.update.bind(this), false);
    
    this.update();
  }

  viewPoll.prototype = {
    opts: { // Defaults
      selector: '',
      callback: function(el){},
      onlyAdd: false,
      class: 'in-view'
    },
    
    colliding: function(y1, h1, y2, h2) {
      return (
        (y2 >= y1 && y2 <= y1 + h1) ||
        (y2 + h2 >= y1 && y2 + h2 <= y1 + h1)
      );
    },
    
    destroy: function(){
      W.removeEventListener('resize', this.update);
      D.removeEventListener('scroll', this.update);
      D.removeEventListener('touchmove', this.update);
    },

    updateElemRects: function() {

      if ( this.count === 0 ) {
        this.destroy();
        return;
      }

      var i = this.count,
          elem, rect, y, h, inView;

      while (i--) {
        elem = this.elems[i];
        rect = elem.getBoundingClientRect();
        y =  rect.top;
        h = rect.bottom - rect.top;

        if ( this.colliding(0, winHeight, y, h) ) {
          elem.classList.add(this.opts.class);
          if ( this.opts.onlyAdd ) { this.elems.splice(i,1); }
        } else {
          elem.classList.remove(this.opts.class);
        }
      }

      this.count = this.elems.length;
    },

    update: function() {
      rAF(this.updateElemRects.bind(this));
    }
  };
  
  return W.viewPoll = viewPoll;
  
})();

setTimeout(viewPoll.bind(this,'.hex'),1000);
