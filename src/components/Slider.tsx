import Tooltip from './Tooltip';

interface SliderProps {
  label: string;
  value: number;
  min: number;
  max: number;
  step: number;
  onChange: (value: number) => void;
  variant?: 'gold' | 'blue';
  tooltip?: string;
}

export default function Slider({
  label,
  value,
  min,
  max,
  step,
  onChange,
  variant = 'gold',
  tooltip,
}: SliderProps) {
  const isBlue = variant === 'blue';

  return (
    <div className="sg">
      <div className="sg-h">
        <span className="sg-l">
          {label}
          {tooltip && <Tooltip text={tooltip} />}
        </span>
        <input
          className={`si${isBlue ? ' b' : ''}`}
          type="number"
          value={value}
          step={step}
          min={min}
          max={max}
          onChange={(e) => {
            const v = parseFloat(e.target.value);
            if (!isNaN(v)) onChange(v);
          }}
        />
      </div>
      <input
        type="range"
        className={isBlue ? 'sr-b' : ''}
        min={min}
        max={max}
        step={step}
        value={Math.max(min, Math.min(max, value))}
        onChange={(e) => onChange(parseFloat(e.target.value))}
      />
    </div>
  );
}
