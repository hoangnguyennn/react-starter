import { DraggableElementProps, IDragItem } from '@hn/types/components'
import { FC, useEffect, useRef } from 'react'
import { useDrag } from 'react-dnd'

export const DraggableElement: FC<DraggableElementProps> = ({ type, label }) => {
  const ref = useRef<HTMLDivElement>(null)

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'element',
      item: {
        type: 'element',
        elementType: type,
        isNew: true
      } as IDragItem,
      collect: monitor => ({
        isDragging: monitor.isDragging()
      })
    }),
    [type]
  )

  useEffect(() => {
    dragRef(ref)
  }, [dragRef])

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center justify-center p-3 border border-gray-200 cursor-grab bg-white hover:border-blue-400 hover:bg-gray-50 transition-all ${
        isDragging ? 'opacity-50 cursor-grabbing' : ''
      }`}
      title={`Drag ${label} to canvas`}
    >
      <div className="text-xs text-gray-600 text-center font-medium">{label}</div>
    </div>
  )
}
