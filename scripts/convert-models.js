/* One-off asset conversion: FBX/OBJ -> GLB for the hero scene.
   Run: node scripts/convert-models.js  */
const fs = require("fs");
const path = require("path");

const MODELS = path.join(__dirname, "..", "public", "models");
const EXTRACT = path.join(MODELS, "_extract");

async function convertFbx(src, out) {
  const convert = require("fbx2gltf");
  const dest = await convert(src, out, ["--khr-materials-unlit"]);
  return dest;
}

async function convertObj(src, out) {
  const obj2gltf = require("obj2gltf");
  const glb = await obj2gltf(src, { binary: true });
  fs.writeFileSync(out, glb);
  return out;
}

async function main() {
  const jobs = [
    {
      name: "graphic-tablet",
      type: "fbx",
      src: path.join(EXTRACT, "graphic-tablet", "source", "GraphicT.fbx"),
      out: path.join(MODELS, "graphic-tablet.glb"),
    },
    {
      name: "generic-printer",
      type: "obj",
      src: path.join(EXTRACT, "generic-printer", "source", "printerLP.obj"),
      out: path.join(MODELS, "generic-printer.glb"),
    },
  ];

  for (const j of jobs) {
    try {
      if (!fs.existsSync(j.src)) {
        console.log(`SKIP ${j.name}: source missing (${j.src})`);
        continue;
      }
      const dest = j.type === "fbx" ? await convertFbx(j.src, j.out) : await convertObj(j.src, j.out);
      const kb = (fs.statSync(dest).size / 1024).toFixed(1);
      console.log(`OK   ${j.name} -> ${path.basename(dest)} (${kb} KB)`);
    } catch (e) {
      console.log(`FAIL ${j.name}: ${e && e.message ? e.message : e}`);
    }
  }
}

main();
