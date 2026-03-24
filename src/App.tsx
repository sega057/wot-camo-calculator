import { useReducer } from 'react';
import './App.css';
import type { CvsOption, Movement } from './lib/constants';
import Header from './components/Header';
import CompareToggle from './components/CompareToggle';
import TankPanel from './components/TankPanel';
import SpotterPanel from './components/SpotterPanel';
import ResultsGrid from './components/ResultsGrid';
import ShellCalculator from './components/ShellCalculator';
import FormulasFooter from './components/FormulasFooter';

export interface TankState {
  camo: number;
  camoFire: number;
  camoMoving: number;
  camoMovingFire: number;
  isLightTank: boolean;
  movement: Movement;
}

export interface AppState {
  tankA: TankState;
  tankB: TankState;
  viewRange: number;
  cvs: CvsOption;
  compareMode: boolean;
}

export type TankAction =
  | {
      type: 'SET_TANK';
      side: 'A' | 'B';
      field: string;
      value: number | boolean | string;
    }
  | { type: 'SET_VIEW_RANGE'; value: number }
  | { type: 'SET_CVS'; value: CvsOption }
  | { type: 'TOGGLE_COMPARE' };

const initialState: AppState = {
  tankA: {
    camo: 50.34,
    camoFire: 9.89,
    camoMoving: 30,
    camoMovingFire: 5,
    isLightTank: true,
    movement: 'stationary',
  },
  tankB: {
    camo: 35,
    camoFire: 6,
    camoMoving: 20,
    camoMovingFire: 3.5,
    isLightTank: true,
    movement: 'stationary',
  },
  viewRange: 450,
  cvs: 'none',
  compareMode: false,
};

function reducer(state: AppState, action: TankAction): AppState {
  switch (action.type) {
    case 'SET_TANK': {
      const tankKey = action.side === 'A' ? 'tankA' : 'tankB';
      return {
        ...state,
        [tankKey]: { ...state[tankKey], [action.field]: action.value },
      };
    }
    case 'SET_VIEW_RANGE':
      return { ...state, viewRange: action.value };
    case 'SET_CVS':
      return { ...state, cvs: action.value };
    case 'TOGGLE_COMPARE':
      return { ...state, compareMode: !state.compareMode };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <div className="app">
      <Header />
      <CompareToggle
        enabled={state.compareMode}
        onToggle={() => dispatch({ type: 'TOGGLE_COMPARE' })}
      />

      <div className={`tw${state.compareMode ? ' cmp-on' : ''}`}>
        <TankPanel
          tank={state.tankA}
          side="A"
          label={state.compareMode ? 'Tank A' : 'Your tank'}
          dispatch={dispatch}
        />
        <TankPanel
          tank={state.tankB}
          side="B"
          label="Tank B"
          dispatch={dispatch}
        />
      </div>

      <SpotterPanel
        viewRange={state.viewRange}
        cvs={state.cvs}
        onViewRangeChange={(v) =>
          dispatch({ type: 'SET_VIEW_RANGE', value: v })
        }
        onCvsChange={(v) => dispatch({ type: 'SET_CVS', value: v })}
      />

      <ResultsGrid state={state} />
      <ShellCalculator />
      <FormulasFooter />
    </div>
  );
}

export default App;
