import { useCanvas } from '@hn/contexts/CanvasContext'
import { ElementType, IDragItem, IElement } from '@hn/types/components'
import GenerateUtil from '@hn/utils/generate'
import { ReactNode, useCallback, useEffect, useRef } from 'react'
import { useDrop } from 'react-dnd'
import { CanvasElement } from './CanvasElement'

// Default settings for each element type
const getDefaultSettings = (elementType: ElementType) => {
  switch (elementType) {
    case 'button':
      return {
        variant: 'primary' as const,
        size: 'md' as const,
        disabled: false,
        loading: false,
        fullWidth: false,
        rounded: 'md' as const,
        text: 'Button'
      }
    case 'text':
      return {
        as: 'p' as const,
        size: 'base' as const,
        weight: 'normal' as const,
        color: 'inherit' as const,
        align: 'left' as const,
        truncate: false,
        noWrap: false,
        breakWords: false,
        breakAll: false,
        content: 'Text content'
      }
    case 'image':
      return {
        src: 'https://via.placeholder.com/150x150/3B82F6/FFFFFF?text=Image',
        alt: 'Placeholder image',
        width: 150,
        height: 150,
        objectFit: 'cover' as const,
        rounded: 'none' as const,
        shadow: 'none' as const,
        loading: 'lazy' as const
      }
    case 'divider':
      return {
        orientation: 'horizontal' as const,
        color: 'gray' as const,
        size: 'md' as const,
        spacing: 'md' as const,
        dashed: false,
        dotted: false
      }
    case 'spacer':
      return {
        size: 'md' as const,
        axis: 'vertical' as const,
        inline: false
      }
    case 'input':
      return {
        type: 'text' as const,
        placeholder: 'Enter text...',
        value: '',
        disabled: false,
        readonly: false,
        required: false,
        size: 'md' as const,
        variant: 'outline' as const,
        fullWidth: false,
        rounded: 'md' as const
      }
    case 'textarea':
      return {
        placeholder: 'Enter text...',
        value: '',
        rows: 3,
        cols: undefined,
        disabled: false,
        readonly: false,
        required: false,
        size: 'md' as const,
        variant: 'outline' as const,
        fullWidth: false,
        rounded: 'md' as const,
        resize: 'vertical' as const
      }
    case 'select':
      return {
        options: [
          { value: 'option1', label: 'Option 1' },
          { value: 'option2', label: 'Option 2' },
          { value: 'option3', label: 'Option 3' }
        ],
        value: '',
        placeholder: 'Select an option',
        disabled: false,
        required: false,
        size: 'md' as const,
        variant: 'outline' as const,
        fullWidth: false,
        rounded: 'md' as const,
        multiple: false
      }
    case 'checkbox':
      return {
        checked: false,
        disabled: false,
        required: false,
        size: 'md' as const,
        variant: 'default' as const,
        rounded: 'md' as const,
        label: 'Checkbox'
      }
    case 'radio':
      return {
        checked: false,
        disabled: false,
        required: false,
        name: 'radio-group',
        value: 'option1',
        size: 'md' as const,
        variant: 'default' as const,
        label: 'Radio'
      }
    case 'layout':
      return {
        cols: 2 as const,
        columns: [
          { id: 'col-1', span: 6 as const },
          { id: 'col-2', span: 6 as const }
        ],
        gap: 'md' as const,
        direction: 'row' as const,
        align: 'stretch' as const,
        justify: 'start' as const,
        fullWidth: true,
        fullHeight: false,
        children: []
      }
    default:
      return {}
  }
}

export const Canvas = () => {
  const {
    elements,
    setElements,
    selectElement,
    deleteElement,
    moveElement,
    selectedElement,
    moveElementInLayout
  } = useCanvas()
  const canvasRef = useRef<HTMLDivElement>(null)

  // Function to select element
  const handleSelectElement = useCallback(
    (elementId: string) => {
      selectElement(elementId)
    },
    [selectElement]
  )

  // Handle drop into layout columns
  const handleLayoutDrop = useCallback(
    (item: IDragItem, columnIndex: number, layoutElementId: string) => {
      console.log('handleLayoutDrop called with:', { item, columnIndex, layoutElementId })
      if (item.isNew) {
        console.log('Creating new element in layout')

        // Get current elements in this column to determine orderIndex
        const existingElementsInColumn = elements.filter(
          el => el.parentId === layoutElementId && el.columnIndex === columnIndex
        )
        const nextOrderIndex = existingElementsInColumn.length

        const newElement: IElement = {
          id: GenerateUtil.generateId(),
          type: item.elementType,
          position: { x: 0, y: 0 },
          styles: {},
          settings: getDefaultSettings(item.elementType),
          isVisible: true,
          isLocked: false,
          zIndex: 0,
          parentId: layoutElementId,
          columnIndex: columnIndex,
          orderIndex: nextOrderIndex
        } as IElement
        setElements((prev: IElement[]) => [...prev, newElement])
      }
    },
    [setElements, elements]
  )

  // Get children for layout columns
  const getLayoutColumnChildren = useCallback(
    (layoutElementId: string) => {
      const layoutChildren = elements.filter(el => el.parentId === layoutElementId)
      const columnChildren: ReactNode[] = []

      // Group children by column index first
      const childrenByColumn: { [key: number]: typeof layoutChildren } = {}
      layoutChildren.forEach(child => {
        const columnIndex = child.columnIndex || 0
        if (!childrenByColumn[columnIndex]) {
          childrenByColumn[columnIndex] = []
        }
        childrenByColumn[columnIndex].push(child)
      })

      // Then render each column's children with correct index
      Object.entries(childrenByColumn).forEach(([columnIndex, children]) => {
        const colIndex = parseInt(columnIndex)
        // Sort by orderIndex
        const sortedChildren = children.sort((a, b) => (a.orderIndex || 0) - (b.orderIndex || 0))

        columnChildren[colIndex] = sortedChildren.map((child, indexInColumn) => {
          // Disable reordering in layout columns for now
          const noOpMoveElement = () => {
            // No-op: reordering trong layout columns tạm thời bị disable
          }

          return (
            <div key={child.id} className="mb-2">
              <CanvasElement
                element={child}
                index={indexInColumn}
                moveElement={noOpMoveElement}
                onSelect={handleSelectElement}
                onLayoutDrop={handleLayoutDrop}
                disableDrag={true} // Disable drag for elements in layout columns
              />
            </div>
          )
        })
      })

      return columnChildren
    },
    [elements, moveElementInLayout, handleSelectElement, handleLayoutDrop]
  )

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Delete' && selectedElement) {
        deleteElement(selectedElement.id)
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedElement, deleteElement])

  // Handle click outside to deselect - but not when clicking on PropertiesPanel
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (canvasRef.current && !canvasRef.current.contains(event.target as Node)) {
        // Check if click is on PropertiesPanel
        const target = event.target as HTMLElement
        const propertiesPanel = target.closest('[data-panel="properties"]')

        if (!propertiesPanel) {
          selectElement(null)
        }
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [selectElement])

  const [, drop] = useDrop(() => ({
    accept: 'element',
    drop: (item: IDragItem, monitor) => {
      console.log('Canvas drop handler called')
      if (!monitor.isOver({ shallow: true })) {
        console.log('Not over Canvas shallow, returning')
        return
      }

      // Kiểm tra xem drop đã được xử lý bởi component con chưa
      const dropResult = monitor.getDropResult() as { handled?: boolean } | null
      console.log('Canvas drop handler - dropResult:', dropResult)

      if (dropResult && dropResult.handled) {
        // Layout column đã xử lý rồi, không cần tạo element mới
        console.log('Layout column handled, not creating new element')
        return
      }

      if (item.isNew) {
        console.log('new element')
        const newElement: IElement = {
          id: GenerateUtil.generateId(),
          type: item.elementType,
          position: { x: 0, y: 0 }, // Không cần position cho flow layout
          styles: {},
          settings: getDefaultSettings(item.elementType),
          isVisible: true,
          isLocked: false,
          zIndex: 0
        } as IElement
        setElements((prev: IElement[]) => [...prev, newElement])
      } else {
        console.log('update element - not supported in flow layout')
        // Không hỗ trợ drag để di chuyển trong flow layout
      }
    }
  }))

  useEffect(() => {
    if (canvasRef.current) {
      drop(canvasRef.current)
    }
  }, [drop])

  return (
    <div className="flex-1 bg-white relative overflow-auto">
      <div className="min-h-full p-10">
        <div
          ref={canvasRef}
          className={`bg-white border min-h-[600px] relative mx-auto shadow-lg border-gray-200 p-6`}
          tabIndex={0}
          style={{
            width: '100%',
            outline: 'none'
          }}
        >
          <div className="space-y-4">
            {elements
              .filter(element => !element.parentId) // Chỉ render elements gốc
              .map((element, index) => (
                <CanvasElement
                  key={element.id}
                  element={element}
                  index={index}
                  moveElement={moveElement}
                  onSelect={handleSelectElement}
                  onLayoutDrop={handleLayoutDrop}
                  columnChildren={
                    element.type === 'layout' ? getLayoutColumnChildren(element.id) : undefined
                  }
                />
              ))}
          </div>
        </div>
      </div>
    </div>
  )
}
