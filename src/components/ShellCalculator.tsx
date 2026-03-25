import { useState } from 'react';
import { calcShellDistance } from '../lib/spotting';
import Slider from './Slider';
import Tooltip from './Tooltip';

export default function ShellCalculator() {
  const [velocity, setVelocity] = useState(900);
  const distance = calcShellDistance(velocity);

  return (
    <div className="shell-panel">
      <div className="ptitle">
        <span className="dot" style={{ background: 'var(--gold-d)' }} />
        Kill without being spotted
      </div>
      <Slider
        label="Shell velocity (m/s)"
        value={velocity}
        min={100}
        max={2500}
        step={1}
        onChange={setVelocity}
        tooltip="Your shell's travel speed in m/s. Found in the gun stats in the garage."
      />
      <div className="shell-result">
        <span className="shell-dist">{distance}</span>
        <span className="shell-unit">
          m — minimum safe distance{' '}
          <Tooltip text="The minimum distance from which your shell reaches the target before the next spotting check. Based on an estimated spotting tick of ~1/6 second with a 5m safety margin. Formula: D = V_shell / 6 - 5 (minimum 50m due to proxy spotting)." />
        </span>
      </div>
      <div className="shell-formula">
        D = (V<sub>shell</sub> / 6) &minus; 5 &nbsp;&nbsp;|&nbsp;&nbsp; min 50 m
        (proxy spot)
      </div>
      <div className="shell-note">
        The minimum distance from which your shell reaches the target before the
        spotting check triggers. Below this distance you will be spotted before
        the target is destroyed.
      </div>
    </div>
  );
}
