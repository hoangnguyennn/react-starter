import {
  getSelectedElementIds,
  removeElement,
  selectElement
} from '@hn/store/reducers/pageBuilder.reducer'
import classNames from 'classnames'
import React, { useRef } from 'react'
import { useDrag, useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import { GridColumn, GridContainer } from './GridSystem'

interface CanvasElementProps {
  elementId: string
  element: PageBuilder.IElement
}

const CanvasElement: React.FC<CanvasElementProps> = ({ elementId, element }) => {
  const dispatch = useDispatch()
  const selectedElementIds = useSelector(getSelectedElementIds())
  const isSelected = selectedElementIds.includes(elementId)

  // Drag source setup
  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'element',
      item: { elementId, isNew: false },
      collect: monitor => ({
        isDragging: monitor.isDragging()
      })
    }),
    [elementId]
  )

  // Drop target setup for nested elements
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'element',
      drop: () => {
        // Handle drop logic if needed
      },
      collect: monitor => ({
        isOver: monitor.isOver({ shallow: true })
      })
    }),
    [elementId]
  )

  const connectRef = useRef<HTMLDivElement>(null)

  // Connect drag and drop
  React.useEffect(() => {
    if (connectRef.current) {
      drag(connectRef.current)
      drop(connectRef.current)
    }
  }, [drag, drop])

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (!element.isLocked) {
      dispatch(selectElement(elementId))
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Delete' && isSelected && !element.isLocked) {
      dispatch(removeElement(elementId))
    }
  }

  const elementStyles: React.CSSProperties = {
    left: element.position.x,
    top: element.position.y,
    width: element.size.width,
    height: element.size.height,
    zIndex: element.zIndex,
    opacity: isDragging ? 0.5 : 1,
    visibility: element.isVisible ? 'visible' : 'hidden',
    cursor: element.isLocked ? 'not-allowed' : 'move',
    ...element.styles
  }

  const elementClasses = classNames(
    'absolute cursor-move border-2 border-transparent transition-all',
    {
      'border-red-500': isSelected,
      'opacity-50': isDragging,
      'cursor-not-allowed opacity-60': element.isLocked,
      'hover:border-blue-500': !isSelected && !element.isLocked,
      'border-green-500': isOver
    }
  )

  return (
    <div
      ref={connectRef}
      className={elementClasses}
      style={elementStyles}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`${element.type} element`}
    >
      <ElementContent element={element} />
      {isSelected && !element.isLocked && (
        <>
          <div className="absolute -top-1 -left-1 w-2 h-2 bg-blue-500 border-2 border-white rounded-full cursor-nw-resize" />
          <div className="absolute -top-1 -right-1 w-2 h-2 bg-blue-500 border-2 border-white rounded-full cursor-ne-resize" />
          <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-blue-500 border-2 border-white rounded-full cursor-sw-resize" />
          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-blue-500 border-2 border-white rounded-full cursor-se-resize" />
        </>
      )}
    </div>
  )
}

// Component đơn giản để render nội dung element
const ElementContent: React.FC<{ element: PageBuilder.IElement }> = ({ element }) => {
  if (element.type === 'text') {
    const textContent = element.content as Record<string, unknown>
    return (
      <div className="w-full h-full p-2 text-gray-800 overflow-hidden">
        {(textContent?.text as string) || 'Text Element'}
      </div>
    )
  }

  if (element.type === 'image') {
    const imageContent = element.content as Record<string, unknown>
    const src = imageContent?.src as string
    return src ? (
      <img src={src} alt="Element" className="w-full h-full object-cover" />
    ) : (
      <div className="w-full h-full flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 text-gray-500 text-sm">
        📷 Image Placeholder
      </div>
    )
  }

  if (element.type === 'button') {
    const buttonContent = element.content as Record<string, unknown>
    return (
      <button className="w-full h-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded transition-colors">
        {(buttonContent?.text as string) || 'Button'}
      </button>
    )
  }

  if (element.type === 'section') {
    return (
      <div className="w-full h-full bg-gray-50 border border-gray-200 p-4">
        <div className="text-gray-500 text-center italic">Section</div>
      </div>
    )
  }

  if (element.type === 'grid-container') {
    return <GridContainer element={element as PageBuilder.IGridContainerElement} />
  }

  if (element.type === 'grid-column') {
    return <GridColumn element={element as PageBuilder.IGridColumnElement} />
  }

  return (
    <div className="w-full h-full flex items-center justify-center bg-gray-50 border border-gray-200 text-gray-500 text-sm capitalize">
      {element.type}
    </div>
  )
}

export default CanvasElement
