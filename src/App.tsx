import React from 'react';
import  Weapon  from './components/Weapon';



const App: React.FC = () => {
  const weapons = [
    { name: 'Sword', damage: 10 },
    { name: 'Axe', damage: 15 },
    { name: 'Bow', damage: 7 },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3x1 front-bold mb-4">Weapon Battle Game</h1>
  <div>

  </div>
    <h2 className="text-xl front-bold mb-2">Your Weapons</h2>
    {weapons.map((weapon) => (
      <Weapon key={weapon.name} name={weapon.name} damage={weapon.damage} />
    ))}
    <div/>
    </div>
  );

    };

    export default App;