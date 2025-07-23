import { addElement, getElements, getGlobalSettings } from '@hn/store/reducers/pageBuilder.reducer'
import GenerateUtil from '@hn/utils/generate'
import React, { useRef } from 'react'
import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import CanvasElement from './CanvasElement'

interface GridContainerProps {
  element: PageBuilder.IGridContainerElement
}

export const GridContainer: React.FC<GridContainerProps> = ({ element }) => {
  const elements = useSelector(getElements())
  const settings = element.settings
  const gridColumns = element.children || []

  const containerStyles: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${settings.maxColumns}, 1fr)`,
    gap: `${settings.gutterY}px ${settings.gutterX}px`,
    padding: `${settings.gap}px`,
    minHeight: '80px'
  }

  return (
    <div
      className="w-full min-h-20 relative border border-dashed border-gray-300 bg-gray-50 bg-opacity-50"
      style={containerStyles}
    >
      {gridColumns.length === 0 ? (
        <div className="col-span-full flex items-center justify-center p-10 text-gray-500 italic text-center bg-gray-50 bg-opacity-80 border-2 border-dashed border-gray-300 rounded">
          <p className="text-sm">Drop grid columns here or add them from the elements panel</p>
        </div>
      ) : (
        gridColumns.map(columnId => {
          const columnElement = elements[columnId]
          if (columnElement && columnElement.type === 'grid-column') {
            return <CanvasElement key={columnId} elementId={columnId} element={columnElement} />
          }
          return null
        })
      )}
    </div>
  )
}

interface GridColumnProps {
  element: PageBuilder.IGridColumnElement
}

export const GridColumn: React.FC<GridColumnProps> = ({ element }) => {
  const ref = useRef<HTMLDivElement>(null)
  const dispatch = useDispatch()
  const globalSettings = useSelector(getGlobalSettings())
  const elements = useSelector(getElements())
  const currentDevice = globalSettings.responsive.currentDevice

  const settings = element.settings
  const span = settings.span[currentDevice] || 1
  const offset = settings.offset[currentDevice] || 0
  const order = settings.order[currentDevice] || 0

  // Drop target for nested elements
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: 'element',
      drop: (item: PageBuilder.IDragItem, monitor) => {
        if (!monitor.isOver({ shallow: true })) return

        if (
          item.isNew &&
          item.elementType !== 'grid-container' &&
          item.elementType !== 'grid-column'
        ) {
          // Create new element inside grid column
          const newElement: PageBuilder.IElement = {
            id: GenerateUtil.generateId(),
            type: item.elementType,
            position: { x: 0, y: 0 }, // Position relative to column
            size: getDefaultElementSize(item.elementType),
            styles: getDefaultElementStyles(item.elementType),
            content: getDefaultElementContent(item.elementType),
            settings: {},
            isVisible: true,
            isLocked: false,
            zIndex: 1
          }

          dispatch(addElement({ element: newElement, parentId: element.id }))
        }
      },
      collect: monitor => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop()
      })
    }),
    [element.id, dispatch]
  )

  // Connect drop ref
  React.useEffect(() => {
    drop(ref.current)
  }, [drop])

  const columnChildren = element.children || []

  const columnStyles: React.CSSProperties = {
    gridColumn: `span ${span}`,
    gridColumnStart: offset > 0 ? offset + 1 : undefined,
    order: order,
    minHeight: '60px'
  }

  return (
    <div
      ref={ref}
      className={`relative min-h-16 p-2 rounded transition-all border ${
        isOver && canDrop
          ? 'border-2 border-dashed border-blue-500 bg-blue-50'
          : 'border border-dashed border-gray-300 bg-white hover:border-blue-400'
      }`}
      style={columnStyles}
    >
      {columnChildren.length === 0 ? (
        <div className="flex flex-col items-center justify-center h-full min-h-16 text-gray-500 text-center">
          <span className="text-xs font-semibold mb-1">Column {span}/12</span>
          <small className="text-xs opacity-80">Drop elements here</small>
        </div>
      ) : (
        columnChildren.map(childId => {
          const childElement = elements[childId]
          if (childElement) {
            return <CanvasElement key={childId} elementId={childId} element={childElement} />
          }
          return null
        })
      )}

      {isOver && canDrop && (
        <div className="absolute inset-1 bg-blue-100 bg-opacity-50 border-2 border-dashed border-blue-500 rounded flex items-center justify-center text-xs text-blue-600 font-semibold z-10">
          Drop element here
        </div>
      )}
    </div>
  )
}

// Helper functions
function getDefaultElementSize(elementType: PageBuilder.ElementType) {
  switch (elementType) {
    case 'text':
      return { width: '100%', height: 'auto' }
    case 'image':
      return { width: '100%', height: 200 }
    case 'button':
      return { width: 'auto', height: 40 }
    default:
      return { width: '100%', height: 'auto' }
  }
}

function getDefaultElementStyles(elementType: PageBuilder.ElementType): {
  [key: string]: string | number
} {
  switch (elementType) {
    case 'text':
      return {
        fontSize: 16,
        color: '#000000',
        fontFamily: 'Arial, sans-serif',
        lineHeight: 1.5
      }
    case 'button':
      return {
        backgroundColor: '#3498db',
        color: '#ffffff',
        border: 'none',
        borderRadius: 4,
        padding: '8px 16px',
        fontSize: 14,
        cursor: 'pointer'
      }
    default:
      return {}
  }
}

function getDefaultElementContent(elementType: PageBuilder.ElementType) {
  switch (elementType) {
    case 'text':
      return { text: 'Sample text', html: '<p>Sample text</p>' }
    case 'image':
      return { src: '', alt: 'Image', caption: '' }
    case 'button':
      return { text: 'Button', link: '', target: '_self' }
    default:
      return {}
  }
}
