export class Vec2 {
  constructor(public x: number, public y: number) { }
  xx() {
    return new Vec2(this.x, this.x);
  }
  xy() {
    return new Vec2(this.x, this.y);
  }
  yx() {
    return new Vec2(this.y, this.x);
  }
  yy() {
    return new Vec2(this.y, this.y);
  }
  mul_scalar(n: number) {
    this.x *= n;
    this.y *= n;
    return this;
  }
  magnitude() {
    return (this.x * this.x + this.y * this.y) ** 0.5;
  }
  magnitude_squared() {
    return (this.x * this.x + this.y * this.y);
  }
}
