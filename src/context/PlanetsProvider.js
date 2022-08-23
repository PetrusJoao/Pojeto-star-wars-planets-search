import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PlanetsContext from './PlanetsContext';

function PlanetsProvider({ children }) {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [planetList, setPlanetList] = useState();
  const [filterByName, setFilterByName] = useState('');
  const [filterByNumericValues, setFilterByNumericValues] = useState([]);
  const [planetListFiltered, setPlanetListFiltered] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetch(endpoint).then((response) => response.json());
      const categoriesWithoutResidents = results.map((planet) => {
        delete planet.residents;
        return planet;
      });
      setPlanetList(results);
      setPlanetListFiltered(results);
      setCategories(Object.keys(categoriesWithoutResidents[0]));
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
    categories,
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
