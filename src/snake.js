const Snake=function(head,body) {
  this.head=head;
  this.body=body;
}

Snake.prototype={
  getBody:function() {
    return this.body;
  },
  getHead:function() {
    return this.head;
  },
  move:function() {
    this.body.push(this.head);
    this.head=this.head.next();
    return this.body.shift();
  },
  grow:function() {
    this.body.unshift(new Position(Infinity,Infinity,this.direction));
  },
  turnLeft:function() {
    this.head=this.head.turnLeft();
  },
  turnRight:function() {
    this.head=this.head.turnRight();
  },
  isSnakeHittingWall:function(cols,rows) {
   return this.head.x > cols-1 || this.head.x < 0
   || this.head.y > rows-1 || this.head.y < 0;
 },
  isSnakeOverriding:function() {
    let head=this.head;
    return this.body.some(function (part) {
      return part.x==head.x && part.y == head.y;
    });
  }
}
