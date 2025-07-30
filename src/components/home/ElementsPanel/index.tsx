import { FC, useEffect, useRef } from 'react'
import { useDrag } from 'react-dnd'

interface ElementsPanelProps {
  // Panel props can be added here
}

export const ElementsPanel: FC<ElementsPanelProps> = () => {
  const elementTypes = [
    { type: 'button', label: 'Button', icon: '🔘' },
    { type: 'text', label: 'Text', icon: '📝' },
    { type: 'image', label: 'Image', icon: '🖼️' },
    { type: 'divider', label: 'Divider', icon: '➖' },
    { type: 'spacer', label: 'Spacer', icon: '📏' },
    { type: 'input', label: 'Input', icon: '📝' },
    { type: 'textarea', label: 'Textarea', icon: '📄' },
    { type: 'select', label: 'Select', icon: '📋' },
    { type: 'checkbox', label: 'Checkbox', icon: '☑️' },
    { type: 'radio', label: 'Radio', icon: '🔘' },
    { type: 'layout', label: 'Layout', icon: '📐' }
  ]

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      <h4 className="text-lg font-semibold mb-4">Basic Elements</h4>
      <div className="space-y-2">
        {elementTypes.map(element => (
          <DraggableElement
            key={element.type}
            type={element.type}
            label={element.label}
            icon={element.icon}
          />
        ))}
      </div>
    </div>
  )
}

interface DraggableElementProps {
  type: string
  label: string
  icon: string
}

const DraggableElement: FC<DraggableElementProps> = ({ type, label, icon }) => {
  const ref = useRef<HTMLDivElement>(null)

  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: 'element',
      item: {
        type: 'element',
        elementType: type,
        isNew: true
      },
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
      className={`p-3 border border-gray-200 rounded-md cursor-move hover:bg-gray-50 transition-colors ${
        isDragging ? 'opacity-50' : ''
      }`}
    >
      <div className="flex items-center space-x-2">
        <span className="text-lg">{icon}</span>
        <span className="text-sm font-medium">{label}</span>
      </div>
    </div>
  )
}
