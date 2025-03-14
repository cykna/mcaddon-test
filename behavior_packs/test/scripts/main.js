// src/main.ts
import { world as world3 } from "@minecraft/server";

// src/events/initialize.ts
import { system as system2 } from "@minecraft/server";

// src/components/index.ts
var custom_item_components = [];
var custom_block_components = [];

class BaseItemComponent {
  static component_name = "invalidname";
  static setup() {
    custom_item_components.push(this);
  }
  constructor(curr_tick, server_info) {
  }
}

// src/components/items/custom_diamond.ts
import { system } from "@minecraft/server";

// src/math/vec2.ts
class Vec2 {
  x;
  y;
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
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
  mul_scalar(n) {
    this.x *= n;
    this.y *= n;
    return this;
  }
  magnitude() {
    return (this.x * this.x + this.y * this.y) ** 0.5;
  }
  magnitude_squared() {
    return this.x * this.x + this.y * this.y;
  }
}

// src/math/vec3.ts
class Vec3 {
  x;
  y;
  z;
  static UP = Object.freeze(new this(0, 1, 0));
  static RIGHT = Object.freeze(new this(1, 0, 0));
  static FORWARD = Object.freeze(new this(0, 0, -1));
  static create(obj) {
    return new Vec3(obj.x, obj.y, obj.z);
  }
  static add(a, b) {
    return new Vec3(a.x + b.x, a.y + b.y, a.z + b.z);
  }
  static sub(a, b) {
    return new Vec3(a.x - b.x, a.y - b.y, a.z - b.z);
  }
  static mul(a, b) {
    return new Vec3(a.x * b.x, a.y * b.y, a.z * b.z);
  }
  static div(a, b) {
    return new Vec3(a.x / b.x, a.y / b.y, a.z / b.z);
  }
  static add_scalar(a, n) {
    return new Vec3(a.x + n, a.y + n, a.z + n);
  }
  static sub_scalar(a, n) {
    return new Vec3(a.x - n, a.y - n, a.z - n);
  }
  static mul_scalar(a, n) {
    return new Vec3(a.x * n, a.y * n, a.z * n);
  }
  static div_scalar(a, n) {
    return new Vec3(a.x / n, a.y / n, a.z / n);
  }
  static negative(v) {
    return new Vec3(-v.x, -v.y, -v.z);
  }
  static cross(a, b) {
    return new Vec3(a.y * b.z - a.z * b.y, a.z * b.x - a.x * b.z, a.x * b.y - a.y * b.x);
  }
  static min(a, b) {
    return new Vec3(Math.min(a.x, b.x), Math.min(a.y, b.y), Math.min(a.z, b.z));
  }
  static max(a, b) {
    return new Vec3(Math.max(a.x, b.x), Math.max(a.y, b.y), Math.max(a.z, b.z));
  }
  static larger(a, b) {
    const alen = Math.abs(a.x) + Math.abs(a.y) + Math.abs(a.z);
    const blen = Math.abs(b.x) + Math.abs(b.y) + Math.abs(a.z);
    return alen > blen ? a : b;
  }
  static recip(vec) {
    return new Vec3(1 / vec.x, 1 / vec.y, 1 / vec.z);
  }
  static project_onto(a, b) {
    const len = 1 / b.magnitude_squared();
    return Vec3.mul_scalar(b, a.dot(b) * len);
  }
  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }
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
  create_copy() {
    return new Vec3(this.x, this.y, this.z);
  }
  add(rhs) {
    this.x += rhs.x;
    this.y += rhs.y;
    this.z += rhs.z;
    return this;
  }
  sub(rhs) {
    this.x -= rhs.x;
    this.y -= rhs.y;
    this.z -= rhs.z;
    return this;
  }
  mul(rhs) {
    this.x *= rhs.x;
    this.y *= rhs.y;
    this.z *= rhs.z;
    return this;
  }
  div(rhs) {
    this.x /= rhs.x;
    this.y /= rhs.y;
    this.z /= rhs.z;
    return this;
  }
  add_scalar(rhs) {
    this.x += rhs;
    this.y += rhs;
    this.z += rhs;
    return this;
  }
  sub_scalar(rhs) {
    this.x -= rhs;
    this.y -= rhs;
    this.z -= rhs;
    return this;
  }
  mul_scalar(rhs) {
    this.x *= rhs;
    this.y *= rhs;
    this.z *= rhs;
    return this;
  }
  div_scalar(rhs) {
    rhs = 1 / rhs;
    this.x *= rhs;
    this.y *= rhs;
    this.z *= rhs;
    return this;
  }
  magnitude_squared() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  magnitude() {
    return (this.x * this.x + this.y * this.y + this.z * this.z) ** 0.5;
  }
  normalize() {
    const len = this.magnitude();
    if (Math.abs(1 - len) < 0.0002)
      return this;
    this.mul_scalar(1 / len);
    return this;
  }
  normalized() {
    const recip = 1 / this.magnitude();
    return new Vec3(this.x * recip, this.y * recip, this.z * recip);
  }
  set_magnitude(n) {
    const len = this.magnitude();
    if (Math.abs(len - n) < Number.EPSILON)
      return;
    this.mul_scalar(n / len);
    return this;
  }
  is_normalized() {
    return Math.abs(1 - this.magnitude_squared()) < 0.0002;
  }
  cross(rhs) {
    return Vec3.cross(this, rhs);
  }
  set_cross(rhs) {
    this.x = this.y * rhs.z - this.z * rhs.y;
    this.y = this.z * rhs.x - this.x * rhs.z;
    this.z = this.x * rhs.y - this.y * rhs.x;
    return this;
  }
  distance_squared(rhs) {
    const x = (this.x - rhs.x) ** 2;
    const y = (this.y - rhs.y) ** 2;
    const z = (this.z - rhs.z) ** 2;
    return x + y + z;
  }
  distance(rhs) {
    const x = (this.x - rhs.x) ** 2;
    const y = (this.y - rhs.y) ** 2;
    const z = (this.z - rhs.z) ** 2;
    return (x + y + z) ** 0.5;
  }
  dot(rhs) {
    return this.x * rhs.x + this.y * rhs.y + this.z * rhs.z;
  }
  move_towards(rhs, dt) {
    const len = this.distance_squared(rhs);
    if (len < dt * dt || len <= 0.01) {
      this.x = rhs.x;
      this.y = rhs.y;
      this.z = rhs.z;
      return this;
    } else
      return this.add(Vec3.div_scalar(rhs, len * dt));
  }
  reflect(normal) {
    return this.sub(Vec3.mul_scalar(normal, 2 * this.dot(normal)));
  }
  angle_between(target) {
    return Math.acos(this.dot(target) / Math.sqrt(this.magnitude_squared() * target.magnitude_squared()));
  }
  rotate_by(q) {
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

// src/entities/helpers.ts
import { Player } from "@minecraft/server";

// src/math/helpers.ts
function sign_relative(n, target) {
  return +(n > target) - +(n < target);
}
function sincos(n) {
  return [Math.sin(n), Math.cos(n)];
}

// src/math/quaternion.ts
class Quaternion {
  w;
  x;
  y;
  z;
  static rad = 1 / (180 / Math.PI);
  static x_axis = this.axis_angle(Vec3.RIGHT, this.rad);
  static y_axis = this.axis_angle(Vec3.UP, this.rad);
  static z_axis = this.axis_angle(Vec3.FORWARD, this.rad);
  static conjugate(target) {
    return new Quaternion(target.w, -target.x, -target.y, -target.z);
  }
  static axis_angle(axis, angle) {
    if (!axis.is_normalized())
      throw new Error("Axis is not normalized");
    const [sinn, cos] = sincos(angle * 0.5);
    const sin = Vec3.mul_scalar(axis, sinn);
    return new Quaternion(cos, sin.x, sin.y, sin.z);
  }
  static from_x_rotation(x) {
    const [sin, cos] = sincos(x * 0.5);
    return new Quaternion(cos, sin, 0, 0);
  }
  static from_y_rotation(x) {
    const [sin, cos] = sincos(x * 0.5);
    return new Quaternion(cos, 0, sin, 0);
  }
  static from_z_rotation(x) {
    const [sin, cos] = sincos(x * 0.5);
    return new Quaternion(cos, 0, 0, sin);
  }
  static from_xyzw(x, y, z, w) {
    return new Quaternion(w, x, y, z);
  }
  static from_axes(x, y, z) {
    if (z.z <= 0) {
      let dif10 = y.y - x.x;
      let omm22 = 1 - z.z;
      if (dif10 <= 0) {
        let four_xsq = omm22 - dif10;
        let inv4x = 0.5 / Math.sqrt(four_xsq);
        return Quaternion.from_xyzw(four_xsq * inv4x, (x.y + y.x) * inv4x, (x.z + z.x) * inv4x, (y.z - z.y) * inv4x);
      } else {
        let four_ysq = omm22 + dif10;
        let inv4y = 0.5 / Math.sqrt(four_ysq);
        return Quaternion.from_xyzw((x.y + y.x) * inv4y, four_ysq * inv4y, (y.z + z.y) * inv4y, (z.x - x.z) * inv4y);
      }
    } else {
      let sum10 = y.y + x.x;
      let opm22 = 1 + z.z;
      if (sum10 <= 0) {
        let four_zsq = opm22 - sum10;
        let inv4z = 0.5 / Math.sqrt(four_zsq);
        return Quaternion.from_xyzw((x.z + z.x) * inv4z, (y.z + z.y) * inv4z, four_zsq * inv4z, (x.y - y.x) * inv4z);
      } else {
        let four_wsq = opm22 + sum10;
        let inv4w = 0.5 / Math.sqrt(four_wsq);
        return Quaternion.from_xyzw((y.z - z.y) * inv4w, (z.x - x.z) * inv4w, (x.y - y.x) * inv4w, four_wsq * inv4w);
      }
    }
  }
  constructor(w = 1, x = 0, y = 0, z = 0) {
    this.w = w;
    this.x = x;
    this.y = y;
    this.z = z;
  }
  imag() {
    return new Vec3(this.x, this.y, this.z);
  }
  lerp() {
  }
  scalar() {
    return this.w;
  }
  conjugate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
  }
  magnitude_squared() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  magnitude() {
    return (this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w) ** 0.5;
  }
  look_to(dir) {
    if (!dir.is_normalized())
      throw new Error("Direction is not normalized");
    dir.negate();
    const right = dir.cross(Vec3.UP);
    right.normalize();
    const up = right.cross(dir);
    const out = Quaternion.from_axes(new Vec3(right.x, up.x, -dir.x), new Vec3(right.y, up.y, -dir.y), new Vec3(right.z, up.z, -dir.z));
    this.w = out.w;
    this.x = out.x;
    this.y = out.y;
    this.z = out.z;
  }
}

// src/entities/helpers.ts
function shoot_entity(shooter, opts) {
  const dirnorm = opts.direction.normalized();
  if (opts.precision != 1) {
    const precision_offset = (1 - opts.precision) * 0.31415;
    let precision;
    {
      const random = Math.random();
      precision = sign_relative(random, 0.5) * random * precision_offset;
    }
    dirnorm.rotate_by(Quaternion.axis_angle(new Vec3(0, 1, 0).normalized(), precision));
    {
      const random = Math.random();
      precision = sign_relative(random, 0.5) * random * precision_offset;
    }
    dirnorm.rotate_by(Quaternion.axis_angle(new Vec3(0, 0, 1).normalized(), precision));
  }
  const projectile = shooter.dimension.spawnEntity(opts.projectile_id, Vec3.add(dirnorm, shooter.getHeadLocation()));
  const force = (opts.force ?? 1) * (opts.force_multiplier ?? 1);
  dirnorm.x *= force;
  dirnorm.z *= force;
  projectile.applyImpulse(dirnorm);
}

// src/components/items/custom_diamond.ts
class CustomDiamondComponent extends BaseItemComponent {
  tick;
  info;
  static component_name = "cy:diamond";
  constructor(tick, info) {
    super(tick, info);
    this.tick = tick;
    this.info = info;
  }
  static metralha(entity, n) {
    shoot_entity(entity, {
      projectile_id: "minecraft:arrow",
      direction: Vec3.create(entity.getViewDirection()),
      force: 3,
      precision: 1
    });
  }
  onUse(event) {
    const user = event.source;
    const direction = Vec3.create(user.getViewDirection());
    let n = 60;
    const int = system.runInterval(() => {
      CustomDiamondComponent.metralha(user, 60);
      if (n-- == 0)
        system.clearRun(int);
    }, 1);
  }
}

// src/events/initialize.ts
function initializer(ev) {
  const tick = system2.currentTick;
  const infos = system2.serverSystemInfo;
  {
    CustomDiamondComponent.setup();
  }
  for (const custom_item of custom_item_components) {
    ev.itemComponentRegistry.registerCustomComponent(custom_item.component_name, new custom_item(tick, infos));
  }
  for (const custom_block of custom_block_components)
    ev.blockComponentRegistry.registerCustomComponent(custom_block.component_name, new custom_block(tick, infos));
}

// src/main.ts
world3.beforeEvents.worldInitialize.subscribe(initializer);
