import { system, world, WorldInitializeBeforeEvent } from "@minecraft/server";
import { custom_block_components, custom_item_components } from "../components";
import CustomDiamondComponent from "../components/items/custom_diamond";

export function initializer(ev: WorldInitializeBeforeEvent) {
  const tick = system.currentTick;
  const infos = system.serverSystemInfo;
  {
    CustomDiamondComponent.setup();
  }
  for (const custom_item of custom_item_components) {
    ev.itemComponentRegistry.registerCustomComponent(custom_item.component_name, new custom_item(tick, infos));
  }
  for (const custom_block of custom_block_components) ev.blockComponentRegistry.registerCustomComponent(custom_block.component_name, new custom_block(tick, infos));
}
