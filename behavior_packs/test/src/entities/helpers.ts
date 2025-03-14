import { Player, world } from "@minecraft/server";
import { EntityTarget } from "../types";
import { Vec3 } from "../math/vec3";
import { Quaternion } from "../math/quaternion";
import { log } from "../helpers";
import { sign_relative } from "../math/helpers";

interface ShootOptions {
  projectile_id: string;
  direction: Vec3;
  precision: number; //0 - 1, 1 = +precision, 0 = -precision(45deg)
  force?: number;
  force_multiplier?: number;
}

export function is_player(entity: EntityTarget): entity is Player {
  return entity instanceof Player && entity.typeId == "minecraft:player";
}
export function apply_velocity(target: EntityTarget, velocity: Vec3) {
  if (is_player(target)) {
    const normalized = velocity.normalized();
    target.applyKnockback(normalized.x, normalized.z, velocity.xz().magnitude(), normalized.y * velocity.magnitude());
  } else {
    target.clearVelocity();
    target.applyImpulse(velocity);
  }
}
export function add_velocity(target: EntityTarget, velocity: Vec3) {
  if (is_player(target)) {
    const normalized = velocity.normalized();
    target.applyKnockback(normalized.x, normalized.z, velocity.xz().magnitude(), normalized.y * velocity.magnitude() * 0.5);
  } else target.applyImpulse(velocity);
}

/**
 * The given entity shoots a projectile with the given id to the given given dir
 */
export function shoot_entity(shooter: EntityTarget, opts: ShootOptions) {
  const dirnorm = opts.direction.normalized();
  if (opts.precision != 1) {
    const precision_offset = (1 - opts.precision) * 0.31415; //pi/10
    let precision: number;
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
