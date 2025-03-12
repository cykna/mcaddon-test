import { Quaternion } from "./quaternion";
export class Vec3 {
  static readonly UP = Object.freeze(new this(0, 1, 0));
  static readonly RIGHT = Object.freeze(new this(1, 0, 0));
  static readonly FORWARD = Object.freeze(new this(0, 0, -1));
  /*
  * Returns a new Vec3 representing the addition of the given ones
  */
  static add(a: Vec3, b: Vec3) {
    return new Vec3(a.x + b.x, a.y + b.y, a.z + b.z);
  }

  /*
  * Returns a new Vec3 representing the subtraction of the given ones
  */
  static sub(a: Vec3, b: Vec3) {
    return new Vec3(a.x - b.x, a.y - b.y, a.z - b.z);
  }

  /*
  * Returns a new Vec3 representing the multiplication of the given ones
  */
  static mul(a: Vec3, b: Vec3) {
    return new Vec3(a.x * b.x, a.y * b.y, a.z * b.z);
  }

  /*
  * Returns a new Vec3 representing the division of the given ones
  */
  static div(a: Vec3, b: Vec3) {
    return new Vec3(a.x / b.x, a.y / b.y, a.z / b.z);
  }

  /*
  * Returns a new Vec3 representing the scalar addition of the given ones
  */
  static add_scalar(a: Vec3, n: number) {
    return new Vec3(a.x + n, a.y + n, a.z + n);
  }

  /*
  * Returns a new Vec3 representing the scalar subtraction of the given ones
  */
  static sub_scalar(a: Vec3, n: number) {
    return new Vec3(a.x - n, a.y - n, a.z - n);
  }

  /*
  * Returns a new Vec3 representing the scalar multiplication of the given ones
  */
  static mul_scalar(a: Vec3, n: number) {
    return new Vec3(a.x * n, a.y * n, a.z * n);
  }

  /*
  * Returns a new Vec3 representing the scalar division of the given ones
  */
  static div_scalar(a: Vec3, n: number) {
    return new Vec3(a.x / n, a.y / n, a.z / n);
  }

  /*
   * Gets the normalized version of the given vector
   */
  static normalized(v: Vec3) {
    const vec = v.create_copy();
    vec.normalize();
    return vec;
  }

  /*
   * Returns the negative form of the given vector
   */
  static negative(v: Vec3) {
    return new Vec3(-v.x, -v.y, -v.z);
  }

  /**
   * Returns the cross product between the given 'a' and 'b'
   */
  static cross(a: Vec3, b: Vec3) {
    return new Vec3(
      a.y * b.z - a.z * b.y,
      a.z * b.x - a.x * b.z,
      a.x * b.y - a.y * b.x
    );
  }
  /*
   * Returns a vector with the minimum values between the given ones
   */
  static min(a: Vec3, b: Vec3) {
    return new Vec3(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z));
  }
  /*
   * Returns a vector with the maximum values between the given ones
   */
  static max(a: Vec3, b: Vec3) {
    return new Vec3(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
  }
  /*
   * Returns a reference to the vector which has the bigger magnitude
   */
  static larger(a: Vec3, b: Vec3) {
    const alen = Math.abs(a.x) + Math.abs(a.y) + Math.abs(a.z);
    const blen = Math.abs(b.x) + Math.abs(b.y) + Math.abs(a.z);
    return alen > blen ? a : b;
  }

  /*
   * Returns a vector with the reciprocal values of each element
   */
  static recip(vec: Vec3) {
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

  negate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
  }
  /*
   * Creates a copy of this vector and returns it
   */
  create_copy() {
    return new Vec3(this.x, this.y, this.z);
  }
  /**
  * Adds the given vector into this one, same as this = Vec3.add(this, rhs);
  */
  add(rhs: Vec3) {
    this.x += rhs.x;
    this.y += rhs.y;
    this.z += rhs.z;
    return this;
  }

  /**
  * Subtracts the given vector into this one, same as this = Vec3.sub(this, rhs);
  */
  sub(rhs: Vec3) {
    this.x -= rhs.x;
    this.y -= rhs.y;
    this.z -= rhs.z;
    return this;
  }
  /**
  * Multiplies the given vector into this one, same as this = Vec3.mul(this, rhs);
  */
  mul(rhs: Vec3) {
    this.x -= rhs.x;
    this.y -= rhs.y;
    this.z -= rhs.z;
    return this;
  }
  /**
  * Divides the given vector into this one, same as this = Vec3.div(this, rhs);
  */
  div(rhs: Vec3) {
    this.x -= rhs.x;
    this.y -= rhs.y;
    this.z -= rhs.z;
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
    return Math.pow(this.x * this.x + this.y * this.y + this.z * this.z, 0.5);
  }
  /*
   * Normalizes this vector
   */
  normalize() {
    const len = this.magnitude();
    if (1 - len < Number.EPSILON) return;
    this.mul_scalar(1 / len);
    return this;
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

  /*
  * Returns if the vector is normalized 
  */
  is_normalized() {
    return Math.abs(1 - this.magnitude_squared()) < Number.EPSILON;
  }

  /*
  * Returns the cross vector between this and the given vector, same as Vec3.cross(this, rhs);
  */
  cross(rhs: Vec3) {
    return Vec3.cross(this, rhs);
  }

  /*
   * Set this vector to be the cross product between it and rhs, same as this = this.cross(rhs);
   */
  set_cross(rhs: Vec3) {
    this.x = this.y * rhs.z - this.z * rhs.y;
    this.y = this.z * rhs.x - this.x * rhs.z;
    this.z = this.x * rhs.y - this.y * rhs.x;
    return this;
  }

  /*
   * Calculates the distance squared between this vector and the given one
   */
  distance_squared(rhs: Vec3) {
    return Vec3.sub(this, rhs).magnitude_squared()
  }

  /*
   * Calculates the distancebetween this vector and the given one
   */
  distance(rhs: Vec3) {
    return Vec3.sub(this, rhs).magnitude()
  }

  /*
   * Calculates the dot product between this and the given vector
   */
  dot(rhs: Vec3) {
    return this.x * rhs.x + this.y * rhs.y + this.z * rhs.z
  }
  /*
   * Moves towards the given vector based on dt
   * obs: Modifies 'rhs' object
   */
  move_towards(rhs: Vec3, dt: number) {
    const len = rhs.sub(this).magnitude_squared();
    if (len < dt * dt || len <= 1e-2) {
      this.x = rhs.x;
      this.y = rhs.y;
      this.z = rhs.z;
      return this;
    } else {
      return this.add(rhs.div_scalar(len * dt))
    }
  }
  /**
  * Modifies this vector to be the reflection of it and the given one
  * obs:Modifies 'normal' object
  */
  reflect(normal: Vec3) {
    return this.sub(normal.mul_scalar(2 * this.dot(normal)));
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
}
