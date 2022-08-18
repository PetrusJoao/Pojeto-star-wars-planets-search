import React from 'react';
import './App.css';
import PlanetList from './components/PlanetList';
import PlanetTable from './components/PlanetTable';
import PlanetsProvider from './context/PlanetsProvider';

function App() {
  return (
    <PlanetsProvider>
      <PlanetTable />
      <PlanetList />
    </PlanetsProvider>
  );
}

export default App;
