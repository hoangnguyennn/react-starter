import { IElement } from '@hn/types/components'
import React, { createContext, ReactNode, useCallback, useContext, useState } from 'react'

interface CanvasContextType {
  elements: IElement[]
  selectedElement: IElement | null
  setElements: (elements: IElement[] | ((prev: IElement[]) => IElement[])) => void
  selectElement: (elementId: string | null) => void
  updateElement: (elementId: string, updates: Partial<IElement>) => void
  deleteElement: (elementId: string) => void
  moveElement: (dragIndex: number, hoverIndex: number) => void
  moveElementInLayout: (
    layoutElementId: string,
    columnIndex: number,
    dragIndex: number,
    hoverIndex: number
  ) => void
}

const CanvasContext = createContext<CanvasContextType | undefined>(undefined)

interface CanvasProviderProps {
  children: ReactNode
}

export const CanvasProvider: React.FC<CanvasProviderProps> = ({ children }) => {
  const [elements, setElementsState] = useState<IElement[]>([])
  const [selectedElementId, setSelectedElementId] = useState<string | null>(null)

  const setElements = useCallback(
    (elementsOrFn: IElement[] | ((prev: IElement[]) => IElement[])) => {
      if (typeof elementsOrFn === 'function') {
        setElementsState(elementsOrFn)
      } else {
        setElementsState(elementsOrFn)
      }
    },
    []
  )

  const selectedElement = elements.find(element => element.id === selectedElementId) || null

  const selectElement = useCallback((elementId: string | null) => {
    setSelectedElementId(elementId)
  }, [])

  const updateElement = useCallback((elementId: string, updates: Partial<IElement>) => {
    setElements(prev =>
      prev.map(element =>
        element.id === elementId ? ({ ...element, ...updates } as IElement) : element
      )
    )
  }, [])

  const deleteElement = useCallback(
    (elementId: string) => {
      setElements(prev => prev.filter(element => element.id !== elementId))
      if (selectedElementId === elementId) {
        setSelectedElementId(null)
      }
    },
    [selectedElementId]
  )

  const moveElement = useCallback((dragIndex: number, hoverIndex: number) => {
    setElements(prevElements => {
      const newElements = [...prevElements]
      const draggedElement = newElements[dragIndex]
      newElements.splice(dragIndex, 1)
      newElements.splice(hoverIndex, 0, draggedElement)
      return newElements
    })
  }, [])

  const moveElementInLayout = useCallback(
    (layoutElementId: string, columnIndex: number, dragIndex: number, hoverIndex: number) => {
      console.log('moveElementInLayout called:', {
        layoutElementId,
        columnIndex,
        dragIndex,
        hoverIndex
      })

      setElements(prevElements => {
        // Filter elements by layout and column
        const layoutChildren = prevElements.filter(
          el => el.parentId === layoutElementId && el.columnIndex === columnIndex
        )

        console.log(
          'layoutChildren before move:',
          layoutChildren.map(el => ({ id: el.id, type: el.type, orderIndex: el.orderIndex }))
        )

        if (dragIndex >= layoutChildren.length || hoverIndex >= layoutChildren.length) {
          console.log('Invalid indices:', { dragIndex, hoverIndex, length: layoutChildren.length })
          return prevElements
        }

        // Sort by orderIndex first
        const sortedChildren = layoutChildren.sort(
          (a, b) => (a.orderIndex || 0) - (b.orderIndex || 0)
        )

        // Get the dragged element
        const draggedElement = sortedChildren[dragIndex]
        console.log('draggedElement:', { id: draggedElement.id, type: draggedElement.type })

        // Remove dragged element from array
        sortedChildren.splice(dragIndex, 1)
        // Insert at new position
        sortedChildren.splice(hoverIndex, 0, draggedElement)

        console.log(
          'layoutChildren after move:',
          sortedChildren.map(el => ({ id: el.id, type: el.type }))
        )

        // Update the original elements array
        const newElements = prevElements.map(el => {
          if (el.parentId === layoutElementId && el.columnIndex === columnIndex) {
            const newIndex = sortedChildren.findIndex(child => child.id === el.id)
            const updated = { ...el, orderIndex: newIndex }
            console.log('Updated element:', {
              id: el.id,
              oldOrderIndex: el.orderIndex,
              newOrderIndex: newIndex
            })
            return updated
          }
          return el
        })

        return newElements
      })
    },
    []
  )

  const value: CanvasContextType = {
    elements,
    selectedElement,
    setElements,
    selectElement,
    updateElement,
    deleteElement,
    moveElement,
    moveElementInLayout
  }

  return <CanvasContext.Provider value={value}>{children}</CanvasContext.Provider>
}

export const useCanvas = () => {
  const context = useContext(CanvasContext)
  if (context === undefined) {
    throw new Error('useCanvas must be used within a CanvasProvider')
  }
  return context
}
