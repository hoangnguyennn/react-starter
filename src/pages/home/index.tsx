import { Canvas } from '@hn/components/home/Canvas'
import { ElementsPanel } from '@hn/components/home/ElementsPanel'
import { PropertiesPanel } from '@hn/components/home/PropertiesPanel'
import { CanvasProvider } from '@hn/contexts/CanvasContext'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

export const HomePage = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <CanvasProvider>
        <div className="h-screen flex flex-col bg-gray-50">
          {/* <TopToolbar /> */}
          <div className="flex-1 flex overflow-hidden">
            <ElementsPanel />
            <Canvas />
            <PropertiesPanel />
          </div>
        </div>
      </CanvasProvider>
    </DndProvider>
  )
}
