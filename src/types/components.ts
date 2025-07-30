import { ReactNode } from 'react'

// Base Component Types
export type ButtonVariant =
  | 'primary'
  | 'secondary'
  | 'outline'
  | 'ghost'
  | 'danger'
  | 'success'
  | 'warning'
export type ButtonSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type ButtonRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'

export type TextSize =
  | 'xs'
  | 'sm'
  | 'base'
  | 'lg'
  | 'xl'
  | '2xl'
  | '3xl'
  | '4xl'
  | '5xl'
  | '6xl'
  | '7xl'
  | '8xl'
  | '9xl'
export type TextWeight =
  | 'thin'
  | 'extralight'
  | 'light'
  | 'normal'
  | 'medium'
  | 'semibold'
  | 'bold'
  | 'extrabold'
  | 'black'
export type TextColor =
  | 'inherit'
  | 'current'
  | 'transparent'
  | 'black'
  | 'white'
  | 'gray'
  | 'red'
  | 'orange'
  | 'yellow'
  | 'green'
  | 'blue'
  | 'indigo'
  | 'purple'
  | 'pink'
export type TextAlign = 'left' | 'center' | 'right' | 'justify'
export type TextElement = 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label'

export type ImageObjectFit = 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
export type ImageRounded = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
export type ImageShadow = 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type ImageLoading = 'lazy' | 'eager'

export type DividerOrientation = 'horizontal' | 'vertical'
export type DividerColor =
  | 'gray'
  | 'blue'
  | 'red'
  | 'green'
  | 'yellow'
  | 'purple'
  | 'pink'
  | 'indigo'
export type DividerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type DividerSpacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export type SpacerSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
export type SpacerAxis = 'horizontal' | 'vertical' | 'both'

// Component Settings Types
export interface ButtonSettings {
  variant: ButtonVariant
  size: ButtonSize
  disabled: boolean
  loading: boolean
  fullWidth: boolean
  rounded: ButtonRounded
  text: string
}

export interface TextSettings {
  as: TextElement
  size: TextSize
  weight: TextWeight
  color: TextColor
  align: TextAlign
  truncate: boolean
  noWrap: boolean
  breakWords: boolean
  breakAll: boolean
  content: string
}

export interface ImageSettings {
  src: string
  alt: string
  width?: number | string
  height?: number | string
  objectFit: ImageObjectFit
  rounded: ImageRounded
  shadow: ImageShadow
  loading: ImageLoading
}

export interface DividerSettings {
  orientation: DividerOrientation
  color: DividerColor
  size: DividerSize
  spacing: DividerSpacing
  dashed: boolean
  dotted: boolean
}

export interface SpacerSettings {
  size: SpacerSize
  axis: SpacerAxis
  inline: boolean
}

// Form Elements
export type InputSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type InputVariant = 'outline' | 'filled' | 'flushed' | 'unstyled'
export type InputType = 'text' | 'email' | 'password' | 'number' | 'tel' | 'url' | 'search'

export type TextareaSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type TextareaVariant = 'outline' | 'filled' | 'flushed' | 'unstyled'

export type SelectSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type SelectVariant = 'outline' | 'filled' | 'flushed' | 'unstyled'

export type CheckboxSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type CheckboxVariant = 'default' | 'filled' | 'outline'

export type RadioSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl'
export type RadioVariant = 'default' | 'filled' | 'outline'

// Layout Elements
export type LayoutCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type LayoutGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type LayoutDirection = 'row' | 'col'
export type LayoutAlign = 'start' | 'center' | 'end' | 'stretch'
export type LayoutJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

// Settings for Form Elements
export interface InputSettings {
  type: InputType
  placeholder: string
  value: string
  disabled: boolean
  readonly: boolean
  required: boolean
  size: InputSize
  variant: InputVariant
  fullWidth: boolean
  rounded: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
}

export interface TextareaSettings {
  placeholder: string
  value: string
  rows: number
  cols?: number
  disabled: boolean
  readonly: boolean
  required: boolean
  size: TextareaSize
  variant: TextareaVariant
  fullWidth: boolean
  rounded: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  resize: 'none' | 'vertical' | 'horizontal' | 'both'
}

export interface SelectSettings {
  options: Array<{ value: string; label: string; disabled?: boolean }>
  value: string
  placeholder: string
  disabled: boolean
  required: boolean
  size: SelectSize
  variant: SelectVariant
  fullWidth: boolean
  rounded: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  multiple: boolean
}

export interface CheckboxSettings {
  checked: boolean
  disabled: boolean
  required: boolean
  size: CheckboxSize
  variant: CheckboxVariant
  rounded: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
  label: string
}

export interface RadioSettings {
  checked: boolean
  disabled: boolean
  required: boolean
  name: string
  value: string
  size: RadioSize
  variant: RadioVariant
  label: string
}

export interface LayoutSettings {
  cols: LayoutCols
  columns?: Array<{
    id: string
    span: LayoutCols
  }>
  gap: LayoutGap
  direction: LayoutDirection
  align: LayoutAlign
  justify: LayoutJustify
  fullWidth: boolean
  fullHeight: boolean
  children: string[] // IDs of child elements
}

// Element Types
export type ElementType =
  | 'button'
  | 'text'
  | 'image'
  | 'divider'
  | 'spacer'
  | 'input'
  | 'textarea'
  | 'select'
  | 'checkbox'
  | 'radio'
  | 'layout'

export interface BaseElement {
  id: string
  type: ElementType
  parentId?: string
  columnIndex?: number
  orderIndex?: number // Thứ tự trong column của Layout
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
  settings:
    | ButtonSettings
    | TextSettings
    | ImageSettings
    | DividerSettings
    | SpacerSettings
    | InputSettings
    | TextareaSettings
    | SelectSettings
    | CheckboxSettings
    | RadioSettings
    | LayoutSettings
  isVisible: boolean
  isLocked: boolean
  zIndex: number
}

export interface ButtonElement extends BaseElement {
  type: 'button'
  settings: ButtonSettings
}

export interface TextElementData extends BaseElement {
  type: 'text'
  settings: TextSettings
}

export interface ImageElement extends BaseElement {
  type: 'image'
  settings: ImageSettings
}

export interface DividerElement extends BaseElement {
  type: 'divider'
  settings: DividerSettings
}

export interface SpacerElement extends BaseElement {
  type: 'spacer'
  settings: SpacerSettings
}

export interface InputElement extends BaseElement {
  type: 'input'
  settings: InputSettings
}

export interface TextareaElement extends BaseElement {
  type: 'textarea'
  settings: TextareaSettings
}

export interface SelectElement extends BaseElement {
  type: 'select'
  settings: SelectSettings
}

export interface CheckboxElement extends BaseElement {
  type: 'checkbox'
  settings: CheckboxSettings
}

export interface RadioElement extends BaseElement {
  type: 'radio'
  settings: RadioSettings
}

export interface LayoutElement extends BaseElement {
  type: 'layout'
  settings: LayoutSettings
}

export type IElement =
  | ButtonElement
  | TextElementData
  | ImageElement
  | DividerElement
  | SpacerElement
  | InputElement
  | TextareaElement
  | SelectElement
  | CheckboxElement
  | RadioElement
  | LayoutElement

// Drag and Drop Types
export interface IDragItem {
  type: 'element'
  elementType: ElementType
  elementId?: string
  isNew: boolean
}

export interface ICanvasDragItem {
  type: 'canvas-element'
  elementId: string
  index: number
}

// Component Props Types
export interface DraggableElementProps {
  type: ElementType
  label: string
}

export interface CanvasElementProps {
  element: IElement
  index: number
  moveElement: (dragIndex: number, hoverIndex: number) => void
  onSelect: (elementId: string) => void
}

export interface ElementContentProps {
  element: IElement
  onLayoutDrop?: (item: IDragItem, columnIndex: number) => void
  columnChildren?: ReactNode[]
}
