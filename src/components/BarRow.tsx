import { calcBarPercent, calcTickPercent } from '../lib/spotting';
import Tooltip from './Tooltip';

const TICK_MARKS = [100, 200, 300, 400];

interface BarRowProps {
  label: string;
  distance: number;
  fillColor: string;
  labelWidth?: number;
  labelFontSize?: string;
  tooltip?: string;
}

export default function BarRow({
  label,
  distance,
  fillColor,
  labelWidth,
  labelFontSize,
  tooltip,
}: BarRowProps) {
  const pct = calcBarPercent(distance);

  return (
    <div className="br">
      <span
        className="br-l"
        style={
          labelWidth || labelFontSize
            ? { width: labelWidth, fontSize: labelFontSize }
            : undefined
        }
      >
        {label}
        {tooltip && <Tooltip text={tooltip} />}
      </span>
      <div className="br-t">
        <div
          className="br-f"
          style={{ width: `${pct}%`, background: fillColor }}
        />
        <div className="br-ticks">
          {TICK_MARKS.map((m) => {
            const tp = calcTickPercent(m);
            if (tp <= 0 || tp >= 100) return null;
            return (
              <span key={m}>
                <div className="br-tk" style={{ left: `${tp}%` }} />
                <div className="br-tkl" style={{ left: `${tp}%` }}>
                  {m}m
                </div>
              </span>
            );
          })}
        </div>
      </div>
      <span className="br-v">{distance}m</span>
    </div>
  );
}

interface CompareBarRowProps {
  label: string;
  distance: number;
  otherDistance: number;
  labelWidth?: number;
  labelFontSize?: string;
  tooltip?: string;
}

export function CompareBarRow({
  label,
  distance,
  otherDistance,
  labelWidth,
  labelFontSize,
  tooltip,
}: CompareBarRowProps) {
  const diff = distance - otherDistance;
  const diffClass = diff > 0 ? 'p' : diff < 0 ? 'n' : 'e';
  const diffText = diff > 0 ? `+${diff}` : diff < 0 ? `${diff}` : '=';

  return (
    <div className="br">
      <span
        className="br-l"
        style={{
          width: labelWidth ?? 86,
          fontSize: labelFontSize ?? '0.875rem',
        }}
      >
        {label}
        {tooltip && <Tooltip text={tooltip} />}
      </span>
      <span className="br-v" style={{ width: 44, fontSize: '1rem' }}>
        {distance}m
      </span>
      <span className={`df ${diffClass}`}>{diffText}</span>
    </div>
  );
}
