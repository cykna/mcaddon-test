import { EntityTarget } from "../types";
import { AttributeNames } from "./attributes";

export enum DamageType {
  Fire = 1 << 0,
  Ice = 1 << 1,
  Lightning = 1 << 2,
  Dark = 1 << 3,
  Physical = 1 << 4,
}
export function dmg_type_has(dmg: DamageType, target: DamageType) {
  return (dmg & target) != 0;
}
//this function  gets the attribute name of a single damage type
function dmg_resistance(dmg: DamageType): AttributeNames {
  switch (dmg) {
    case DamageType.Fire: return AttributeNames.FireResistance;
    case DamageType.Ice: return AttributeNames.IceResistance;
    case DamageType.Lightning: return AttributeNames.LightningResistance;
    case DamageType.Dark: return AttributeNames.DarkResistance;
    case DamageType.Physical: return AttributeNames.PhysicalResistance;
  }
}
//this function gets all the attribute names of the damage types given ex:(DamageType.Fire | DamageType.Ice)
export function dmg_resistances(dmg: DamageType): AttributeNames[] {
  //Make a way to get Resistance types quantity
  const out = new Array(5);
  for (let i = 1, idx = 0; i < 1 << 4; i <<= 1) if (dmg_type_has(dmg, i)) out[idx++] = dmg_resistance(i);
  return out.filter(v => v != void 0);
}
/*
 * Rule for applying:
 * dmg *= eachBoost() if the same type
 * dmg -= target.dmgReduction
 * dmg *= 1 - dmgRes; //if the same type, else, this dmgRes dont apply 
 * crit = Math.random() > dmg.critRate();
 * dmg += extraDmg
 * dmg *= 1 + crit;
 * dmg *= multiplier;
 */
export interface Damage {
  boosts(): DamageBoost[];
  dmg_type(): DamageType;
  inner_damage(target: EntityTarget): number;
  crit_damage(target: EntityTarget): number;
  crit_rate(target: EntityTarget): number;
  damage_multiplier(target: EntityTarget): number;
  extraDmg(target: EntityTarget): number;
  true_dmg(target: EntityTarget): number;
}
export interface DamageBoost {
  boost_type(): DamageType;
  boost_multiplier(target: EntityTarget): number;
  crit_multiplier(target: EntityTarget): number;
}
