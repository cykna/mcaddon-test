//Same as Math.sign(n - target). If n > target, 1, n < target -1, else 0
export function sign_relative(n: number, target: number) {
  return (n > target) as number - (n < target);
}
export function sincos(n: number): [number, number] {
  return [Math.sin(n), Math.cos(n)];
}
