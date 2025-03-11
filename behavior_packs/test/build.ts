async function main() {
  const result = await Bun.build({
    entrypoints: ['./src/main.ts'],
    outdir: './scripts',
    splitting: true,
    external: ["@minecraft/server"]
  });
  console.log("Finished building src");
  console.log("Build result:", result);
}
import { watch } from "fs";

watch("src/", { recursive: true }, (_, f) => {
  console.log(`Building. File ${f} changed`);
});
main();
