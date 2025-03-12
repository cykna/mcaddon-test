import { sincos } from "./helpers";
import { Vec3 } from "./vec3";


export class Quaternion {
  //Returns a new quaternion representing the conjugate of the given one
  static conjugate(target: Quaternion) {
    return new Quaternion(target.w, -target.x, -target.y, -target.z);
  }
  //Creates a new quaternion for a normalized rotation axis and angle. Throws if axis is not normalized
  static axis_angle(axis: Vec3, angle: number) {
    if (!axis.is_normalized()) throw new Error("Axis is not normalized");
    const [sinn, cos] = sincos(angle * 0.5);
    const sin = Vec3.mul_scalar(axis, sinn);
    return new Quaternion(cos, sin.x, sin.y, sin.z);
  }

  //Creates a new quaternion with rotated by 'x' around the x axis
  static from_x_rotation(x: number) {
    const [sin, cos] = sincos(x * 0.5);
    return new Quaternion(cos, sin, 0, 0);
  }

  //Creates a new quaternion with rotated by 'x' around the x axis
  static from_y_rotation(x: number) {
    const [sin, cos] = sincos(x * 0.5);
    return new Quaternion(cos, 0, sin, 0);
  }

  //Creates a new quaternion with rotated by 'x' around the x axis
  static from_z_rotation(x: number) {
    const [sin, cos] = sincos(x * 0.5);
    return new Quaternion(cos, 0, 0, sin);
  }
  static from_xyzw(x: number, y: number, z: number, w: number) {
    return new Quaternion(w, x, y, z);
  }
  /*
   * Returns a quaternion based on the rotation axes
   */
  static from_axes(x: Vec3, y: Vec3, z: Vec3) {
    //Code from: https://github.com/bitshifter/glam-rs/blob/main/src/f32/sse2/quat.rs#L198
    //x = m0, y= m1, z = m2

    if (z.z <= 0.0) {
      // x^2 + y^2 >= z^2 + w^2
      let dif10 = y.y - x.x;
      let omm22 = 1.0 - z.z;
      if (dif10 <= 0.0) {
        // x^2 >= y^2
        let four_xsq = omm22 - dif10;
        let inv4x = 0.5 / Math.sqrt(four_xsq);
        return Quaternion.from_xyzw(
          four_xsq * inv4x,
          (x.y + y.x) * inv4x,
          (x.z + z.x) * inv4x,
          (y.z - z.y) * inv4x,
        );
      } else {
        // y^2 >= x^2
        let four_ysq = omm22 + dif10;
        let inv4y = 0.5 / Math.sqrt(four_ysq);
        return Quaternion.from_xyzw(
          (x.y + y.x) * inv4y,
          four_ysq * inv4y,
          (y.z + z.y) * inv4y,
          (z.x - x.z) * inv4y,
        )
      }
    } else {
      // z^2 + w^2 >= x^2 + y^2
      let sum10 = y.y + x.x;
      let opm22 = 1.0 + z.z;
      if (sum10 <= 0.0) {
        // z^2 >= w^2
        let four_zsq = opm22 - sum10;
        let inv4z = 0.5 / Math.sqrt(four_zsq);
        return Quaternion.from_xyzw(
          (x.z + z.x) * inv4z,
          (y.z + z.y) * inv4z,
          four_zsq * inv4z,
          (x.y - y.x) * inv4z,
        )
      } else {
        // w^2 >= z^2
        let four_wsq = opm22 + sum10;
        let inv4w = 0.5 / Math.sqrt(four_wsq);
        return Quaternion.from_xyzw(
          (y.z - z.y) * inv4w,
          (z.x - x.z) * inv4w,
          (x.y - y.x) * inv4w,
          four_wsq * inv4w,
        )
      }
    }
  }
  constructor(public w = 1, public x = 0, public y = 0, public z = 0) { }

  //Returns the imaginary part of this quaternion
  imag() {
    return new Vec3(this.x, this.y, this.z);
  }

  //Returns the linear interpolation between this and the given quaternion
  lerp() {

  }

  //The scalar part of this quaternion, the 'w' component
  scalar() {
    return this.w;
  }

  //Sets this quaternion to be its conjugate
  conjugate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
  }

  //Returns the magnitude squared of this quaternion
  magnitude_squared() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }

  //Returns the magnitude of this quaternion
  magnitude() {
    return (this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w) ** 0.5
  }
  //minecraft is lh, so the this implements the look_to_lh function. 
  /*
   * Rotates the quaternion and make it look to the given direction
   * Throws if not normalized
   * obs: Modifies the dir object
  */
  look_to(dir: Vec3) {
    //Based on https://github.com/bitshifter/glam-rs/blob/main/src/f32/sse2/quat.rs#L198
    if (!dir.is_normalized()) throw new Error("Direction is not normalized");
    dir.negate();
    const right = dir.cross(Vec3.UP);
    right.normalize();
    const up = right.cross(dir);
    const out = Quaternion.from_axes(
      new Vec3(right.x, up.x, -dir.x),
      new Vec3(right.y, up.y, -dir.y),
      new Vec3(right.z, up.z, -dir.z),
    );
    this.w = out.w;
    this.x = out.x;
    this.y = out.y;
    this.z = out.z;
  }
}
