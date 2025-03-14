// src/main.ts
import { world as world4 } from "@minecraft/server";

// src/events/initialize.ts
import { system } from "@minecraft/server";

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
  static normalized(v) {
    const vec = v.create_copy();
    vec.normalize();
    return vec;
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
    this.x -= rhs.x;
    this.y -= rhs.y;
    this.z -= rhs.z;
    return this;
  }
  div(rhs) {
    this.x -= rhs.x;
    this.y -= rhs.y;
    this.z -= rhs.z;
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
    return Math.pow(this.x * this.x + this.y * this.y + this.z * this.z, 0.5);
  }
  normalize() {
    const len = this.magnitude();
    if (1 - len < Number.EPSILON)
      return;
    this.mul_scalar(1 / len);
    return this;
  }
  set_magnitude(n) {
    const len = this.magnitude();
    if (Math.abs(len - n) < Number.EPSILON)
      return;
    this.mul_scalar(n / len);
    return this;
  }
  is_normalized() {
    return Math.abs(1 - this.magnitude_squared()) < Number.EPSILON;
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
    return Vec3.sub(this, rhs).magnitude_squared();
  }
  distance(rhs) {
    return Vec3.sub(this, rhs).magnitude();
  }
  dot(rhs) {
    return this.x * rhs.x + this.y * rhs.y + this.z * rhs.z;
  }
  move_towards(rhs, dt) {
    const len = rhs.sub(this).magnitude_squared();
    if (len < dt * dt || len <= 0.01) {
      this.x = rhs.x;
      this.y = rhs.y;
      this.z = rhs.z;
      return this;
    } else {
      return this.add(rhs.div_scalar(len * dt));
    }
  }
  reflect(normal) {
    return this.sub(normal.mul_scalar(2 * this.dot(normal)));
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

// src/math/helpers.ts
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
import { Player } from "@minecraft/server";
function is_player(entity) {
  return entity instanceof Player && entity.typeId == "minecraft:player";
}

// src/entities/attributes.ts
import { world } from "@minecraft/server";
var AttributeManager = new class {
  id = "none";
  binded_attribute = "cy:level" /* Level */;
  bind_target(target) {
    this.id = target.id;
  }
  bind_attribute(attrib) {
    this.binded_attribute = attrib;
  }
  get_attribute(attrib_name, target) {
    const attrib = (target ?? world.getEntity(this.id))?.getDynamicProperty(attrib_name);
    if (attrib == undefined)
      return 0;
    if (attrib instanceof Number || attrib instanceof Boolean)
      return +attrib;
    if (attrib instanceof String || attrib instanceof Object)
      return 0;
    return 0;
  }
  set_attribute(attrib, n, target) {
    return (target ?? world.getEntity(this.id))?.setDynamicProperty(attrib, n);
  }
  get value() {
    return this.get_attribute(this.binded_attribute);
  }
  set value(n) {
    this.set_attribute(this.binded_attribute, n);
  }
};

// src/entities/damage.ts
function dmg_type_has(dmg, target) {
  return (dmg & target) != 0;
}
function dmg_resistance(dmg) {
  switch (dmg) {
    case 1 /* Fire */:
      return "cy:fire_res" /* FireResistance */;
    case 2 /* Ice */:
      return "cy:ice_res" /* IceResistance */;
    case 4 /* Lightning */:
      return "cy:lightining_res" /* LightningResistance */;
    case 8 /* Dark */:
      return "cy:dark_res" /* DarkResistance */;
    case 16 /* Physical */:
      return "cy:phys_res" /* PhysicalResistance */;
  }
}
function dmg_resistances(dmg) {
  const out = new Array(5);
  for (let i = 1, idx = 0;i < 1 << 4; i <<= 1)
    if (dmg_type_has(dmg, i))
      out[idx++] = dmg_resistance(i);
  return out.filter((v) => v != null);
}

// src/entities/player/health.ts
class HealthAttribute {
  target;
  health;
  constructor(target) {
    this.target = target;
    this.health = target.getComponent("minecraft:health");
  }
  max_bar_health() {
    return this.target.totalXpNeededForNextLevel;
  }
  current_bar_health() {
    return this.target.xpEarnedAtCurrentLevel;
  }
  remove_artificial_health() {
    return this.target.resetLevel();
  }
  percentage_of_bar() {
    return this.bar_number() % 1;
  }
  bar_number() {
    const totalxp = this.target.getTotalXp();
    if (totalxp <= 352)
      return (9 + totalxp) ** 0.5 - 3;
    if (totalxp <= 1507)
      return ((totalxp - 195.975) * 0.4) ** 0.5 + 8.1;
    return 18.05 + (0.222 * (totalxp - 752.986)) ** 0.5;
  }
  limit_bar_number(n) {
    if (this.bar_number() > n)
      this.set_bar_number(n);
  }
  set_bar_number(n) {
    this.target.resetLevel();
    this.target.addLevels(n);
  }
  limit_health(n) {
    const xp = this.target.getTotalXp();
    if (xp > n) {
      this.target.resetLevel();
      this.target.addExperience(n);
    }
  }
  heal(n) {
    const maxlife = AttributeManager.get_attribute("cy:max_life" /* MaxLife */, this.target) + 200;
    if (this.target.getTotalXp() == 0) {
      let current;
      if (n > this.health.effectiveMax - (current = this.health.currentValue)) {
        this.health.resetToMaxValue();
        this.target.addExperience(Math.min(maxlife, n - current));
      } else
        this.health.setCurrentValue(current + n);
    } else {
      this.target.addExperience(Math.min(maxlife, n));
    }
  }
  heal_bars(n) {
    if (this.health.currentValue < this.health.effectiveMax) {
      this.health.resetToMaxValue();
      --n;
    }
    this.target.addLevels(n);
  }
  dmg_val(dmg) {
    let dmg_val = dmg.inner_damage(this.target);
    for (const boost of dmg.boosts())
      dmg_val *= boost.boost_multiplier(this.target);
    AttributeManager.bind_target(this.target);
    dmg_val -= AttributeManager.get_attribute("cy:damage_reduction" /* DmgReduction */);
    for (const dmgres of dmg_resistances(dmg.dmg_type()))
      dmg_val *= 1 - AttributeManager.get_attribute(dmgres);
    return (dmg_val + dmg.extraDmg(this.target)) * dmg.damage_multiplier(this.target) * (1 + +(Math.random() > dmg.crit_rate(this.target)) * dmg.crit_damage(this.target));
  }
  damage(dmg) {
    let dmg_val = dmg.inner_damage(this.target);
    for (const boost of dmg.boosts())
      dmg_val *= boost.boost_multiplier(this.target);
    AttributeManager.bind_target(this.target);
    dmg_val -= AttributeManager.get_attribute("cy:damage_reduction" /* DmgReduction */);
    for (const dmgres of dmg_resistances(dmg.dmg_type()))
      dmg_val *= 1 - AttributeManager.get_attribute(dmgres);
    dmg_val += dmg.extraDmg(this.target);
    {
      const crit = +(Math.random() > dmg.crit_rate(this.target));
      dmg_val *= 1 + crit * dmg.crit_damage(this.target);
    }
    dmg_val *= dmg.damage_multiplier(this.target);
    if (dmg_val > this.total_artificial_health()) {
      const xp = this.total_artificial_health();
      dmg_val -= xp;
      this.target.addExperience(-xp);
    }
    this.health.setCurrentValue(this.health.currentValue - +(dmg_val > 0) * dmg_val);
  }
  total_artificial_health() {
    return this.target.getTotalXp();
  }
  total_health() {
    return this.target.getTotalXp() + this.health.currentValue;
  }
}

// src/helpers.ts
import { world as world2 } from "@minecraft/server";
function log(msg) {
  world2.sendMessage(msg.toString());
}
function format(template, ...args) {
  let argidx = 0;
  return template.replace(/{:?x?}/g, (match) => {
    if (argidx > args.length)
      throw new Error(`Expected printing ${args.length} args, but number of templates does not match`);
    const v = args[argidx];
    if (match === "{}") {
      if (!v.toString)
        throw new Error(`Expected ${argidx} to implement 'toString'`);
      return v.toString();
    } else if (match === "{:?}") {
      if (!v.asDbg)
        throw new Error(`Expected ${argidx} to implement 'asDbg'`);
      return v.asDbg();
    } else if (match === "{:x}") {
      if (!v.toHex)
        throw new Error(`Expected ${argidx} to implement 'toHex'`);
      return v.toHex();
    } else if (match === "{:J}") {
      if (!v.toJSON)
        throw new Error(`Expected ${argidx} to implement 'toJSON'`);
      return v.toJSON();
    }
    argidx++;
    log(match);
    return match;
  });
}
function println(template, ...args) {
  log(format(template, ...args));
}
Number.prototype.asHex = function() {
  return this.toString(16);
};

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
  onHitEntity(event) {
    if (!is_player(event.attackingEntity))
      return;
    const direction = Vec3.create(event.attackingEntity.getViewDirection());
    console.warn(direction.toString());
    const rotation = Quaternion.axis_angle(Vec3.UP, Math.PI / 2);
    direction.rotate_by(rotation);
    event.attackingEntity.applyKnockback(direction.x, direction.z, direction.magnitude_squared() * 3, direction.y);
    const target_health = new HealthAttribute(event.attackingEntity);
    const n = Math.random() * 1000;
    target_health.set_bar_number(n);
    println("N is {} and bar is {}", n, target_health.bar_number());
  }
}

// src/events/initialize.ts
function initializer(ev) {
  const tick = system.currentTick;
  const infos = system.serverSystemInfo;
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
world4.beforeEvents.worldInitialize.subscribe(initializer);
