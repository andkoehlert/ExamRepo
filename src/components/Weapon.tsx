// Weapon.tsx

import React from 'react';

interface WeaponProps {
  name: string;
  damage: string;
}

const Weapon: React.FC<WeaponProps> = ({ name, damage }) => {
  const handleDragStart = (e: React.DragEvent) => {
    e.dataTransfer.setData('text/plain', name);
  };

  return (
    <div draggable onDragStart={handleDragStart} className="border p-2 m-2 cursor-grab">
      <strong>{name}</strong> (damage: {damage})
    </div>
  );
};

export default Weapon;
