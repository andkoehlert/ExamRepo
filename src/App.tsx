import React, { useState } from 'react';
import Weapon from './components/Weapon';
import Enemy from './components/Enemy';

// TYPE ALIASES
// UNION TYPES
// ARRAY & OBJECT TYPES
// EXPLICIT VS IMPLICIT TYPES
// FUNCTION SIGNATURES
// INTERFACES 

// This is typescript Type Aliases that im using now
// Weapon type is a union type that can be either MeleeWeapon or RangedWeapon
// a union type allows a variable to have one of several types by using the pipe operator (|) to separate each type.
const App: React.FC = () => {
  type MeleeWeapon = { name: 'Sword'; minDamage: number; maxDamage: number } | { name: 'Axe'; minDamage: number; maxDamage: number };
  type RangedWeapon = { name: 'Bow'; minDamage: number; maxDamage: number };
  
  type WeaponType = MeleeWeapon | RangedWeapon;
  
  // This is an array of weapons with different characteristics
  const weapons: WeaponType[] = [
    { name: 'Sword', minDamage: 5, maxDamage: 10 },
    { name: 'Axe', minDamage: 8, maxDamage: 15 },
    { name: 'Bow', minDamage: 3, maxDamage: 7 },

  ];
  
  //This was my first apporch to create the weapons array
  // creating an array of weapons with different characteristics - explicit
/*   const weapons: { name: string; minDamage: number; maxDamage: number }[] = [
  { name: 'Sword', minDamage: 5, maxDamage: 10 },
  { name: 'Axe', minDamage: 8, maxDamage: 15 },
  { name: 'Bow', minDamage: 3, maxDamage: 7 },
];
 */
// implicit example
/* const weapons = [
  { name: 'Sword', minDamage: 5, maxDamage: 10 },
  { name: 'Axe', minDamage: 8, maxDamage: 15 },
  { name: 'Bow', minDamage: 3, maxDamage: 7 },
];
 */

  // These are like containers that hold information about the game state
  const [playerHealth, setPlayerHealth] = useState(30);
  const [enemyHealth, setEnemyHealth] = useState(30);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [isEnemyTurn, setIsEnemyTurn] = useState(false);
  const [isEnemyAlive, setIsEnemyAlive] = useState(true);

  // This function signature handles what happens when a player drops a weapon
  type HandleWeaponDrop = (weaponName: string) => void;

const handleWeaponDrop: HandleWeaponDrop = (weaponName) => {
    // We only want to do something if it's the player's turn and the enemy is still alive
    if (!isPlayerTurn || !isEnemyAlive) return;

    // We look for the weapon the player dropped in the array
    const selectedWeapon = weapons.find((weapon) => weapon.name === weaponName);

    // If we find the weapon, we calculate damage
    if (selectedWeapon) {
      const damage = Math.floor(
        Math.random() * (selectedWeapon.maxDamage - selectedWeapon.minDamage + 1) +
          selectedWeapon.minDamage
      );

      // We update the enemy's health based on the damage
      setEnemyHealth((prevHealth) => Math.max(prevHealth - damage, 0));

      // It's now the enemy's turn, and the player can't attack until the enemy finishes its turn
      setIsPlayerTurn(false);
      setIsEnemyTurn(true);
    }
};
// This is what I used before but i changed it to the one above as a function signature
/*   const handleWeaponDrop = (weaponName: string) => {
    
    if (!isPlayerTurn || !isEnemyAlive) return;

    const selectedWeapon = weapons.find((weapon) => weapon.name === weaponName);

    if (selectedWeapon) {
      const damage = Math.floor(
        Math.random() * (selectedWeapon.maxDamage - selectedWeapon.minDamage + 1) +
          selectedWeapon.minDamage
      );

      setEnemyHealth((prevHealth) => Math.max(prevHealth - damage, 0));

      setIsPlayerTurn(false);
      setIsEnemyTurn(true);
    }
  };
 */
  // enemy's turn
  React.useEffect(() => {
    if (enemyHealth === 0) {
      setIsEnemyAlive(false);

      // Use setTimeout to delay the alert and allow the enemy health to update
      setTimeout(() => {
        alert('Congratulations! You defeated the enemy!');
        // Refresh the page to start over
        window.location.reload();
      }, 0);
    }

    if (isEnemyAlive && isEnemyTurn && playerHealth > 0 && enemyHealth > 0) {
      const enemyDamage = 8;

      // We update the player's health based on the enemy's attack
      setPlayerHealth((prevHealth) => Math.max(prevHealth - enemyDamage, 0));

      setIsPlayerTurn(true);
      setIsEnemyTurn(false);
    }
  }, [isEnemyTurn, isEnemyAlive, playerHealth, enemyHealth, setPlayerHealth]);

  // The return statement describes what the component will render
  return (
    <div className="flex m-10  flex-col justify-center items-center h-screen">
      <div>
        <h1 className="DandD text-3xl font-bold mb-4">The Greatest D&D Game Of All time better than baldurs gate</h1>
      </div>
    <div className="md:flex md:py-0 py-6 flex-row justify-center items-center h-screen gap-40 ">
        <div className="flex  md:flex-row flex-col items-center border-2">
          <div className="border-2 border-green-500 p-4 mb-4">
            {/* Display the player's health */}
            <p>Health: {playerHealth}</p>
          </div>
          {/* Display the weapons the player can choose from */}
          {weapons.map((weapon) => (
            <Weapon
              key={weapon.name}
              name={weapon.name}
              damage={`${weapon.minDamage}-${weapon.maxDamage}`}
              className="Axe"            />
          ))}
        </div>
        <div>
          {/* This is the Enemy component, and it handles what happens when a weapon is dropped on it */}
          <Enemy onDrop={handleWeaponDrop} health={enemyHealth}>
            {/* This is where you could add anything related to the enemy */}
          </Enemy>
        </div>
      </div>
    </div>
  );
};

export default App;
