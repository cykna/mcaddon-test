// src/abc.ts
function add(a, b) {
  return a + b;
}
function sub(a, b) {
  return a - b;
}

// src/main.ts
function main() {
  const a = sub(add(12, 45), 12);
  console.log(a);
}
main();
