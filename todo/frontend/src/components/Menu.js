import React from 'react'

function Menu() {
  const menu_points = ['Main', 'Users'];
  const menuList = menu_points.map((point) =>
    <li key={point}>{point}</li>
  );
  return (
    <ul>{menuList}</ul>
  );
}


export default Menu
