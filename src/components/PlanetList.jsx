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
    filterByNumericValues,
    setFilterByNumericValues,
    planetListFiltered,
    setPlanetListFiltered,
    categories,
  } = useContext(PlanetsContext);

  const options = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  const optionSelected = filterByNumericValues.map(({ column }) => column);

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
    // console.log(localFilter);
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
            { options.filter((category) => !optionSelected.includes(category))
              .map((category) => <option key={ category }>{ category }</option>) }
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
            { categories.map((category, index) => <th key={ index }>{ category }</th>) }
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
