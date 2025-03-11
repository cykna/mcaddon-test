import { BlockCustomComponent, ItemCustomComponent, SystemInfo } from "@minecraft/server";

export const custom_item_components = [] as (typeof BaseItemComponent & ItemCustomComponent)[];
export const custom_block_components = [] as (typeof BaseBlockComponent & BlockCustomComponent)[];

export class BaseItemComponent {
  static readonly component_name = "invalidname"; //must override
  static setup() {
    custom_item_components.push(this);
  }
  constructor(curr_tick: number, server_info: SystemInfo) { } //must override
}
export class BaseBlockComponent {
  static readonly component_name = "invalidname"; //must override
  static setup() {
    custom_block_components.push(this);
  }
  constructor(curr_tick: number, server_info: SystemInfo) { } //must override
}
