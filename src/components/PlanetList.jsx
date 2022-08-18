import React, { useContext, useState, useEffect } from 'react';
import PlanetsContext from '../context/PlanetsContext';
import PlanetTable from './PlanetTable';

function PlanetList() {
  const [localFilter, setLocalFilter] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });

  const {
    filterByName,
    handleChange,
    // planetList,
    filterByNumericValues,
    setFilterByNumericValues,
    planetListFiltered,
    setPlanetListFiltered,
  } = useContext(PlanetsContext);
  useEffect(() => {
    filterByNumericValues.forEach((criterion) => {
      console.log(filterByNumericValues);
      setPlanetListFiltered((prevState) => prevState.filter((planet) => {
        if (criterion.comparison === 'maior que') {
          return Number(
            planet[criterion.column],
          ) > criterion.value;
        } if (criterion.comparison === 'menor que') {
          return Number(
            planet[criterion.column],
          ) < criterion.value;
        }
        return planet[criterion.column]
          === criterion.value;
      }));
    });
  }, [filterByNumericValues]);

  const handleClick = () => {
    console.log(localFilter);
    setFilterByNumericValues((prevState) => [...prevState, localFilter]);
  };
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
              (event) => setLocalFilter({
                ...localFilter, column: event.target.value })
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
              (event) => setLocalFilter({
                ...localFilter, comparison: event.target.value })
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
            value={ localFilter.value }
            onChange={
              (event) => setLocalFilter({
                ...localFilter, value: event.target.value })
            }
          />
        </label>
        <button
          type="button"
          data-testid="button-filter"
          onClick={ handleClick }
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
