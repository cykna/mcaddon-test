import { Player, EntityHealthComponent } from "@minecraft/server";
import { Damage, dmg_resistances } from "../damage";
import { AttributeManager, AttributeNames } from "../attributes";

//Before dealing damage to the true damage of the player, it will first modify it's xp, so health might mean 'xp'
export class HealthAttribute {
  private health: EntityHealthComponent;
  constructor(private target: Player) {
    this.health = target.getComponent("minecraft:health")! as EntityHealthComponent;
  }
  /**
  * Gets the total amount of health the current bar can have
  */
  max_bar_health() {
    return this.target.totalXpNeededForNextLevel;
  }
  /**
   * Gets the total health in the current bar
   */
  current_bar_health() {
    return this.target.xpEarnedAtCurrentLevel;
  }
  remove_artificial_health() {
    return this.target.resetLevel();
  }
  percentage_of_bar() {
    return this.bar_number() % 1;
  }
  //Gets the current level of the player, in case, the number of the bar. 
  bar_number() {
    //reference https://minecraft.fandom.com/wiki/Experience.
    const totalxp = this.target.getTotalXp();
    //level <= 16
    if (totalxp <= 352) return ((9 + totalxp) ** 0.5) - 3;
    //level <= 31
    if (totalxp <= 1507) return (((totalxp - 195.975) * 0.4) ** 0.5) + 8.1;
    //level >=32
    return 18.05 + (0.222 * (totalxp - 752.986)) ** 0.5;
  }
  limit_bar_number(n: number) {
    if (this.bar_number() > n) this.set_bar_number(n);
  }
  set_bar_number(n: number) {
    this.target.resetLevel();
    this.target.addLevels(n);
  }
  limit_health(n: number) {
    const xp = this.target.getTotalXp();
    if (xp > n) {
      this.target.resetLevel();
      this.target.addExperience(n);
    }
  }
  heal(n: number) {
    const maxlife = AttributeManager.get_attribute(AttributeNames.MaxLife, this.target) + 200;
    if (this.target.getTotalXp() == 0) {
      let current: number;
      if (n > this.health.effectiveMax - (current = this.health.currentValue)) {
        this.health.resetToMaxValue();
        this.target.addExperience(Math.min(maxlife, n - current));
      } else this.health.setCurrentValue(current + n);
    } else {
      this.target.addExperience(Math.min(maxlife, n));
    }
  }
  heal_bars(n: number) {
    if (this.health.currentValue < this.health.effectiveMax) {
      this.health.resetToMaxValue();
      --n;
    }
    this.target.addLevels(n);
  }
  private dmg_val(dmg: Damage) {
    let dmg_val = dmg.inner_damage(this.target);
    for (const boost of dmg.boosts()) dmg_val *= boost.boost_multiplier(this.target);
    AttributeManager.bind_target(this.target);
    dmg_val -= AttributeManager.get_attribute(AttributeNames.DmgReduction);
    for (const dmgres of dmg_resistances(dmg.dmg_type())) dmg_val *= 1 - AttributeManager.get_attribute(dmgres);
    /*dmg_val += dmg.extraDmg(this.target);
    {
      const crit = +(Math.random() > dmg.crit_rate(this.target));
      dmg_val *= 1 + (crit * dmg.crit_damage(this.target));
    }
    dmg_val *= dmg.damage_multiplier(this.target);
    all this was put in the following statment
    */
    return (dmg_val + dmg.extraDmg(this.target)) * dmg.damage_multiplier(this.target) * (1 + +(Math.random() > dmg.crit_rate(this.target)) * dmg.crit_damage(this.target));

  }
  damage(dmg: Damage) {
    let dmg_val = dmg.inner_damage(this.target);
    for (const boost of dmg.boosts()) dmg_val *= boost.boost_multiplier(this.target);
    AttributeManager.bind_target(this.target);
    dmg_val -= AttributeManager.get_attribute(AttributeNames.DmgReduction);
    for (const dmgres of dmg_resistances(dmg.dmg_type()))
      //if 0.9, then 10% of the damage
      dmg_val *= 1 - AttributeManager.get_attribute(dmgres);
    dmg_val += dmg.extraDmg(this.target);
    {
      const crit = +(Math.random() > dmg.crit_rate(this.target));
      dmg_val *= 1 + (crit * dmg.crit_damage(this.target));
    }
    dmg_val *= dmg.damage_multiplier(this.target);
    if (dmg_val > this.total_artificial_health()) {
      const xp = this.total_artificial_health();
      dmg_val -= xp;
      this.target.addExperience(-xp);
    }
    this.health.setCurrentValue(this.health.currentValue - (+(dmg_val > 0) * dmg_val));
  }
  total_artificial_health() {
    return this.target.getTotalXp();
  }
  total_health() {
    return this.target.getTotalXp() + this.health.currentValue;
  }
}
