# Hero 3D product models

Drop real-world product models here as **`.glb`** (binary glTF) files, then tell
Claude — the matching slot in the hero scene is switched from the stylized
fallback to your real model automatically (auto-centred + scaled to fit).

## Expected filenames → hero slot

| File               | Where it appears in the scroll hero      |
| ------------------ | ---------------------------------------- |
| `laptop.glb`       | Opening shot — fills the screen          |
| `phone.glb`        | Flies in from the right (beat 2)          |
| `tablet.glb`       | Rises in during the final beat           |
| `accessory-1.glb`  | Left of the cluster (e.g. headphones)     |
| `accessory-2.glb`  | Front-centre of the cluster (e.g. watch)  |

(Filenames are a convention — any is fine, just say which is which.)

## Where to get good free models

- **Sketchfab** → filter **Downloadable + License: CC0** → search "laptop", "smartphone",
  "tablet", "headphones". Download the **glTF (.glb)** option.
- **poly.pizza** → CC0 low-poly devices, one-click `.glb` download.
- Your **own product models** (manufacturer-provided / commissioned) — best for a real store.

Prefer **.glb under ~5 MB each** so the hero stays fast. If a model faces the wrong
way or sits at the wrong scale, Claude corrects it per-slot in `DeviceScene.tsx`.
