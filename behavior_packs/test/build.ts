async function main() {
  await Bun.build({
    entrypoints: ['./src/main.ts'],
    outdir: './scripts',
  })
}
main();
