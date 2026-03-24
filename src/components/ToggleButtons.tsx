interface ToggleButtonsProps {
  options: { value: string; label: string }[];
  selected: string;
  onChange: (value: string) => void;
  variant?: 'gold' | 'blue';
}

export default function ToggleButtons({
  options,
  selected,
  onChange,
  variant = 'gold',
}: ToggleButtonsProps) {
  return (
    <div className={`tgr${variant === 'blue' ? ' tgr-b' : ''}`}>
      {options.map((opt) => (
        <button
          key={opt.value}
          className={selected === opt.value ? 'on' : ''}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  );
}
