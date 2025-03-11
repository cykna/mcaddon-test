import { add, sub } from "./abc.ts";
function main() {
  const a = sub(add(12, 45), 12)
  console.log(a);
}
main();
