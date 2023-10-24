// App.tsx

import React, { useState } from 'react';
import Weapon from './components/Weapon';
import Enemy from './components/Enemy';

const App: React.FC = () => {
  const weapons = [
    { name: 'Sword', minDamage: 5, maxDamage: 10 },
    { name: 'Axe', minDamage: 8, maxDamage: 15 },
    { name: 'Bow', minDamage: 3, maxDamage: 7 },
  ];

  const [enemyHealth, setEnemyHealth] = useState(30);

  const handleWeaponDrop = (weaponName: string) => {
    // Find the weapon in the weapons array
    const selectedWeapon = weapons.find((weapon) => weapon.name === weaponName);

    // If the weapon is found, calculate damage within the specified range
    if (selectedWeapon) {
      const damage = Math.floor(
        Math.random() * (selectedWeapon.maxDamage - selectedWeapon.minDamage + 1) +
          selectedWeapon.minDamage
      );
      setEnemyHealth((prevHealth) => Math.max(prevHealth - damage, 0));
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Weapon Battle Game</h1>
      <div className="flex">
        <div>
          <h2 className="text-xl font-bold mb-2">Your Weapons</h2>
          {weapons.map((weapon) => (
            <Weapon
              key={weapon.name}
              name={weapon.name}
              damage={`${weapon.minDamage}-${weapon.maxDamage}`}
            />
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
