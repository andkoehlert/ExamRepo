// App.tsx

import React, { useState } from 'react';
import Weapon from './components/Weapon';
import Enemy from './components/Enemy';

const App: React.FC = () => {
  const weapons = [
    { name: 'Sword', damage: 10 },
    { name: 'Axe', damage: 15 },
    { name: 'Bow', damage: 7 },
  ];

  const [enemyHealth, setEnemyHealth] = useState(30);

  const handleWeaponDrop = (weaponName: string) => {
    const damage = 10;
    setEnemyHealth((prevHealth) => Math.max(prevHealth - damage, 0));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Weapon Battle Game</h1>
      <div className="flex">
        <div>
          <h2 className="text-xl font-bold mb-2">Your Weapons</h2>
          {weapons.map((weapon) => (
            <Weapon key={weapon.name} name={weapon.name} damage={weapon.damage} />
          ))}
        </div>
        <div>
          <Enemy onDrop={handleWeaponDrop} health={enemyHealth}>
            {/* Display any enemy-related content here */}
          </Enemy>
        </div>
      </div>
    </div>
  );
};

export default App;
