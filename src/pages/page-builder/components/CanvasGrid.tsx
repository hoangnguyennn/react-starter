import React from 'react'

interface CanvasGridProps {
  size: number
}

const CanvasGrid: React.FC<CanvasGridProps> = ({ size }) => {
  return (
    <div
      className="page-builder__canvas__grid page-builder__grid-pattern"
      style={{
        backgroundSize: `${size}px ${size}px`
      }}
    />
  )
}

export default CanvasGrid
