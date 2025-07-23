declare namespace PageBuilder {
  // Element types that can be added to the canvas
  export type ElementType =
    | 'text'
    | 'image'
    | 'button'
    | 'section'
    | 'columns'
    | 'grid-container'
    | 'grid-column'
    | 'divider'
    | 'spacer'
    | 'heading'
    | 'list'
    | 'video'
    | 'form'
    | 'icon'

  // Base element interface
  export interface IElement {
    id: string
    type: ElementType
    parentId?: string
    children?: string[]
    position: {
      x: number
      y: number
    }
    size: {
      width: number | string
      height: number | string
    }
    styles: {
      [key: string]: string | number
    }
    content?: unknown
    settings: {
      [key: string]: unknown
    }
    isVisible: boolean
    isLocked: boolean
    zIndex: number
  }

  // Specific element types
  export interface ITextElement extends IElement {
    type: 'text'
    content: {
      text: string
      html?: string
    }
  }

  export interface IImageElement extends IElement {
    type: 'image'
    content: {
      src: string
      alt: string
      caption?: string
    }
  }

  export interface IButtonElement extends IElement {
    type: 'button'
    content: {
      text: string
      link?: string
      target?: '_blank' | '_self'
    }
  }

  export interface ISectionElement extends IElement {
    type: 'section'
    settings: {
      padding: {
        top: number
        right: number
        bottom: number
        left: number
      }
      margin: {
        top: number
        right: number
        bottom: number
        left: number
      }
      background: {
        type: 'color' | 'image' | 'gradient'
        value: string
      }
    }
  }

  export interface IColumnsElement extends IElement {
    type: 'columns'
    settings: {
      columnCount: number
      gap: number
      distribution: 'equal' | 'custom'
      columnWidths?: number[]
    }
  }

  export interface IGridContainerElement extends IElement {
    type: 'grid-container'
    settings: {
      maxColumns: number // Tối đa 12 cột
      gap: number
      gutterX: number
      gutterY: number
      responsive: {
        [key in DeviceType]: {
          columns: number
          gap?: number
        }
      }
    }
  }

  export interface IGridColumnElement extends IElement {
    type: 'grid-column'
    settings: {
      span: {
        [key in DeviceType]: number // Số cột chiếm dụng (1-12)
      }
      offset: {
        [key in DeviceType]: number // Offset từ bên trái (0-11)
      }
      order: {
        [key in DeviceType]: number // Thứ tự hiển thị
      }
    }
  }

  // Canvas state
  export interface ICanvas {
    id: string
    name: string
    elements: { [id: string]: IElement }
    rootElements: string[] // Top-level elements
    selectedElementIds: string[]
    draggedElementId?: string
    viewport: {
      width: number
      height: number
      zoom: number
      scrollX: number
      scrollY: number
    }
    gridEnabled: boolean
    snapToGrid: boolean
    gridSize: number
  }

  // Device breakpoints for responsive design
  export type DeviceType = 'desktop' | 'tablet' | 'mobile'

  export interface IBreakpoint {
    name: DeviceType
    width: number
    height: number
    isActive: boolean
  }

  // History for undo/redo
  export interface IHistoryState {
    canvas: ICanvas
    timestamp: number
    action: string
  }

  export interface IHistory {
    states: IHistoryState[]
    currentIndex: number
    maxStates: number
  }

  // Global settings
  export interface IGlobalSettings {
    theme: {
      primaryColor: string
      secondaryColor: string
      fontFamily: string
      fontSize: number
    }
    canvas: {
      backgroundColor: string
      width: number
      height: number
    }
    responsive: {
      breakpoints: { [key in DeviceType]: IBreakpoint }
      currentDevice: DeviceType
    }
    grid: {
      enabled: boolean
      size: number
      color: string
      opacity: number
    }
  }

  // Template system
  export interface ITemplate {
    id: string
    name: string
    description: string
    thumbnail: string
    canvas: ICanvas
    category: string
    tags: string[]
    createdAt: string
    updatedAt: string
  }

  // Page builder state
  export interface IPageBuilderState {
    canvas: ICanvas
    history: IHistory
    globalSettings: IGlobalSettings
    selectedTool: string | null
    isPreviewMode: boolean
    isDragging: boolean
    clipboard: {
      elements: IElement[]
      operation: 'copy' | 'cut' | null
    }
    ui: {
      leftPanelWidth: number
      rightPanelWidth: number
      showGrid: boolean
      showRulers: boolean
      showElementBounds: boolean
    }
    templates: ITemplate[]
  }

  // Actions
  export interface IAction<T = unknown> {
    type: string
    payload: T
  }

  // Element drag and drop
  export interface IDragItem {
    type: 'element'
    elementType: ElementType
    elementId?: string
    isNew: boolean
  }

  export interface IDropTarget {
    elementId?: string
    position: 'before' | 'after' | 'inside'
    dropZone: 'canvas' | 'element'
  }
}
