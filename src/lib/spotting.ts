import {
  CVS_BUSH,
  CVS_MOVE,
  type CvsOption,
  type FiringMode,
} from './constants';

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

export interface EffectiveCamo {
  cv: number; // vehicle camo (stationary or moving)
  cf: number; // camo after firing (stationary or moving)
}

export function getEffectiveCamo(
  camoStat: number,
  camoFire: number,
  camoMoving: number,
  camoMovingFire: number,
  isLightTank: boolean,
  isMoving: boolean,
): EffectiveCamo {
  if (!isMoving) return { cv: camoStat, cf: camoFire };
  if (isLightTank) return { cv: camoStat, cf: camoFire };
  return { cv: camoMoving, cf: camoMovingFire };
}

export function calcSpotRange(
  viewRange: number,
  cv: number,
  cf: number,
  bushFactor: number,
  isMoving: boolean,
  cvs: CvsOption,
  mode: FiringMode,
): number {
  const cF = CVS_BUSH[cvs];
  const cM = CVS_MOVE[cvs];
  let totalCamo: number;

  if (mode === 'n') {
    // Not firing
    totalCamo = (isMoving ? (cv / 100) * cM : cv / 100) + bushFactor * cF;
  } else if (mode === 'b') {
    // Firing behind bush
    totalCamo = (isMoving ? (cf / 100) * cM : cf / 100) + bushFactor * cF;
  } else {
    // Firing in bush
    const bc = Math.min(bushFactor, 0.5);
    const vp = isMoving ? (cv / 100) * cM : cv / 100;
    const retention = cv > 0 ? cf / cv : 0;
    totalCamo = (vp + bc * cF) * retention;
  }

  return clamp(Math.round(viewRange - totalCamo * (viewRange - 50)), 50, 445);
}

export function calcBarPercent(distance: number): number {
  return ((distance - 50) / (445 - 50)) * 100;
}

export function calcTickPercent(meters: number): number {
  return ((meters - 50) / (445 - 50)) * 100;
}

export function calcShellDistance(velocity: number): number {
  return Math.max(50, Math.round(velocity / 6 - 5));
}
