// src/main.ts
import { world as world2 } from "@minecraft/server";

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
    event.attackingEntity.applyKnockback(0, 1, 1, 0.5);
    console.warn("Uau porque tão alto?", event);
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
world2.beforeEvents.worldInitialize.subscribe(initializer);
