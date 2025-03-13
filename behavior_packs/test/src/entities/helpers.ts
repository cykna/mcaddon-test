import { Player } from "@minecraft/server";
import { EntityTarget } from "../types";
import { Vec3 } from "../math/vec3";
export function is_player(entity: EntityTarget): entity is Player {
  return entity instanceof Player && entity.typeId == "minecraft:player";
}
export function apply_velocity(target: EntityTarget, velocity: Vec3) {
  target.clearVelocity();
  if (is_player(target)) {
    const normalized = Vec3.normalized(velocity);
    target.applyKnockback(normalized.x, normalized.z, velocity.x * velocity.x + velocity.z * velocity.z, normalized.y * velocity.magnitude());
  } else target.applyImpulse(velocity);
}
export function add_velocity(target: EntityTarget, velocity: Vec3) {
  if (is_player(target)) {
    const normalized = Vec3.normalized(velocity);
    target.applyKnockback(normalized.x, normalized.z, velocity.x * velocity.x + velocity.z * velocity.z, normalized.y * velocity.magnitude());
  } else target.applyImpulse(velocity);
}
