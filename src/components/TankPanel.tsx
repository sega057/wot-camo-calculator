import type { TankState, TankAction } from '../App';
import type { Movement } from '../lib/constants';
import LightTankToggle from './LightTankToggle';
import Slider from './Slider';
import ToggleButtons from './ToggleButtons';

interface TankPanelProps {
  tank: TankState;
  side: 'A' | 'B';
  label: string;
  dispatch: React.Dispatch<TankAction>;
}

export default function TankPanel({
  tank,
  side,
  label,
  dispatch,
}: TankPanelProps) {
  const variant = side === 'A' ? 'gold' : 'blue';
  const dotColor = side === 'A' ? 'var(--gold)' : undefined; // B gets it from CSS

  const set = (field: string, value: number | boolean | string) => {
    dispatch({ type: 'SET_TANK', side, field, value });
  };

  return (
    <div className={`panel tp ${side === 'A' ? 'pa' : 'pb'}`}>
      <div className="ptitle">
        <span
          className="dot"
          style={dotColor ? { background: dotColor } : undefined}
        />
        <span>{label}</span>
      </div>

      <LightTankToggle
        enabled={tank.isLightTank}
        onToggle={() => set('isLightTank', !tank.isLightTank)}
        variant={variant}
      />

      <Slider
        label="Camo stationary (%)"
        value={tank.camo}
        min={0}
        max={65}
        step={0.01}
        onChange={(v) => set('camo', v)}
        variant={variant}
        tooltip="Your vehicle's base concealment value while stationary and not firing. Found in the garage vehicle stats."
      />
      <Slider
        label="Camo after firing (%)"
        value={tank.camoFire}
        min={0}
        max={40}
        step={0.01}
        onChange={(v) => set('camoFire', v)}
        variant={variant}
        tooltip="Your vehicle's concealment value immediately after firing. The ratio between this and stationary camo determines your camo retention factor."
      />

      <div className={`mv-sliders${!tank.isLightTank ? ' show' : ''}`}>
        <Slider
          label="Camo moving (%)"
          value={tank.camoMoving}
          min={0}
          max={65}
          step={0.01}
          onChange={(v) => set('camoMoving', v)}
          variant={variant}
          tooltip="Your vehicle's concealment value while moving. Non-light tanks have a movement penalty that lowers their camo. Found in the garage vehicle stats."
        />
        <Slider
          label="Camo moving after firing (%)"
          value={tank.camoMovingFire}
          min={0}
          max={40}
          step={0.01}
          onChange={(v) => set('camoMovingFire', v)}
          variant={variant}
          tooltip="Your vehicle's concealment value while moving and after firing."
        />
      </div>

      <div style={{ marginTop: 2 }}>
        <div className="tgl">Movement</div>
        <ToggleButtons
          options={[
            { value: 'stationary', label: 'Stationary' },
            { value: 'moving', label: 'Moving' },
          ]}
          selected={tank.movement}
          onChange={(v) => set('movement', v as Movement)}
          variant={variant}
        />
      </div>
    </div>
  );
}
