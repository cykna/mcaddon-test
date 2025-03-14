import { EntityTarget } from "../../types";
import { AttributeManager, AttributeNames } from "../attributes";
import { Damage, DamageBoost, DamageType } from "../damage";
import { is_player } from "../helpers.ts";
export class DiamondDamage implements Damage {
  dmg_boosts = [];
  constructor(public dmg: number) { }
  boosts(): DamageBoost[] {
    return this.dmg_boosts;
  }
  dmg_type(): DamageType {
    return DamageType.Physical;
  }
  inner_damage(_: EntityTarget): number {
    return this.dmg;
  }
  crit_damage(target: EntityTarget): number {
    return this.dmg * 2;
  }
  crit_rate(target: EntityTarget): number {
    return 0.5;
  }
  damage_multiplier(target: EntityTarget): number {
    return +(AttributeManager.get_attribute(AttributeNames.DmgReduction, target) || 1 < 1.5) + 1;
  }
  extraDmg(target: EntityTarget): number {
    return +is_player(target) * AttributeManager.get_attribute(AttributeNames.Level, target) >> 5;
  }
  true_dmg(target: EntityTarget): number {
    if (AttributeManager.get_attribute(AttributeNames.Level, target) < 20) return 1;
    return 0;
  }
}
