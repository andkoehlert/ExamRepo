import React from 'react';

interface WeaponProps {
    name: string;
    damage: number;
}

const Weapon: React.FC<WeaponProps> = ({name, damage}) => {
  return (
    <div  className="border p-2 m-2 cursor-grab">
        <strong> {name} </strong> (damage: {damage})
    </div>
  );
};

export default Weapon