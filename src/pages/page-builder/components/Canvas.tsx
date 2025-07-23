import {
  addElement,
  clearSelection,
  getElements,
  getGlobalSettings
} from '@hn/store/reducers/pageBuilder.reducer'
import GenerateUtil from '@hn/utils/generate'
import React, { useCallback, useEffect, useRef } from 'react'
import { useDrop } from 'react-dnd'
import { useDispatch, useSelector } from 'react-redux'
import CanvasElement from './CanvasElement'
import CanvasGrid from './CanvasGrid'

const Canvas: React.FC = () => {
  const dispatch = useDispatch()
  const elements = useSelector(getElements())
  const globalSettings = useSelector(getGlobalSettings())
  const canvasRef = useRef<HTMLDivElement>(null)

  // Drop target setup
  const [{ isOver, canDrop }, drop] = useDrop(
    () => ({
      accept: 'element',
      drop: (item: PageBuilder.IDragItem, monitor) => {
        if (!monitor.isOver({ shallow: true })) return

        if (item.isNew) {
          // Get drop position
          const clientOffset = monitor.getClientOffset()
          const position = {
            x: clientOffset ? clientOffset.x : 0,
            y: clientOffset ? clientOffset.y : 0
          }

          const newElement: PageBuilder.IElement = {
            id: GenerateUtil.generateId(),
            type: item.elementType,
            position,
            size: {
              width: getDefaultSize(item.elementType).width,
              height: getDefaultSize(item.elementType).height
            },
            styles: getDefaultStyles(item.elementType),
            content: getDefaultContent(item.elementType),
            settings: getDefaultSettings(item.elementType) as { [key: string]: unknown },
            isVisible: true,
            isLocked: false,
            zIndex: 1
          }

          dispatch(addElement({ element: newElement }))
        } else if (item.elementId) {
          // TODO: Handle moving existing element
          console.log('Moving existing element:', item.elementId)
        }
      },
      collect: monitor => ({
        isOver: monitor.isOver({ shallow: true }),
        canDrop: monitor.canDrop()
      })
    }),
    []
  )

  // Connect drop ref
  useEffect(() => {
    if (canvasRef.current) {
      drop(canvasRef.current)
    }
  }, [drop])

  const handleCanvasClick = useCallback(
    (e: React.MouseEvent) => {
      // Clear selection when clicking on empty canvas
      if (e.target === e.currentTarget) {
        dispatch(clearSelection())
      }
    },
    [dispatch]
  )

  const handlePaste = useCallback((e: React.ClipboardEvent) => {
    // TODO: Implement paste functionality
    console.log('Paste event:', e)
  }, [])

  const getCanvasWidth = () => {
    const device = globalSettings.responsive.currentDevice
    switch (device) {
      case 'mobile':
        return '375px'
      case 'tablet':
        return '768px'
      default:
        return '1200px'
    }
  }

  return (
    <div className="flex-1 bg-white relative overflow-auto">
      <div className="min-h-full p-10 relative">
        <div
          ref={canvasRef}
          className={`bg-white border min-h-[600px] relative mx-auto shadow-lg ${
            isOver && canDrop ? 'border-blue-500 border-2' : 'border-gray-200'
          }`}
          onPaste={handlePaste}
          onClick={handleCanvasClick}
          tabIndex={0}
          style={{
            width: getCanvasWidth(),
            outline: 'none'
          }}
        >
          <CanvasGrid size={20} />

          {Object.values(elements).map(element => (
            <CanvasElement key={element.id} elementId={element.id} element={element} />
          ))}

          {isOver && canDrop && (
            <div className="absolute inset-0 bg-blue-100 bg-opacity-50 border-2 border-dashed border-blue-500 flex items-center justify-center text-lg text-blue-600 font-bold z-10">
              Drop element here
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// Helper functions
function getDefaultSize(elementType: PageBuilder.ElementType) {
  switch (elementType) {
    case 'text':
      return { width: '200px', height: 'auto' }
    case 'image':
      return { width: '300px', height: '200px' }
    case 'button':
      return { width: '120px', height: '40px' }
    case 'section':
      return { width: '100%', height: '200px' }
    case 'columns':
      return { width: '100%', height: '150px' }
    default:
      return { width: '200px', height: '100px' }
  }
}

function getDefaultStyles(elementType: PageBuilder.ElementType): {
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
    case 'section':
      return {
        backgroundColor: '#f8f9fa',
        padding: 20,
        border: '1px solid #e1e5e9'
      }
    case 'grid-container':
      return {
        backgroundColor: '#f8f9fa',
        border: '1px dashed #dee2e6',
        padding: 16
      }
    case 'grid-column':
      return {
        backgroundColor: '#ffffff',
        border: '1px dashed #dee2e6',
        padding: 8,
        minHeight: 60
      }
    default:
      return {}
  }
}

function getDefaultContent(elementType: PageBuilder.ElementType) {
  switch (elementType) {
    case 'text':
      return { text: 'Sample text', html: '<p>Sample text</p>' }
    case 'image':
      return { src: '', alt: 'Image', caption: '' }
    case 'button':
      return { text: 'Button', link: '', target: '_self' }
    case 'grid-container':
      return {}
    case 'grid-column':
      return {}
    default:
      return {}
  }
}

function getDefaultSettings(elementType: PageBuilder.ElementType): { [key: string]: unknown } {
  switch (elementType) {
    case 'grid-container':
      return {
        maxColumns: 12,
        gap: 16,
        gutterX: 16,
        gutterY: 16,
        responsive: {
          desktop: { columns: 12, gap: 16 },
          tablet: { columns: 8, gap: 12 },
          mobile: { columns: 4, gap: 8 }
        }
      }
    case 'grid-column':
      return {
        span: {
          desktop: 4,
          tablet: 4,
          mobile: 4
        },
        offset: {
          desktop: 0,
          tablet: 0,
          mobile: 0
        },
        order: {
          desktop: 0,
          tablet: 0,
          mobile: 0
        }
      }
    default:
      return {}
  }
}

export default Canvas
