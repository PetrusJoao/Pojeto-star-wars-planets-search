import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [planetList, setPlanetList] = useState();
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState({
    column: 'population',
    comparison: 'maior que',
    value: 0,
  });
  const [planetListFiltered, setPlanetListFiltered] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetch(endpoint).then((response) => response.json());
      setPlanetList(results);
      setPlanetListFiltered(results);
    };
    getPlanets();
  }, []);

  const handleChange = ({ target }) => {
    setFilterByName(target.value);
  };

  const values = {
    planetList,
    filterByName,
    handleChange,
    filterByNumericValues,
    setFilterByNumericValues,
    planetListFiltered,
    setPlanetListFiltered,
  };
  return (
    <PlanetsContext.Provider value={ values }>
      {children}
    </PlanetsContext.Provider>
  );
}

PlanetsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PlanetsProvider;
