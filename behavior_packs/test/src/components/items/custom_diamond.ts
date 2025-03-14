import { ItemComponentUseEvent, ItemCustomComponent, Player, system, SystemInfo } from "@minecraft/server"
import { BaseItemComponent } from "..";
import { Vec3 } from "../../math/vec3";
import { add_velocity, shoot_entity } from "../../entities/helpers";
import { AttributeManager, AttributeNames } from "../../entities/attributes";
import { log } from "../../helpers.ts"
import { LEN1_BLOCK, MAG1_DIST } from "../../math/constants.ts";
export default class CustomDiamondComponent extends BaseItemComponent implements ItemCustomComponent {
  static override component_name = "cy:diamond";
  constructor(private tick: number, private info: SystemInfo) {
    super(tick, info);
  }
  static metralha(entity: Player, n: number) {
    shoot_entity(entity, {
      projectile_id: 'minecraft:arrow',
      direction: Vec3.create(entity.getViewDirection()),
      force: 3,
      precision: 1,
    });
  }
  onUse(event: ItemComponentUseEvent): void {
    const user = event.source;
    const direction = Vec3.create(user.getViewDirection());
    let n = 60;
    const int = system.runInterval(() => {
      CustomDiamondComponent.metralha(user, 60)
      if (n-- == 0) system.clearRun(int);
    }, 1);
  };
}
