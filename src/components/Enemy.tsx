import React, { DragEvent } from 'react';

// This defines the expected properties (props) that the Enemy component should receive
interface EnemyProps {
  onDrop: (weaponName: string) => void;  // A function to handle when a weapon is dropped on the enemy
  health: number;  // The health of the enemy
  children: React.ReactNode;  // Additional content that can be added inside the Enemy component
}

// This is the Enemy component, declared as a Functional Component
const Enemy: React.FC<EnemyProps> = ({ onDrop, health, children }) => {
  
  // This function is triggered when a weapon is dropped onto the enemy
  const handleDrop = (e: DragEvent) => {
    e.preventDefault();  // Prevent the default behavior of the drop event
    const weaponName = e.dataTransfer.getData('text/plain');  // Get the name of the weapon being dropped
    onDrop(weaponName);  // Call the onDrop function passed as a prop, passing the weapon name
  };

  // This function is triggered when a weapon is dragged over the enemy
  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();  // Prevent the default behavior of the dragover event
  };

  // This is what the Enemy component renders
  return (
    <div onDrop={handleDrop} onDragOver={handleDragOver} className="enemy border-2 border-red-500 p-4 mb-4">
      <h2 className="text-xl font-bold mb-2">Enemy</h2>
      <p className="enemy-health">Health: {health}</p>
      {children}  {/* This is where any additional content inside the Enemy component is rendered */}
    </div>
  );
};

export default Enemy;  // Export the Enemy component to use it in other parts of the application
