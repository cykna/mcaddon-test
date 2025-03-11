import { ItemComponentHitEntityEvent, ItemCustomComponent, SystemInfo } from "@minecraft/server"
import { BaseItemComponent } from "..";
export default class CustomDiamondComponent extends BaseItemComponent implements ItemCustomComponent {
  static override component_name = "cy:diamond";
  constructor(private tick: number, private info: SystemInfo) {
    super(tick, info);
  }
  onHitEntity(event: ItemComponentHitEntityEvent): void {
    event.attackingEntity.applyKnockback(0, -1, 1, 0.5);
    console.warn("Uau porque tão alto?", event);
  }
}
