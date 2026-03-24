export const CVS_BUSH: Record<string, number> = {
  none: 1,
  cvs15: 0.85,
  cvs20: 0.8,
};

export const CVS_MOVE: Record<string, number> = {
  none: 1,
  cvs15: 0.9,
  cvs20: 0.875,
};

export interface BushType {
  name: string;
  factor: number;
  color: string;
  tooltip: string;
}

export const BUSHES: BushType[] = [
  { name: 'Bush 80%', factor: 0.8, color: '#5a8a5e', tooltip: 'Two or more bushes stacked along the enemy\u2019s line of sight. Bush camo is capped at 80% maximum.' },
  { name: 'Bush 75%', factor: 0.75, color: '#6a946a', tooltip: 'One full bush (50%) plus one dead tree or tall grass (25%). Combined foliage camo = 75%.' },
  { name: 'Bush 50%', factor: 0.5, color: '#8a8a5a', tooltip: 'A single bush. The most common in-game scenario.' },
  { name: 'Bush 25%', factor: 0.25, color: '#9a7a5a', tooltip: 'A dead or fallen tree, or tall grass. Low-density foliage.' },
  { name: 'No bush', factor: 0, color: '#8a6060', tooltip: 'No foliage between you and the spotter. Only your vehicle camo applies.' },
];

export const FIRING_MODES = [
  { key: 'n' as const, label: 'Not firing', tooltip: 'Your full camo value applies. All bushes along the line of sight stack additively up to the 80% cap.' },
  { key: 'b' as const, label: 'Behind bush', tooltip: 'Firing from 15m+ behind a bush. The bush stays opaque and provides full camo, but your vehicle camo drops to its after-firing value.' },
  { key: 'i' as const, label: 'In bush', tooltip: 'Firing from inside a bush (less than 15m). Only one bush counts (capped at 50%), and a retention factor (camo after firing / base camo) is applied to your total concealment.' },
];

export type FiringMode = 'n' | 'b' | 'i';
export type CvsOption = 'none' | 'cvs15' | 'cvs20';
export type Movement = 'stationary' | 'moving';
