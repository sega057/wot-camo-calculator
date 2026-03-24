import type { CvsOption } from '../lib/constants';
import Slider from './Slider';
import ToggleButtons from './ToggleButtons';
import Tooltip from './Tooltip';

interface SpotterPanelProps {
  viewRange: number;
  cvs: CvsOption;
  onViewRangeChange: (value: number) => void;
  onCvsChange: (value: CvsOption) => void;
}

export default function SpotterPanel({
  viewRange,
  cvs,
  onViewRangeChange,
  onCvsChange,
}: SpotterPanelProps) {
  return (
    <div className="panel">
      <div className="ptitle">
        <span className="dot" style={{ background: 'var(--t3)' }} />
        Enemy spotter
      </div>
      <div className="cols">
        <div className="col">
          <Slider
            label="View range (m)"
            value={viewRange}
            min={250}
            max={600}
            step={1}
            onChange={onViewRangeChange}
            tooltip="The enemy spotter's view range in meters. Maximum effective spotting distance is always capped at 445m regardless of view range."
          />
        </div>
        <div className="col">
          <div className="tgl">
            Commander's Vision System{' '}
            <Tooltip text="Commander's Vision System. Reduces the target's foliage camo by 15% (standard slot) or 20% (dedicated spotting slot). Also reduces moving vehicle camo by 10% or 12.5% respectively." />
          </div>
          <ToggleButtons
            options={[
              { value: 'none', label: 'None' },
              { value: 'cvs15', label: 'CVS 15%' },
              { value: 'cvs20', label: 'CVS 20%' },
            ]}
            selected={cvs}
            onChange={(v) => onCvsChange(v as CvsOption)}
          />
        </div>
      </div>
    </div>
  );
}
