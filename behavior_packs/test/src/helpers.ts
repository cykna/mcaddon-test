import { world } from "@minecraft/server";
export interface Displayabe {
  toString?(): string;
  toHex?(): string;
  toJSON?(): string;
  asDbg?(): string;
}
export interface ToString {
  toString(): string;
  toString(radix?: number): string;
}
export function log<T extends ToString>(msg: T) {
  world.sendMessage(msg.toString());
}
function format(template: string, ...args: Displayabe[]) {
  let argidx = 0;
  return template.replace(/{:?x?}/g, (match) => {
    if (argidx > args.length) throw new Error(`Expected printing ${args.length} args, but number of templates does not match`);
    const v = args[argidx];
    if (match === '{}') {
      if (!v.toString) throw new Error(`Expected ${argidx} to implement 'toString'`);
      return v.toString();
    } else if (match === '{:?}') {
      if (!v.asDbg) throw new Error(`Expected ${argidx} to implement 'asDbg'`);
      return v.asDbg();
    } else if (match === '{:x}') {
      if (!v.toHex) throw new Error(`Expected ${argidx} to implement 'toHex'`);
      return v.toHex();
    } else if (match === '{:J}') {
      if (!v.toJSON) throw new Error(`Expected ${argidx} to implement 'toJSON'`);
      return v.toJSON();
    }
    argidx++;
    log(match);
    return match;
  });
}
export function println(template: string, ...args: Displayabe[]) {
  log(format(template, ...args));
}
Number.prototype.asHex! = function() {
  return this.toString(16);
}
