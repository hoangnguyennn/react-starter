import React from 'react'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

// Components
import Canvas from './components/Canvas'
import ElementsPanel from './components/ElementsPanel'
import PropertiesPanel from './components/PropertiesPanel'
import TopToolbar from './components/TopToolbar'

/** Page Builder - Main Page */
const PageBuilderPage: React.FC = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="h-screen flex flex-col bg-gray-50">
        <TopToolbar />
        <div className="flex-1 flex overflow-hidden">
          <ElementsPanel />
          <Canvas />
          <PropertiesPanel />
        </div>
      </div>
    </DndProvider>
  )
}

export default PageBuilderPage
