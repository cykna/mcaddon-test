import { ItemComponentHitEntityEvent, ItemCustomComponent, system, SystemInfo } from "@minecraft/server"
import { BaseItemComponent } from "..";
import { Vec3 } from "../../math/vec3";
import { Quaternion } from "../../math/quaternion";
import { is_player } from "../../entities/helpers";

export default class CustomDiamondComponent extends BaseItemComponent implements ItemCustomComponent {
  static override component_name = "cy:diamond";
  constructor(private tick: number, private info: SystemInfo) {
    super(tick, info);
  }
  onHitEntity(event: ItemComponentHitEntityEvent): void {
    const direction = Vec3.create(event.attackingEntity.getViewDirection());
    console.warn(direction.toString());
    const rotation = Quaternion.axis_angle(Vec3.UP, Math.PI / 2);
    direction.rotate_by(rotation);
    event.attackingEntity.applyKnockback(direction.x, direction.z, direction.magnitude_squared() * 3, direction.y);
    console.warn("Uau porque tão alto?", event);
  }
}
