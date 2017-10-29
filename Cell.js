function Cell(i, j, w) {
  this.i = i;
  this.j = j;
  this.x = i*w;
  this.y = j*w;
  this.w = w;
  this.shrim = false;
  this.shrimCount = 0;
  this.show = false;
};

Cell.prototype.reveal = function() {
  if(!this.show) this.show = true;
}

Cell.prototype.countShrims = function(grid) {
  if (this.shrim) {
    this.neighborCount = -1;
    return;
  }
  var count = 0;
  for (var v = -1; v <= 1; v++) {
    var i = this.i + v;
    if (i < 0 || i >= cols) continue;

    for (var h = -1; h <= 1; h++) {
      var j = this.j + h;
      if (j < 0 || j >= rows) continue;
      if(grid[i][j].shrim) count++;
    }
  }
  this.shrimCount = count;
  console.log(this.shrimCount);
}
