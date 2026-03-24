import { BUSHES } from '../lib/constants';
import type { AppState } from '../App';
import ResultCard from './ResultCard';

interface ResultsGridProps {
  state: AppState;
}

export default function ResultsGrid({ state }: ResultsGridProps) {
  return (
    <>
      <div className="ptitle" style={{ marginBottom: 10, paddingLeft: 2 }}>
        <span className="dot" style={{ background: 'var(--t3)' }} />
        Spotting distance
      </div>
      <div className="rg">
        {BUSHES.map((bush) => (
          <ResultCard
            key={bush.name}
            bush={bush}
            state={state}
            fullWidth={bush.factor === 0}
          />
        ))}
      </div>
    </>
  );
}
