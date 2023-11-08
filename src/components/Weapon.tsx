import React from 'react';

// This defines the expected properties (props) that the Weapon component should receive
// Interface Alias

interface WeaponProps {
  name: string;  // The name of the weapon
  damage: string;  // The damage range of the weapon
}

// This is the Weapon component, declared as a Functional Component
const Weapon: React.FC<WeaponProps> = ({ name, damage }) => {

  // This function is triggered when a weapon is dragged
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', name);  // Set the dragged data to the name of the weapon
  };

  // This is what the Weapon component renders
  return (
    <div draggable onDragStart={handleDragStart} className="border p-2 m-2 cursor-grab">
      <strong>{name}</strong> (damage: {damage})
    </div>
  );
};

export default Weapon;  
