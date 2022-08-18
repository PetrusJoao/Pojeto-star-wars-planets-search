import React, { useContext } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import PlanetTable from './PlanetTable';

function PlanetList() {
  const {
    filterByName,
    handleChange,
    planetList,
    filterByNumericValues,
    setFilterByNumericValues,
    planetListFiltered,
    setPlanetListFiltered,
  } = useContext(PlanetsContext);
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
        <label htmlFor="numericFilterSelect">
          <select
            type="select"
            name="numericFilterSelect"
            data-testid="column-filter"
            onChange={
              (event) => setFilterByNumericValues({
                ...filterByNumericValues, column: event.target.value })
            }
          >
            <option value="population">population</option>
            <option value="orbital_period">orbital_period</option>
            <option value="diameter">diameter</option>
            <option value="rotation_period">rotation_period</option>
            <option value="surface_water">surface_water</option>
          </select>
        </label>
        <label htmlFor="comparisonFilterSelect">
          <select
            type="select"
            name="comparisonFilterSelect"
            data-testid="comparison-filter"
            onChange={
              (event) => setFilterByNumericValues({
                ...filterByNumericValues, comparison: event.target.value })
            }
          >
            <option value="maior que">maior que</option>
            <option value="menor que">menor que</option>
            <option value="igual a">igual a</option>
          </select>
        </label>
        <label htmlFor="value">
          <input
            type="text"
            data-testid="value-filter"
            name="value"
            value={ filterByNumericValues.value }
            onChange={
              (event) => setFilterByNumericValues({
                ...filterByNumericValues, value: event.target.value })
            }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ () => setPlanetListFiltered(
            planetList.filter((planet) => {
              if (filterByNumericValues.comparison === 'maior que') {
                return Number(
                  planet[filterByNumericValues.column],
                ) > filterByNumericValues.value;
              } if (filterByNumericValues.comparison === 'menor que') {
                return Number(
                  planet[filterByNumericValues.column],
                ) < filterByNumericValues.value;
              }
              return planet[filterByNumericValues.column] === filterByNumericValues.value;
            }),
          ) }
        >
          FILTRAR

        </button>
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
        <PlanetTable
          planetList={ planetListFiltered.filter(
            (planet) => planet.name.includes(filterByName),
          ) }
        />
      </table>
    </div>
  );
}

export default PlanetList;
