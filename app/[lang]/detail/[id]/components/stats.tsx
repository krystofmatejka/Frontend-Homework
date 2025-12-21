'use client';

import type { ShoppingListItem } from "../../../../types";
import type { DetailTranslation } from "../translations";

export function Stats({ items, translation }: { items: ShoppingListItem[]; translation: DetailTranslation }) {
  const completedCount = items.filter(item => !item.isActive).length;
  const notCompletedCount = items.filter(item => item.isActive).length;
  const total = items.length;

  if (total === 0) {
    return null;
  }

  const completedPercentage = (completedCount / total) * 100;
  const notCompletedPercentage = (notCompletedCount / total) * 100;

  console.log({ completedCount, notCompletedCount, total });

  // Calculate angles for pie chart
  const completedAngle = (completedCount / total) * 360;

  console.log({ completedAngle });

  // Function to create pie slice path
  const getSlicePath = (startAngle: number, endAngle: number) => {
    const radius = 140;
    const centerX = 220;
    const centerY = 260;
    
    const start = getCoordinatesForAngle(startAngle, radius, centerX, centerY);
    const end = getCoordinatesForAngle(endAngle, radius, centerX, centerY);
    const largeArcFlag = endAngle - startAngle > 180 ? 1 : 0;

    return `M ${centerX} ${centerY} L ${start.x} ${start.y} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${end.x} ${end.y} Z`;
  };

  const getCoordinatesForAngle = (angle: number, radius: number, centerX: number, centerY: number) => {
    const radian = (angle - 90) * (Math.PI / 180);
    return {
      x: centerX + radius * Math.cos(radian),
      y: centerY + radius * Math.sin(radian)
    };
  };

  return (
    <div style={{
      padding: '20px',
      margin: '20px 0',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      backgroundColor: '#f9f9f9'
    }}>
      <h3 style={{ marginTop: 0, marginBottom: '20px', textAlign: 'center' }}>
        {translation.stats.title}
      </h3>

      <div style={{ display: 'flex', alignItems: 'center', gap: '30px', flexWrap: 'wrap' }}>
        <svg width="200" height="200" viewBox="80 120 280 280" xmlns="http://www.w3.org/2000/svg">
          {/* Completed slice (blue) */}
          {completedCount > 0 && completedCount < total && (
            <path 
              d={getSlicePath(0, completedAngle)} 
              fill="#36A2EB" 
              stroke="white" 
              strokeWidth="2" 
            />
          )}
          
          {/* Completed full circle */}
          {completedCount === total && (
            <circle 
              cx="220" 
              cy="260" 
              r="140" 
              fill="#36A2EB" 
              stroke="white" 
              strokeWidth="2" 
            />
          )}
          
          {/* Not completed slice (red) */}
          {notCompletedCount > 0 && notCompletedCount < total && (
            <path 
              d={getSlicePath(completedAngle, 360)} 
              fill="#FF6384" 
              stroke="white" 
              strokeWidth="2" 
            />
          )}
          
          {/* Not completed full circle */}
          {notCompletedCount === total && (
            <circle 
              cx="220" 
              cy="260" 
              r="140" 
              fill="#FF6384" 
              stroke="white" 
              strokeWidth="2" 
            />
          )}
        </svg>

        <div style={{ flex: 1, minWidth: '200px' }}>
          <div style={{ marginBottom: '15px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
              <div style={{
                width: '20px',
                height: '20px',
                backgroundColor: '#36A2EB',
                borderRadius: '4px'
              }} />
              <span style={{ fontWeight: 'bold' }}>{translation.stats.completed}</span>
            </div>
            <div style={{ marginLeft: '30px', color: '#666' }}>
              {completedCount} ({completedPercentage.toFixed(1)}%)
            </div>
          </div>

          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
              <div style={{
                width: '20px',
                height: '20px',
                backgroundColor: '#FF6384',
                borderRadius: '4px'
              }} />
              <span style={{ fontWeight: 'bold' }}>{translation.stats.notCompleted}</span>
            </div>
            <div style={{ marginLeft: '30px', color: '#666' }}>
              {notCompletedCount} ({notCompletedPercentage.toFixed(1)}%)
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
