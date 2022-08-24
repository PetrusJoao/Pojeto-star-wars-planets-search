import React, { useContext, useState/* , useEffect */ } from 'react';
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
    // setPlanetListFiltered,
    categories,
    // planetList,
  } = useContext(PlanetsContext);

  const options = ['population', 'orbital_period',
    'diameter', 'rotation_period', 'surface_water'];

  const optionSelected = filterByNumericValues.map(({ column }) => column);

  const handleClick = () => {
    setLocalFilter({
      column: options.filter((category) => !optionSelected.includes(category))[0],
      comparison: 'maior que',
      value: 0,
    });
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
        <button
          type="button"
          data-testid="button-remove-filters"
          onClick={ () => { setFilterByNumericValues([]); } }
        >
          Remover Filtros
        </button>
        <div>
          { filterByNumericValues.map((criterium) => (
            <ul data-testid="filter" key={ criterium.column }>
              <span>{criterium.column}</span>
              <span>{` / ${criterium.comparison} / `}</span>
              <span>{criterium.value}</span>
              <button
                type="button"
                onClick={ () => setFilterByNumericValues(
                  filterByNumericValues.filter(
                    (filterNum) => filterNum.column !== criterium.column,
                  ),
                ) }
              >
                X
              </button>
            </ul>)) }
        </div>
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
