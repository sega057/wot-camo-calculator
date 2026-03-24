import type { BushType } from '../lib/constants';
import { FIRING_MODES } from '../lib/constants';
import type { EffectiveCamo } from '../lib/spotting';
import { calcSpotRange } from '../lib/spotting';
import type { AppState } from '../App';
import BarRow, { CompareBarRow } from './BarRow';
import Tooltip from './Tooltip';
import { getEffectiveCamo } from '../lib/spotting';

interface ResultCardProps {
  bush: BushType;
  state: AppState;
  fullWidth: boolean;
}

export default function ResultCard({
  bush,
  state,
  fullWidth,
}: ResultCardProps) {
  const isCompare = state.compareMode;

  function getCamo(side: 'tankA' | 'tankB'): {
    ec: EffectiveCamo;
    moving: boolean;
  } {
    const t = state[side];
    const moving = t.movement === 'moving';
    const ec = getEffectiveCamo(
      t.camo,
      t.camoFire,
      t.camoMoving,
      t.camoMovingFire,
      t.isLightTank,
      moving,
    );
    return { ec, moving };
  }

  return (
    <div className={`rc${fullWidth ? ' fw' : ''}`}>
      <div className="rct">
        <span className="ico" style={{ background: bush.color }} />
        {bush.name}
        <Tooltip text={bush.tooltip} />
      </div>

      {!isCompare ? (
        <>
          {FIRING_MODES.map((m) => {
            const { ec, moving } = getCamo('tankA');
            const d = calcSpotRange(
              state.viewRange,
              ec.cv,
              ec.cf,
              bush.factor,
              moving,
              state.cvs,
              m.key,
            );
            return (
              <BarRow
                key={m.key}
                label={m.label}
                distance={d}
                fillColor="var(--bar-n)"
                tooltip={m.tooltip}
              />
            );
          })}
        </>
      ) : (
        <div className="cs">
          {(['tankA', 'tankB'] as const).map((side) => {
            const otherSide = side === 'tankA' ? 'tankB' : 'tankA';
            const tag = side === 'tankA' ? 'Tank A' : 'Tank B';
            const tagClass = side === 'tankA' ? 'a' : 'b';
            const { ec, moving } = getCamo(side);
            const { ec: ecO, moving: movO } = getCamo(otherSide);

            return (
              <div className="cs-s" key={side}>
                <div className={`cs-tag ${tagClass}`}>{tag}</div>
                {FIRING_MODES.map((m) => {
                  const d = calcSpotRange(
                    state.viewRange,
                    ec.cv,
                    ec.cf,
                    bush.factor,
                    moving,
                    state.cvs,
                    m.key,
                  );
                  const dO = calcSpotRange(
                    state.viewRange,
                    ecO.cv,
                    ecO.cf,
                    bush.factor,
                    movO,
                    state.cvs,
                    m.key,
                  );
                  return (
                    <CompareBarRow
                      key={m.key}
                      label={m.label}
                      distance={d}
                      otherDistance={dO}
                      tooltip={m.tooltip}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
