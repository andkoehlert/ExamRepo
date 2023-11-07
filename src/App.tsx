import React, { useState } from 'react';
import Weapon from './components/Weapon';
import Enemy from './components/Enemy';

// This is a type definition that says our component is a Functional Component
const App: React.FC = () => {

  // creating an array of weapons with different characteristics - explicit
  const weapons: { name: string; minDamage: number; maxDamage: number }[] = [
  { name: 'Sword', minDamage: 5, maxDamage: 10 },
  { name: 'Axe', minDamage: 8, maxDamage: 15 },
  { name: 'Bow', minDamage: 3, maxDamage: 7 },
];

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

  // This function handles what happens when a player drops a weapon
  const handleWeaponDrop = (weaponName: string) => {
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

  // Simulate the enemy's turn
  React.useEffect(() => {
    if (enemyHealth === 0) {
      // If the enemy has no more health, we set it as defeated and show a victory message
      setIsEnemyAlive(false);

      // Use setTimeout to delay the alert and allow the enemy health to update
      setTimeout(() => {
        alert('Congratulations! You defeated the enemy!');
        // Refresh the page to start over
        window.location.reload();
      }, 0);
    }

    // If the enemy is still alive, it attacks the player
    if (isEnemyAlive && isEnemyTurn && playerHealth > 0 && enemyHealth > 0) {
      // For simplicity, let's assume the enemy always attacks with a fixed damage
      const enemyDamage = 8;

      // We update the player's health based on the enemy's attack
      setPlayerHealth((prevHealth) => Math.max(prevHealth - enemyDamage, 0));

      // It's now the player's turn again, and the enemy can't attack until the player finishes their turn
      setIsPlayerTurn(true);
      setIsEnemyTurn(false);
    }
  }, [isEnemyTurn, isEnemyAlive, playerHealth, enemyHealth, setPlayerHealth]);

  // The return statement describes what the component will render
  return (
    <div className="flex m-10  flex-col justify-center items-center h-screen">
      <div>
        <h1 className="text-3xl font-bold mb-4">The Greatest D&D Game Of All Time</h1>
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
            />
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

// This exports the App component so that it can be used in other parts of the application
export default App;
