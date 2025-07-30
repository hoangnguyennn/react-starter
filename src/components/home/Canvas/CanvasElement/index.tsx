import { useCanvas } from '@hn/contexts/CanvasContext'
import { CanvasElementProps, IDragItem } from '@hn/types/components'
import { FC, ReactNode, useEffect, useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { ElementContent } from '../ElementContent'

type Props = CanvasElementProps & {
  index: number
  moveElement: (dragIndex: number, hoverIndex: number) => void
  onSelect: (elementId: string) => void
  onLayoutDrop?: (item: IDragItem, columnIndex: number, layoutElementId: string) => void
  columnChildren?: ReactNode[]
  disableDrag?: boolean // Thêm prop để disable drag
}

export const CanvasElement: FC<Props> = ({
  element,
  index,
  moveElement,
  onSelect,
  onLayoutDrop,
  columnChildren,
  disableDrag = false
}) => {
  const { selectedElement } = useCanvas()
  const ref = useRef<HTMLDivElement>(null)

  // Check if this element is actually selected
  const isActuallySelected = selectedElement?.id === element.id

  // Drag logic for reordering - disabled if disableDrag is true
  const [{ isDragging }, drag] = useDrag({
    type: 'canvas-element',
    item: {
      type: 'canvas-element',
      elementId: element.id,
      index
    },
    collect: monitor => ({
      isDragging: monitor.isDragging()
    }),
    canDrag: !disableDrag // Disable drag if disableDrag is true
  })

  // Drop logic for reordering - disabled if disableDrag is true
  const [, drop] = useDrop({
    accept: 'canvas-element',
    hover: (item: { elementId: string; index: number }, monitor) => {
      if (disableDrag) return // Disable drop if disableDrag is true

      if (!ref.current) {
        return
      }
      const dragIndex = item.index
      const hoverIndex = index

      // Don't replace items with themselves
      if (dragIndex === hoverIndex) {
        return
      }

      // Determine rectangle on screen
      const hoverBoundingRect = ref.current?.getBoundingClientRect()

      // Get vertical middle
      const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2

      // Determine mouse position
      const clientOffset = monitor.getClientOffset()

      // Get pixels to the top
      const hoverClientY = clientOffset!.y - hoverBoundingRect.top

      // Only perform the move when the mouse has crossed half of the items height
      // When dragging downwards, only move when the cursor is below 50%
      // When dragging upwards, only move when the cursor is above 50%

      // Dragging downwards
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return
      }

      // Dragging upwards
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return
      }

      // Time to actually perform the action
      moveElement(dragIndex, hoverIndex)

      // Note: we're mutating the monitor item here!
      // Generally it's better to avoid mutations,
      // but it's good here for the sake of performance
      // to avoid expensive index searches.
      item.index = hoverIndex
    }
  })

  useEffect(() => {
    if (!disableDrag) {
      drag(drop(ref))
    }
  }, [drag, drop, disableDrag])

  // Handle click to select
  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    onSelect(element.id)
  }

  // Handle layout drop
  const handleLayoutDrop = (item: IDragItem, columnIndex: number) => {
    if (onLayoutDrop && element.type === 'layout') {
      onLayoutDrop(item, columnIndex, element.id)
    }
  }

  return (
    <div
      ref={ref}
      tabIndex={0}
      role="button"
      aria-label={`${element.type} element`}
      className={`w-full cursor-move transition-all duration-200 relative ${
        isDragging ? 'opacity-50' : ''
      }`}
      style={{
        ...element.styles
      }}
      onClick={handleClick}
    >
      <ElementContent
        element={element}
        onLayoutDrop={handleLayoutDrop}
        columnChildren={columnChildren}
      />
      {isActuallySelected && (
        <div className="absolute -inset-2 pointer-events-none ring-2 ring-blue-500 rounded-md z-10" />
      )}
    </div>
  )
}
