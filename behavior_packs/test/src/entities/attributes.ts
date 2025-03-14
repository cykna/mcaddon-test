import { world } from "@minecraft/server";
import { EntityTarget } from "../types";

export enum AttributeNames {
  DmgReduction = 'cy:damage_reduction',
  Level = 'cy:level',
  RegenRate = 'cy:regen_rate',
  Mana = 'cy:mana',
  ManaRegen = 'cy:mana_regen',
  MaxLife = 'cy:max_life',

  DogdeSpeed = 'cy:dodge_speed',

  FireResistance = 'cy:fire_res',
  IceResistance = 'cy:ice_res',
  LightningResistance = 'cy:lightining_res',
  DarkResistance = 'cy:dark_res',
  PhysicalResistance = 'cy:phys_res',

}

export const AttributeManager = new class {
  id = 'none';
  binded_attribute = AttributeNames.Level;
  //Binds the target ID. When using (get/set)_attribute, it will be executed based on the current binded ID, same as with .value property
  bind_target(target: EntityTarget) {
    this.id = target.id;
  }
  bind_attribute(attrib: AttributeNames) {
    this.binded_attribute = attrib;
  }
  //Gets the attribute from the entity with the binded ID
  get_attribute(attrib_name: AttributeNames, target?: EntityTarget) {
    const attrib = (target ?? world.getEntity(this.id))?.getDynamicProperty(attrib_name);
    if (attrib == undefined) return 0;
    if (attrib instanceof Number || attrib instanceof Boolean) return +attrib;
    if (attrib instanceof String || attrib instanceof Object) return 0;
    return 0;
  }
  set_attribute(attrib: AttributeNames, n: number, target?: EntityTarget) {
    return (target ?? world.getEntity(this.id))?.setDynamicProperty(attrib, n);
  }
  //Gets the value of the attribute, if the get value is object, or string, returns NaN, if its void 0, returns 0, if is number or boolean return +inner
  get value() {
    return this.get_attribute(this.binded_attribute);
  }
  set value(n: number) {
    this.set_attribute(this.binded_attribute, n);
  }
}

