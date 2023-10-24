import React, { DragEvent} from 'react';

interface EnemyProbs {
    onDrop: (weaponName: string) => void;
    health: number;
    children: React.ReactNode;
}

const Enemy: React.FC<EnemyProbs> = ({onDrop, health, children}) => {
    const handleDrop = (e: DragEvent) => {
        e.preventDefault();
        const weaponName = e.dataTransfer.getData('text/plain');
        onDrop(weaponName);
    };
    const handleDragOver = (e: DragEvent) => {
        e.preventDefault();
    }
    return (
        <div onDrop={handleDrop} onDragOver={handleDragOver} className="border-2 border-red-500 p-4 mb-4">
        <h2 className="text-xl font-bold mb-2">Enemy</h2>
        <p>Health: {health}</p>
        {children}
      </div>
    )
}

export default Enemy;