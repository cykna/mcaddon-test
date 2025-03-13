import { Player, EntityHealthComponent } from "@minecraft/server";

export enum DamageType {
  Fire,
  Ice,
  Lightning,
  Dark,
  Physical,
}

export class Damage {
}
//Before dealing damage to the true damage of the player, it will first modify it's xp, so health might mean 'xp'
export class HealthAttribute {
  private health: EntityHealthComponent;
  constructor(private target: Player) {
    this.health = target.getComponent("minecraft:health")! as EntityHealthComponent;
  }

  /**
  * Gets the total amount of health required to fill the current bar
  */
  required_to_complete() {
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
  heal(n: number) {
    if (this.target.getTotalXp() == 0) {
      let current: number;
      if (n > this.health.effectiveMax - (current = this.health.currentValue)) {
        this.health.resetToMaxValue();
        n -= current;
        this.target.addExperience(n);
      } else {
        this.health.setCurrentValue(current + n);
      }
    }
  }
  heal_bars(n: number) {
    if (this.health.currentValue < this.health.effectiveMax) {
      this.health.resetToMaxValue();
      --n;
    }
    this.target.addLevels(n);
  }
  damage(dmg: Damage) {

  }
  total_artificial_health() {
    return this.target.getTotalXp();
  }
  total_health() {
    return this.target.getTotalXp() + this.health.currentValue;
  }
}
