import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const endpoint = 'https://swapi-trybe.herokuapp.com/api/planets/';
  const [planetList, setPlanetList] = useState([]);

  useEffect(() => {
    const getPlanets = async () => {
      const { results } = await fetch(endpoint).then((response) => response.json());
      setPlanetList(results);
    };
    getPlanets();
  }, []);
  return (
    <main>
      <h1>Planet List</h1>
      <div>
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
          <tbody>
            {
              planetList.map(({
                name,
                rotation_period,
                orbital_period,
                diameter, climate,
                gravity, terrain,
                surface_water,
                population,
                films,
                created,
                edited,
                url
              }) => (
                <tr key={ name }>
                  <td>{name}</td>
                  <td>{rotation_period}</td>
                  <td>{orbital_period}</td>
                  <td>{diameter}</td>
                  <td>{climate}</td>
                  <td>{gravity}</td>
                  <td>{terrain}</td>
                  <td>{surface_water}</td>
                  <td>{population}</td>
                  <td>{films}</td>
                  <td>{created}</td>
                  <td>{edited}</td>
                  <td>{url}</td>
                </tr>))
            }
          </tbody>
        </table>
      </div>
    </main>
  );
}

export default App;
