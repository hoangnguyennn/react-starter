import GenerateUtil from '@hn/utils/generate'
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit'

const initialCanvas: PageBuilder.ICanvas = {
  id: GenerateUtil.generateId(),
  name: 'Untitled Canvas',
  elements: {},
  rootElements: [],
  selectedElementIds: [],
  viewport: {
    width: 1200,
    height: 800,
    zoom: 1,
    scrollX: 0,
    scrollY: 0
  },
  gridEnabled: true,
  snapToGrid: true,
  gridSize: 10
}

const initialGlobalSettings: PageBuilder.IGlobalSettings = {
  theme: {
    primaryColor: '#007cba',
    secondaryColor: '#666666',
    fontFamily: 'Arial, sans-serif',
    fontSize: 14
  },
  canvas: {
    backgroundColor: '#ffffff',
    width: 1200,
    height: 800
  },
  responsive: {
    breakpoints: {
      desktop: { name: 'desktop', width: 1200, height: 800, isActive: true },
      tablet: { name: 'tablet', width: 768, height: 1024, isActive: false },
      mobile: { name: 'mobile', width: 375, height: 667, isActive: false }
    },
    currentDevice: 'desktop'
  },
  grid: {
    enabled: true,
    size: 10,
    color: '#e0e0e0',
    opacity: 0.5
  }
}

const initialHistory: PageBuilder.IHistory = {
  states: [],
  currentIndex: -1,
  maxStates: 50
}

const initialState: PageBuilder.IPageBuilderState = {
  canvas: initialCanvas,
  history: initialHistory,
  globalSettings: initialGlobalSettings,
  selectedTool: null,
  isPreviewMode: false,
  isDragging: false,
  clipboard: {
    elements: [],
    operation: null
  },
  ui: {
    leftPanelWidth: 300,
    rightPanelWidth: 300,
    showGrid: true,
    showRulers: true,
    showElementBounds: false
  },
  templates: []
}

const pageBuilderSlice = createSlice({
  name: 'pageBuilder',
  initialState,
  reducers: {
    // Canvas operations
    addElement: (
      state,
      action: PayloadAction<{ element: PageBuilder.IElement; parentId?: string }>
    ) => {
      const { element, parentId } = action.payload
      state.canvas.elements[element.id] = element

      if (parentId && state.canvas.elements[parentId]) {
        if (!state.canvas.elements[parentId].children) {
          state.canvas.elements[parentId].children = []
        }
        state.canvas.elements[parentId].children!.push(element.id)
        element.parentId = parentId
      } else {
        state.canvas.rootElements.push(element.id)
      }
    },

    removeElement: (state, action: PayloadAction<string>) => {
      const elementId = action.payload
      const element = state.canvas.elements[elementId]

      if (!element) return

      // Remove from parent's children or root elements
      if (element.parentId && state.canvas.elements[element.parentId]) {
        const parent = state.canvas.elements[element.parentId]
        if (parent.children) {
          parent.children = parent.children.filter(id => id !== elementId)
        }
      } else {
        state.canvas.rootElements = state.canvas.rootElements.filter(id => id !== elementId)
      }

      // Remove element and its children recursively
      const removeRecursive = (id: string) => {
        const el = state.canvas.elements[id]
        if (el && el.children) {
          el.children.forEach(removeRecursive)
        }
        delete state.canvas.elements[id]
      }

      removeRecursive(elementId)

      // Remove from selection
      state.canvas.selectedElementIds = state.canvas.selectedElementIds.filter(
        id => id !== elementId
      )
    },

    updateElement: (
      state,
      action: PayloadAction<{ id: string; updates: Partial<PageBuilder.IElement> }>
    ) => {
      const { id, updates } = action.payload
      if (state.canvas.elements[id]) {
        Object.assign(state.canvas.elements[id], updates)
      }
    },

    moveElement: (
      state,
      action: PayloadAction<{ elementId: string; newPosition: { x: number; y: number } }>
    ) => {
      const { elementId, newPosition } = action.payload
      if (state.canvas.elements[elementId]) {
        state.canvas.elements[elementId].position = newPosition
      }
    },

    resizeElement: (
      state,
      action: PayloadAction<{
        elementId: string
        newSize: { width: number | string; height: number | string }
      }>
    ) => {
      const { elementId, newSize } = action.payload
      if (state.canvas.elements[elementId]) {
        state.canvas.elements[elementId].size = newSize
      }
    },

    // Selection operations
    selectElement: (state, action: PayloadAction<string>) => {
      state.canvas.selectedElementIds = [action.payload]
    },

    selectMultipleElements: (state, action: PayloadAction<string[]>) => {
      state.canvas.selectedElementIds = action.payload
    },

    clearSelection: state => {
      state.canvas.selectedElementIds = []
    },

    toggleElementSelection: (state, action: PayloadAction<string>) => {
      const elementId = action.payload
      const index = state.canvas.selectedElementIds.indexOf(elementId)

      if (index > -1) {
        state.canvas.selectedElementIds.splice(index, 1)
      } else {
        state.canvas.selectedElementIds.push(elementId)
      }
    },

    // Drag and drop
    setDraggedElement: (state, action: PayloadAction<string | undefined>) => {
      state.canvas.draggedElementId = action.payload
      state.isDragging = !!action.payload
    },

    // Canvas operations
    setCanvasViewport: (state, action: PayloadAction<Partial<PageBuilder.ICanvas['viewport']>>) => {
      Object.assign(state.canvas.viewport, action.payload)
    },

    setCanvasName: (state, action: PayloadAction<string>) => {
      state.canvas.name = action.payload
    },

    // Global settings
    updateGlobalSettings: (state, action: PayloadAction<Partial<PageBuilder.IGlobalSettings>>) => {
      Object.assign(state.globalSettings, action.payload)
    },

    setCurrentDevice: (state, action: PayloadAction<PageBuilder.DeviceType>) => {
      state.globalSettings.responsive.currentDevice = action.payload
      Object.keys(state.globalSettings.responsive.breakpoints).forEach(device => {
        state.globalSettings.responsive.breakpoints[device as PageBuilder.DeviceType].isActive =
          device === action.payload
      })
    },

    // History operations
    saveToHistory: (state, action: PayloadAction<string>) => {
      const historyState: PageBuilder.IHistoryState = {
        canvas: JSON.parse(JSON.stringify(state.canvas)),
        timestamp: Date.now(),
        action: action.payload
      }

      // Remove states after current index
      state.history.states = state.history.states.slice(0, state.history.currentIndex + 1)

      // Add new state
      state.history.states.push(historyState)
      state.history.currentIndex = state.history.states.length - 1

      // Keep only maxStates
      if (state.history.states.length > state.history.maxStates) {
        state.history.states.shift()
        state.history.currentIndex--
      }
    },

    undo: state => {
      if (state.history.currentIndex > 0) {
        state.history.currentIndex--
        state.canvas = JSON.parse(
          JSON.stringify(state.history.states[state.history.currentIndex].canvas)
        )
      }
    },

    redo: state => {
      if (state.history.currentIndex < state.history.states.length - 1) {
        state.history.currentIndex++
        state.canvas = JSON.parse(
          JSON.stringify(state.history.states[state.history.currentIndex].canvas)
        )
      }
    },

    // UI operations
    setSelectedTool: (state, action: PayloadAction<string | null>) => {
      state.selectedTool = action.payload
    },

    setPreviewMode: (state, action: PayloadAction<boolean>) => {
      state.isPreviewMode = action.payload
    },

    updateUISettings: (
      state,
      action: PayloadAction<Partial<PageBuilder.IPageBuilderState['ui']>>
    ) => {
      Object.assign(state.ui, action.payload)
    },

    // Clipboard operations
    copyElements: (state, action: PayloadAction<string[]>) => {
      const elements = action.payload.map(id => state.canvas.elements[id]).filter(Boolean)
      state.clipboard = {
        elements: JSON.parse(JSON.stringify(elements)),
        operation: 'copy'
      }
    },

    cutElements: (state, action: PayloadAction<string[]>) => {
      const elements = action.payload.map(id => state.canvas.elements[id]).filter(Boolean)
      state.clipboard = {
        elements: JSON.parse(JSON.stringify(elements)),
        operation: 'cut'
      }

      // Remove elements from canvas
      action.payload.forEach(id => {
        pageBuilderSlice.caseReducers.removeElement(state, { type: 'removeElement', payload: id })
      })
    },

    pasteElements: (state, action: PayloadAction<{ position?: { x: number; y: number } }>) => {
      const { position } = action.payload

      if (state.clipboard.elements.length === 0) return

      const newElements = state.clipboard.elements.map((element, index) => {
        const newElement = JSON.parse(JSON.stringify(element))
        newElement.id = GenerateUtil.generateId()

        if (position) {
          newElement.position = {
            x: position.x + index * 10,
            y: position.y + index * 10
          }
        }

        return newElement
      })

      newElements.forEach(element => {
        pageBuilderSlice.caseReducers.addElement(state, {
          type: 'addElement',
          payload: { element }
        })
      })

      // Clear clipboard if it was a cut operation
      if (state.clipboard.operation === 'cut') {
        state.clipboard = { elements: [], operation: null }
      }
    },

    // Template operations
    saveAsTemplate: (
      state,
      action: PayloadAction<{ name: string; description: string; category: string; tags: string[] }>
    ) => {
      const template: PageBuilder.ITemplate = {
        id: GenerateUtil.generateId(),
        name: action.payload.name,
        description: action.payload.description,
        thumbnail: '', // TODO: Generate thumbnail
        canvas: JSON.parse(JSON.stringify(state.canvas)),
        category: action.payload.category,
        tags: action.payload.tags,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
      }

      state.templates.push(template)
    },

    loadTemplate: (state, action: PayloadAction<string>) => {
      const template = state.templates.find(t => t.id === action.payload)
      if (template) {
        state.canvas = JSON.parse(JSON.stringify(template.canvas))
        state.canvas.id = GenerateUtil.generateId()
      }
    },

    deleteTemplate: (state, action: PayloadAction<string>) => {
      state.templates = state.templates.filter(t => t.id !== action.payload)
    }
  }
})

// Actions
export const {
  addElement,
  removeElement,
  updateElement,
  moveElement,
  resizeElement,
  selectElement,
  selectMultipleElements,
  clearSelection,
  toggleElementSelection,
  setDraggedElement,
  setCanvasViewport,
  setCanvasName,
  updateGlobalSettings,
  setCurrentDevice,
  saveToHistory,
  undo,
  redo,
  setSelectedTool,
  setPreviewMode,
  updateUISettings,
  copyElements,
  cutElements,
  pasteElements,
  saveAsTemplate,
  loadTemplate,
  deleteTemplate
} = pageBuilderSlice.actions

// Selectors
const pageBuilderState = (state: Store.IRootState) => state.pageBuilder

const _createSelector = <T>(combiner: (state: PageBuilder.IPageBuilderState) => T) => {
  return createSelector(pageBuilderState, combiner)
}

export const getCanvas = () => _createSelector(state => state.canvas)
export const getElements = () => _createSelector(state => state.canvas.elements)
export const getRootElements = () => _createSelector(state => state.canvas.rootElements)
export const getSelectedElements = () =>
  _createSelector(state =>
    state.canvas.selectedElementIds.map(id => state.canvas.elements[id]).filter(Boolean)
  )
export const getSelectedElementIds = () => _createSelector(state => state.canvas.selectedElementIds)
export const getCurrentDevice = () =>
  _createSelector(state => state.globalSettings.responsive.currentDevice)
export const getGlobalSettings = () => _createSelector(state => state.globalSettings)
export const getHistory = () => _createSelector(state => state.history)
export const getCanUndo = () => _createSelector(state => state.history.currentIndex > 0)
export const getCanRedo = () =>
  _createSelector(state => state.history.currentIndex < state.history.states.length - 1)
export const getIsPreviewMode = () => _createSelector(state => state.isPreviewMode)
export const getIsDragging = () => _createSelector(state => state.isDragging)
export const getUISettings = () => _createSelector(state => state.ui)
export const getTemplates = () => _createSelector(state => state.templates)

export default pageBuilderSlice.reducer
