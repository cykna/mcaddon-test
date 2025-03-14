import { Quaternion } from "./quaternion";
import { Vec2 } from "./vec2";

interface Vect3 {
  x: number;
  y: number;
  z: number;
}

/**
 * A representation of a Vector3 instance.
 * Methods such as Vec3.xy Vec3.xz won't be documented since they return a Vec2 with the given coordinates
 */
export class Vec3 implements Vect3 {
  static readonly UP = Object.freeze(new this(0, 1, 0));
  static readonly RIGHT = Object.freeze(new this(1, 0, 0));
  static readonly FORWARD = Object.freeze(new this(0, 0, -1));

  static create(obj: Vect3) {
    return new Vec3(obj.x, obj.y, obj.z);
  }


  /*
  * Returns a new Vec3 representing the addition of the given ones
  */
  static add(a: Vect3, b: Vect3) {
    return new Vec3(a.x + b.x, a.y + b.y, a.z + b.z);
  }

  /*
  * Returns a new Vec3 representing the subtraction of the given ones
  */
  static sub(a: Vect3, b: Vect3) {
    return new Vec3(a.x - b.x, a.y - b.y, a.z - b.z);
  }

  /*
  * Returns a new Vec3 representing the multiplication of the given ones
  */
  static mul(a: Vect3, b: Vect3) {
    return new Vec3(a.x * b.x, a.y * b.y, a.z * b.z);
  }

  /*
  * Returns a new Vec3 representing the division of the given ones
  */
  static div(a: Vect3, b: Vect3) {
    return new Vec3(a.x / b.x, a.y / b.y, a.z / b.z);
  }

  /*
  * Returns a new Vec3 representing the scalar addition of the given ones
  */
  static add_scalar(a: Vect3, n: number) {
    return new Vec3(a.x + n, a.y + n, a.z + n);
  }

  /*
  * Returns a new Vec3 representing the scalar subtraction of the given ones
  */
  static sub_scalar(a: Vect3, n: number) {
    return new Vec3(a.x - n, a.y - n, a.z - n);
  }

  /*
  * Returns a new Vec3 representing the scalar multiplication of the given ones
  */
  static mul_scalar(a: Vect3, n: number) {
    return new Vec3(a.x * n, a.y * n, a.z * n);
  }

  /*
  * Returns a new Vec3 representing the scalar division of the given ones
  */
  static div_scalar(a: Vect3, n: number) {
    return new Vec3(a.x / n, a.y / n, a.z / n);
  }

  /*
   * Returns the negative form of the given vector
   */
  static negative(v: Vect3) {
    return new Vec3(-v.x, -v.y, -v.z);
  }

  /**
   * Returns the cross product between the given 'a' and 'b'
   */
  static cross(a: Vect3, b: Vect3) {
    return new Vec3(
      a.y * b.z - a.z * b.y,
      a.z * b.x - a.x * b.z,
      a.x * b.y - a.y * b.x
    );
  }
  /*
   * Returns a vector with the minimum values between the given ones
   */
  static min(a: Vect3, b: Vect3) {
    return new Vec3(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z));
  }
  /*
   * Returns a vector with the maximum values between the given ones
   */
  static max(a: Vect3, b: Vect3) {
    return new Vec3(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
  }
  /*
   * Returns a reference to the vector which has the bigger magnitude
   */
  static larger(a: Vect3, b: Vect3) {
    const alen = Math.abs(a.x) + Math.abs(a.y) + Math.abs(a.z);
    const blen = Math.abs(b.x) + Math.abs(b.y) + Math.abs(a.z);
    return alen > blen ? a : b;
  }

  /*
   * Returns a vector with the reciprocal values of each element
   */
  static recip(vec: Vect3) {
    return new Vec3(1 / vec.x, 1 / vec.y, 1 / vec.z);
  }

  /*
   * Retirms the vector projection of 'a' onto 'b'
   */
  static project_onto(a: Vec3, b: Vec3) {
    const len = 1 / b.magnitude_squared();
    return Vec3.mul_scalar(b, a.dot(b) * len);
  }
  constructor(public x = 0, public y = 0, public z = 0) { }
  xx() {
    return new Vec2(this.x, this.x);
  }
  xy() {
    return new Vec2(this.x, this.y);
  }
  xz() {
    return new Vec2(this.x, this.z);
  }
  yx() {
    return new Vec2(this.y, this.x);
  }
  yy() {
    return new Vec2(this.y, this.y);
  }
  yz() {
    return new Vec2(this.y, this.z);
  }
  zx() {
    return new Vec2(this.z, this.x);
  }
  zy() {
    return new Vec2(this.z, this.y);
  }
  zz() {
    return new Vec2(this.z, this.z);
  }

  negate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
  }
  /**
   * Creates a copy of this vector and returns it
   */
  create_copy() {
    return new Vec3(this.x, this.y, this.z);
  }
  /**
  * Adds the given vector into this one, same as this = Vec3.add(this, rhs);
  */
  add(rhs: Vect3) {
    this.x += rhs.x;
    this.y += rhs.y;
    this.z += rhs.z;
    return this;
  }

  /**
  * Subtracts the given vector into this one, same as this = Vec3.sub(this, rhs);
  */
  sub(rhs: Vect3) {
    this.x -= rhs.x;
    this.y -= rhs.y;
    this.z -= rhs.z;
    return this;
  }
  /**
  * Multiplies the given vector into this one, same as this = Vec3.mul(this, rhs);
  */
  mul(rhs: Vect3) {
    this.x *= rhs.x;
    this.y *= rhs.y;
    this.z *= rhs.z;
    return this;
  }
  /**
  * Divides the given vector into this one, same as this = Vec3.div(this, rhs);
  */
  div(rhs: Vect3) {
    this.x /= rhs.x;
    this.y /= rhs.y;
    this.z /= rhs.z;
    return this;
  }
  /**
  * Adds scalar the given number into the vector 
  */
  add_scalar(rhs: number) {
    this.x += rhs;
    this.y += rhs;
    this.z += rhs;
    return this;
  }

  /**
  * Subtracts scalar the given number into the vector
  */
  sub_scalar(rhs: number) {
    this.x -= rhs;
    this.y -= rhs;
    this.z -= rhs;
    return this;
  }
  /**
  * Multiplies scalar the given number into the vector
  */
  mul_scalar(rhs: number) {
    this.x *= rhs;
    this.y *= rhs;
    this.z *= rhs;
    return this;
  }
  /**
  * Divides scalar the given number into the vector
  */
  div_scalar(rhs: number) {
    rhs = 1 / rhs;
    this.x *= rhs;
    this.y *= rhs;
    this.z *= rhs;
    return this;
  }
  /*
   * Takes the magnitude squared of this vector
   */
  magnitude_squared() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  /*
   * Takes the magnitude squared of this vector
   */
  magnitude() {
    return (this.x * this.x + this.y * this.y + this.z * this.z) ** 0.5;
  }
  /**
   * Normalizes this vector
   */
  normalize() {
    const len = this.magnitude();
    if (Math.abs(1 - len) < 2e-4) return this;
    this.mul_scalar(1 / len);
    return this;
  }
  /**
   * Returns a new vector which contains the normalized coordinates of this one
   */
  normalized() {
    const recip = 1 / this.magnitude();
    return new Vec3(this.x * recip, this.y * recip, this.z * recip);
  }
  /**
   * Sets the magnitude of the vector to be n(or close to it). Same as '(this / this.magnitude()) * n'
   */
  set_magnitude(n: number) {
    const len = this.magnitude();
    if (Math.abs(len - n) < Number.EPSILON) return;
    this.mul_scalar(n / len);
    return this;
  }

  /**
  * Returns if the vector is normalized 
  */
  is_normalized() {
    return Math.abs(1 - this.magnitude_squared()) < 2e-4;
  }

  /**
  * Returns the cross vector between this and the given vector, same as Vec3.cross(this, rhs);
  */
  cross(rhs: Vect3) {
    return Vec3.cross(this, rhs);
  }

  /**
   * Set this vector to be the cross product between it and rhs, same as this = this.cross(rhs);
   */
  set_cross(rhs: Vect3) {
    this.x = this.y * rhs.z - this.z * rhs.y;
    this.y = this.z * rhs.x - this.x * rhs.z;
    this.z = this.x * rhs.y - this.y * rhs.x;
    return this;
  }

  /**
   * Calculates the distance squared between this vector and the given one
   */
  distance_squared(rhs: Vect3) {
    const x = (this.x - rhs.x) ** 2;
    const y = (this.y - rhs.y) ** 2;
    const z = (this.z - rhs.z) ** 2;
    return x + y + z;
  }

  /**
   * Calculates the distancebetween this vector and the given one
   */
  distance(rhs: Vect3) {
    const x = (this.x - rhs.x) ** 2;
    const y = (this.y - rhs.y) ** 2;
    const z = (this.z - rhs.z) ** 2;
    return (x + y + z) ** 0.5;
  }

  /**
   * Calculates the dot product between this and the given vector
   */
  dot(rhs: Vect3) {
    return this.x * rhs.x + this.y * rhs.y + this.z * rhs.z;
  }
  /**
   * Moves towards the given vector based on dt
   */
  move_towards(rhs: Vect3, dt: number) {
    const len = this.distance_squared(rhs);
    if (len < dt * dt || len <= 1e-2) {
      this.x = rhs.x;
      this.y = rhs.y;
      this.z = rhs.z;
      return this;
    } else return this.add(Vec3.div_scalar(rhs, len * dt));
  }
  /**
  * Modifies this vector to be the reflection of it and the given one
  */
  reflect(normal: Vect3) {
    return this.sub(Vec3.mul_scalar(normal, 2 * this.dot(normal)));
  }
  /**
  * Returns the angle between this and the given vector in range of [0, +pi]
  */
  angle_between(target: Vec3) {
    return Math.acos(this.dot(target) / Math.sqrt(this.magnitude_squared() * target.magnitude_squared()));
  }
  /**
  * Rotate this vector by the given quaternion
  * Obs:supposes that q is normalized
  */
  rotate_by(q: Quaternion) {
    const imag = q.imag();
    const t = imag.cross(this).mul_scalar(2);
    const tx = imag.cross(t);
    this.add(t.mul_scalar(q.w).add(tx));
    return this;
  }
  toString() {
    return `Vec3 { x:${this.x}, y:${this.y}, z:${this.z}}`;
  }
}
