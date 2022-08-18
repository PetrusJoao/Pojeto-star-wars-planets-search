import React from 'react';
import PropTypes from 'prop-types';

function PlanetTable({ planetList }) {
  return (
    <table>
      <tbody>
        {planetList && planetList.map(
          ({
            name,
            rotation_period: RotationPeriod,
            orbital_period: OrbitalPeriod,
            diameter,
            climate,
            gravity,
            terrain,
            surface_water: SurfaceWater,
            population,
            films,
            created,
            edited,
            url,
          }) => (
            <tr key={ name }>
              <td>{name}</td>
              <td>{RotationPeriod}</td>
              <td>{OrbitalPeriod}</td>
              <td>{diameter}</td>
              <td>{climate}</td>
              <td>{gravity}</td>
              <td>{terrain}</td>
              <td>{SurfaceWater}</td>
              <td>{population}</td>
              <td>{films}</td>
              <td>{created}</td>
              <td>{edited}</td>
              <td>{url}</td>
            </tr>
          ),
        )}
      </tbody>
    </table>
  );
}

PlanetTable.propTypes = {
  planetList: PropTypes.node.isRequired,
};

export default PlanetTable;
