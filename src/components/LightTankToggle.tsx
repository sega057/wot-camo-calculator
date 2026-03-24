interface LightTankToggleProps {
  enabled: boolean;
  onToggle: () => void;
  variant?: 'gold' | 'blue';
}

export default function LightTankToggle({
  enabled,
  onToggle,
  variant = 'gold',
}: LightTankToggleProps) {
  // The variant determines the toggle color via CSS class on parent .tp.pb
  void variant;
  return (
    <div className="mt">
      <div className={`mt-sw${enabled ? ' on' : ''}`} onClick={onToggle} />
      <span className="mt-label">Light tank</span>
      <span className="mt-help">
        ?
        <span className="tip">
          Light tanks have no camo penalty when moving. Their stationary and
          moving camo values are identical. Disable this to enter separate
          moving camo values for other tank classes.
        </span>
      </span>
    </div>
  );
}
