import { ItemComponentHitEntityEvent, ItemCustomComponent, system, SystemInfo } from "@minecraft/server"
import { BaseItemComponent } from "..";
import { Vec3 } from "../../math/vec3";
import { Quaternion } from "../../math/quaternion";
import { is_player } from "../../entities/helpers";
import { HealthAttribute } from "../../entities/player/health";
import { log, println } from "../../helpers";

export default class CustomDiamondComponent extends BaseItemComponent implements ItemCustomComponent {
  static override component_name = "cy:diamond";
  constructor(private tick: number, private info: SystemInfo) {
    super(tick, info);
  }
  onHitEntity(event: ItemComponentHitEntityEvent): void {
    if (!is_player(event.attackingEntity)) return;
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
