# WoT Camouflage Calculator

A World of Tanks spotting and camouflage calculator. Calculates the exact distance at which an enemy spotter will detect your tank based on your camouflage values, bush cover, movement state, firing mode, and the enemy's view range and equipment.

**Live:** [sega057.com/camo-calculator](https://sega057.com/camo-calculator/)

## Features

- **Spotting range calculation** for five bush scenarios (80%, 75%, 50%, 25%, no bush) across three firing modes (not firing, behind bush, in bush)
- **Light tank toggle** — light tanks keep full camo while moving; other classes use separate moving camo values
- **CVS equipment support** — Commander's Vision System reduces bush and movement camo effectiveness (15% and 20% variants)
- **Compare mode** — side-by-side comparison of two tank setups against the same spotter, with distance diff badges
- **Shell velocity calculator** — estimates the minimum safe distance at which your shell reaches the target before the next spotting tick
- **Formulas reference** — collapsible section at the bottom with all formulas documented

## Formulas

### Spotting range

```
SpotRange = ViewRange − TotalCamo × (ViewRange − 50)
```

Result clamped to **50–445 m**.

`TotalCamo` depends on the scenario:

| Scenario    | Stationary                                        | Moving                                                       |
| ----------- | ------------------------------------------------- | ------------------------------------------------------------ |
| Not firing  | `CamoV/100 + Bush × CVSf`                         | `CamoV_mov/100 × CVSm + Bush × CVSf`                         |
| Behind bush | `CamoFire/100 + Bush × CVSf`                      | `CamoFire_mov/100 × CVSm + Bush × CVSf`                      |
| In bush     | `(CamoV/100 + min(Bush, 0.5) × CVSf) × retention` | `(CamoV_mov/100 × CVSm + min(Bush, 0.5) × CVSf) × retention` |

- **retention** = CamoFire / CamoV (ratio of camo kept after firing)
- **CVSf** (bush factor): None = 1.0, 15% = 0.85, 20% = 0.80
- **CVSm** (movement factor): None = 1.0, 15% = 0.90, 20% = 0.875

### Shell travel distance

```
D = V_shell / 6 − 5   (minimum 50 m)
```

## Tech stack

- React 19 + TypeScript
- Vite
- No external UI libraries — single CSS file, dark WoT-themed design
- Deployed to GitHub Pages via GitHub Actions

## Development

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```
