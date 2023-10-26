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

  const [playerHealth, setPlayerHealth] = useState(40);
  const [enemyHealth, setEnemyHealth] = useState(30);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [isEnemyTurn, setIsEnemyTurn] = useState(false);

  const handleWeaponDrop = (weaponName: string) => {
    if (!isPlayerTurn) return; // Ignore drops during the enemy's turn

    // Find the weapon in the weapons array
    const selectedWeapon = weapons.find((weapon) => weapon.name === weaponName);

    // If the weapon is found, calculate damage within the specified range
    if (selectedWeapon) {
      const damage = Math.floor(
        Math.random() * (selectedWeapon.maxDamage - selectedWeapon.minDamage + 1) +
          selectedWeapon.minDamage
      );

      // Update health based on whose turn it is
      if (isPlayerTurn) {
        setEnemyHealth((prevHealth) => Math.max(prevHealth - damage, 0));
      } else {
        setPlayerHealth((prevHealth) => Math.max(prevHealth - damage, 0));
      }

      // Toggle turns after the player and enemy have made their moves
      setIsPlayerTurn(false);
      setIsEnemyTurn(true);
    }
  };

  // Simulate the enemy's turn
  React.useEffect(() => {
    if (isEnemyTurn) {
      // Implement the logic for the enemy's turn here
      // For simplicity, let's assume the enemy always attacks with a fixed damage
      const enemyDamage = 8;
      setPlayerHealth((prevHealth) => Math.max(prevHealth - enemyDamage, 0));

      // Toggle turns after the enemy has made its move
      setIsPlayerTurn(true);
      setIsEnemyTurn(false);
    }
  }, [isEnemyTurn]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <div>
      <h1 className="text-3xl font-bold mb-4">Weapon Battle Game</h1>

      </div>
      <div className="flex flex-row justify-center items-center h-screen gap-40 ">
        <div className="flex flex-row items-center border-2">
          
          <div className="border-2 border-green-500 p-4 mb-4">
            <p>Health: {playerHealth}</p>
          </div>
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
