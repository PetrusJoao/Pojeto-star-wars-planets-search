import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import PlanetTable from './PlanetTable';

function PlanetList() {
  const { filterByName, handleChange, planetList } = useContext(PlanetsContext);
  return (
    <div>
      <section>
        <label htmlFor="pesquisa">
          <input
            type="text"
            id="pesquisa"
            value={ filterByName }
            name={ filterByName }
            onChange={ handleChange }
            data-testid="name-filter"
          />
        </label>
      </section>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Rotation Period</th>
            <th>Orbital Period</th>
            <th>Diameter</th>
            <th>Climate</th>
            <th>Gravity</th>
            <th>Terrain</th>
            <th>Surfce water</th>
            <th>Population</th>
            <th>Films</th>
            <th>Created</th>
            <th>Edited</th>
            <th>URL</th>
          </tr>
        </thead>
      </table>
      {filterByName ? (<PlanetTable
        planetList={ planetList.filter(
          (planet) => planet.name.includes(filterByName),
        ) }
      />) : <PlanetTable planetList={ planetList } />}

    </div>
  );
}

export default PlanetList;
