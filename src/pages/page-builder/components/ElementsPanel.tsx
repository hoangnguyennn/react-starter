import React, { useRef } from 'react'
import { useDrag } from 'react-dnd'

const ElementsPanel: React.FC = () => {
  return (
    <div className="w-80 bg-white border-r border-gray-200 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-slate-800 mb-1">Elements</h3>
        <small className="text-gray-600 text-sm">Drag elements to canvas</small>
      </div>
      <div className="p-4">
        <div className="space-y-6">
          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3 pb-2 border-b border-gray-200">
              Basic
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <DraggableElement type="text" icon="📝" label="Text" />
              <DraggableElement type="image" icon="🖼️" label="Image" />
              <DraggableElement type="button" icon="🔘" label="Button" />
              <DraggableElement type="heading" icon="📋" label="Heading" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3 pb-2 border-b border-gray-200">
              Layout
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <DraggableElement type="section" icon="📦" label="Section" />
              <DraggableElement type="columns" icon="⬜" label="Columns" />
              <DraggableElement type="grid-container" icon="🔲" label="Grid" />
              <DraggableElement type="grid-column" icon="▦" label="Column" />
              <DraggableElement type="divider" icon="➖" label="Divider" />
              <DraggableElement type="spacer" icon="⬆️" label="Spacer" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3 pb-2 border-b border-gray-200">
              Media
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <DraggableElement type="video" icon="🎥" label="Video" />
              <DraggableElement type="icon" icon="⭐" label="Icon" />
            </div>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-slate-700 mb-3 pb-2 border-b border-gray-200">
              Forms
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <DraggableElement type="form" icon="📝" label="Form" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Component cho mỗi element có thể drag
interface DraggableElementProps {
  type: PageBuilder.ElementType
  icon: string
  label: string
}

const DraggableElement: React.FC<DraggableElementProps> = ({ type, icon, label }) => {
  const ref = useRef<HTMLDivElement>(null)

  const [{ isDragging }, drag] = useDrag(
    () => ({
      type: 'element',
      item: {
        type: 'element',
        elementType: type,
        isNew: true
      } as PageBuilder.IDragItem,
      collect: monitor => ({
        isDragging: monitor.isDragging()
      })
    }),
    [type]
  )

  // Connect the drag source to the ref
  React.useEffect(() => {
    drag(ref.current)
  }, [drag])

  return (
    <div
      ref={ref}
      className={`flex flex-col items-center justify-center p-3 border border-gray-200 rounded-lg cursor-grab bg-white hover:border-blue-400 hover:bg-gray-50 transition-all ${
        isDragging ? 'opacity-50 cursor-grabbing' : ''
      }`}
      title={`Drag ${label} to canvas`}
    >
      <div className="text-xl mb-1">{icon}</div>
      <div className="text-xs text-gray-600 text-center font-medium">{label}</div>
    </div>
  )
}

export default ElementsPanel
