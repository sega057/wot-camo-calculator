interface CompareToggleProps {
  enabled: boolean;
  onToggle: () => void;
}

export default function CompareToggle({
  enabled,
  onToggle,
}: CompareToggleProps) {
  return (
    <div className="cbar" onClick={onToggle}>
      <div className={`sw${enabled ? ' on' : ''}`} />
      <span>Compare two tanks</span>
    </div>
  );
}
