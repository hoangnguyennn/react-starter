import { useCanvas } from '@hn/contexts/CanvasContext'
import { IElement } from '@hn/types/components'
import { FC } from 'react'

export const PropertiesPanel: FC = () => {
  const { selectedElement } = useCanvas()

  if (!selectedElement) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 p-4">
        <h3 className="text-lg font-semibold mb-4">Properties</h3>
        <p className="text-gray-500">Select an element to edit its properties</p>
      </div>
    )
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 p-4" data-panel="properties">
      <h3 className="text-lg font-semibold mb-4">{selectedElement.type} Element</h3>
      <div className="space-y-4">
        <RenderSettings element={selectedElement} />
      </div>
    </div>
  )
}

interface RenderSettingsProps {
  element: IElement
}

const RenderSettings: FC<RenderSettingsProps> = ({ element }) => {
  switch (element.type) {
    case 'button':
      return <ButtonSettings element={element} />
    case 'text':
      return <TextSettings element={element} />
    case 'image':
      return <ImageSettings element={element} />
    case 'divider':
      return <DividerSettings element={element} />
    case 'spacer':
      return <SpacerSettings element={element} />
    case 'input':
      return <InputSettings element={element} />
    case 'textarea':
      return <TextareaSettings element={element} />
    case 'select':
      return <SelectSettings element={element} />
    case 'checkbox':
      return <CheckboxSettings element={element} />
    case 'radio':
      return <RadioSettings element={element} />
    case 'layout':
      return <LayoutSettings element={element} />
    default:
      return <div>Unknown element type</div>
  }
}

// Helper function to safely cast settings
const getSettings = (element: IElement, type: string): any => {
  return element.settings as any
}

// Button Settings
const ButtonSettings: FC<{ element: IElement }> = ({ element }) => {
  const { updateElement } = useCanvas()

  const updateSettings = (newSettings: any) => {
    updateElement(element.id, { settings: { ...element.settings, ...newSettings } })
  }

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Text</label>
        <input
          type="text"
          value={(element.settings as any).text}
          onChange={e => updateSettings({ text: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Variant</label>
        <select
          value={(element.settings as any).variant}
          onChange={e => updateSettings({ variant: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="primary">Primary</option>
          <option value="secondary">Secondary</option>
          <option value="outline">Outline</option>
          <option value="ghost">Ghost</option>
          <option value="danger">Danger</option>
          <option value="success">Success</option>
          <option value="warning">Warning</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Size</label>
        <select
          value={(element.settings as any).size}
          onChange={e => updateSettings({ size: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="xs">Extra Small</option>
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
          <option value="xl">Extra Large</option>
        </select>
      </div>
      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={(element.settings as any).disabled}
            onChange={e => updateSettings({ disabled: e.target.checked })}
            className="mr-2"
          />
          Disabled
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={(element.settings as any).fullWidth}
            onChange={e => updateSettings({ fullWidth: e.target.checked })}
            className="mr-2"
          />
          Full Width
        </label>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Rounded</label>
        <select
          value={(element.settings as any).rounded}
          onChange={e => updateSettings({ rounded: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="none">None</option>
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
          <option value="xl">Extra Large</option>
          <option value="2xl">2XL</option>
          <option value="3xl">3XL</option>
          <option value="full">Full</option>
        </select>
      </div>
    </>
  )
}

// Text Settings
const TextSettings: FC<{ element: IElement }> = ({ element }) => {
  const { updateElement } = useCanvas()
  const settings = getSettings(element, 'text')

  const updateSettings = (newSettings: any) => {
    updateElement(element.id, { settings: { ...element.settings, ...newSettings } })
  }

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Content</label>
        <textarea
          value={settings.content}
          onChange={e => updateSettings({ content: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Element</label>
        <select
          value={settings.as}
          onChange={e => updateSettings({ as: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="p">Paragraph</option>
          <option value="span">Span</option>
          <option value="div">Div</option>
          <option value="h1">Heading 1</option>
          <option value="h2">Heading 2</option>
          <option value="h3">Heading 3</option>
          <option value="h4">Heading 4</option>
          <option value="h5">Heading 5</option>
          <option value="h6">Heading 6</option>
          <option value="label">Label</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Size</label>
        <select
          value={settings.size}
          onChange={e => updateSettings({ size: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="xs">Extra Small</option>
          <option value="sm">Small</option>
          <option value="base">Base</option>
          <option value="lg">Large</option>
          <option value="xl">Extra Large</option>
          <option value="2xl">2XL</option>
          <option value="3xl">3XL</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Weight</label>
        <select
          value={settings.weight}
          onChange={e => updateSettings({ weight: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="thin">Thin</option>
          <option value="light">Light</option>
          <option value="normal">Normal</option>
          <option value="medium">Medium</option>
          <option value="semibold">Semibold</option>
          <option value="bold">Bold</option>
          <option value="extrabold">Extrabold</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Color</label>
        <select
          value={settings.color}
          onChange={e => updateSettings({ color: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="inherit">Inherit</option>
          <option value="black">Black</option>
          <option value="gray">Gray</option>
          <option value="red">Red</option>
          <option value="green">Green</option>
          <option value="blue">Blue</option>
          <option value="purple">Purple</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Alignment</label>
        <select
          value={settings.align}
          onChange={e => updateSettings({ align: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="left">Left</option>
          <option value="center">Center</option>
          <option value="right">Right</option>
          <option value="justify">Justify</option>
        </select>
      </div>
      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.truncate}
            onChange={e => updateSettings({ truncate: e.target.checked })}
            className="mr-2"
          />
          Truncate
        </label>
      </div>
    </>
  )
}

// Input Settings
const InputSettings: FC<{ element: IElement }> = ({ element }) => {
  const { updateElement } = useCanvas()

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Type</label>
        <select
          value={element.settings.type}
          onChange={e => updateElement(element.id, { ...element.settings, type: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="text">Text</option>
          <option value="email">Email</option>
          <option value="password">Password</option>
          <option value="number">Number</option>
          <option value="tel">Telephone</option>
          <option value="url">URL</option>
          <option value="search">Search</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Placeholder</label>
        <input
          type="text"
          value={element.settings.placeholder}
          onChange={e =>
            updateElement(element.id, { ...element.settings, placeholder: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Value</label>
        <input
          type="text"
          value={element.settings.value}
          onChange={e => updateElement(element.id, { ...element.settings, value: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Size</label>
        <select
          value={element.settings.size}
          onChange={e => updateElement(element.id, { ...element.settings, size: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="xs">Extra Small</option>
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
          <option value="xl">Extra Large</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Variant</label>
        <select
          value={element.settings.variant}
          onChange={e =>
            updateElement(element.id, { ...element.settings, variant: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="outline">Outline</option>
          <option value="filled">Filled</option>
          <option value="flushed">Flushed</option>
          <option value="unstyled">Unstyled</option>
        </select>
      </div>
      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={element.settings.disabled}
            onChange={e =>
              updateElement(element.id, { ...element.settings, disabled: e.target.checked })
            }
            className="mr-2"
          />
          Disabled
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={element.settings.fullWidth}
            onChange={e =>
              updateElement(element.id, { ...element.settings, fullWidth: e.target.checked })
            }
            className="mr-2"
          />
          Full Width
        </label>
      </div>
    </>
  )
}

// Textarea Settings
const TextareaSettings: FC<{ element: IElement }> = ({ element }) => {
  const { updateElement } = useCanvas()

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Placeholder</label>
        <input
          type="text"
          value={element.settings.placeholder}
          onChange={e =>
            updateElement(element.id, { ...element.settings, placeholder: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Value</label>
        <textarea
          value={element.settings.value}
          onChange={e => updateElement(element.id, { ...element.settings, value: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          rows={3}
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Rows</label>
        <input
          type="number"
          value={element.settings.rows}
          onChange={e =>
            updateElement(element.id, { ...element.settings, rows: parseInt(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
          min={1}
          max={20}
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Resize</label>
        <select
          value={element.settings.resize}
          onChange={e => updateElement(element.id, { ...element.settings, resize: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="none">None</option>
          <option value="vertical">Vertical</option>
          <option value="horizontal">Horizontal</option>
          <option value="both">Both</option>
        </select>
      </div>
    </>
  )
}

// Select Settings
const SelectSettings: FC<{ element: IElement }> = ({ element }) => {
  const { updateElement } = useCanvas()

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Placeholder</label>
        <input
          type="text"
          value={element.settings.placeholder}
          onChange={e =>
            updateElement(element.id, { ...element.settings, placeholder: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Value</label>
        <input
          type="text"
          value={element.settings.value}
          onChange={e => updateElement(element.id, { ...element.settings, value: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Size</label>
        <select
          value={element.settings.size}
          onChange={e => updateElement(element.id, { ...element.settings, size: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="xs">Extra Small</option>
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
          <option value="xl">Extra Large</option>
        </select>
      </div>
      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={element.settings.multiple}
            onChange={e =>
              updateElement(element.id, { ...element.settings, multiple: e.target.checked })
            }
            className="mr-2"
          />
          Multiple
        </label>
      </div>
    </>
  )
}

// Checkbox Settings
const CheckboxSettings: FC<{ element: IElement }> = ({ element }) => {
  const { updateElement } = useCanvas()
  const settings = getSettings(element, 'checkbox')

  const updateSettings = (newSettings: any) => {
    updateElement(element.id, { settings: { ...element.settings, ...newSettings } })
  }

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Label</label>
        <input
          type="text"
          value={settings.label}
          onChange={e => updateSettings({ label: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.checked}
            onChange={e => updateSettings({ checked: e.target.checked })}
            className="mr-2"
          />
          Checked
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.disabled}
            onChange={e => updateSettings({ disabled: e.target.checked })}
            className="mr-2"
          />
          Disabled
        </label>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Size</label>
        <select
          value={settings.size}
          onChange={e => updateSettings({ size: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="xs">Extra Small</option>
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
          <option value="xl">Extra Large</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Variant</label>
        <select
          value={settings.variant}
          onChange={e => updateSettings({ variant: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="default">Default</option>
          <option value="filled">Filled</option>
          <option value="outline">Outline</option>
        </select>
      </div>
    </>
  )
}

// Radio Settings
const RadioSettings: FC<{ element: IElement }> = ({ element }) => {
  const { updateElement } = useCanvas()
  const settings = getSettings(element, 'radio')

  const updateSettings = (newSettings: any) => {
    updateElement(element.id, { settings: { ...element.settings, ...newSettings } })
  }

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Label</label>
        <input
          type="text"
          value={settings.label}
          onChange={e => updateSettings({ label: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Name</label>
        <input
          type="text"
          value={settings.name}
          onChange={e => updateSettings({ name: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Value</label>
        <input
          type="text"
          value={settings.value}
          onChange={e => updateSettings({ value: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.checked}
            onChange={e => updateSettings({ checked: e.target.checked })}
            className="mr-2"
          />
          Checked
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.disabled}
            onChange={e => updateSettings({ disabled: e.target.checked })}
            className="mr-2"
          />
          Disabled
        </label>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Size</label>
        <select
          value={settings.size}
          onChange={e => updateSettings({ size: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="xs">Extra Small</option>
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
          <option value="xl">Extra Large</option>
        </select>
      </div>
    </>
  )
}

// Layout Settings
const LayoutSettings: FC<{ element: IElement }> = ({ element }) => {
  const { updateElement } = useCanvas()
  const settings = getSettings(element, 'layout')

  const updateSettings = (newSettings: any) => {
    updateElement(element.id, { settings: { ...element.settings, ...newSettings } })
  }

  const updateColumn = (columnIndex: number, newSpan: number) => {
    const newColumns = [...(settings.columns || [])]
    if (newColumns[columnIndex]) {
      newColumns[columnIndex] = { ...newColumns[columnIndex], span: newSpan as any }
      updateSettings({ columns: newColumns })
    }
  }

  const addColumn = () => {
    const newColumns = [
      ...(settings.columns || []),
      {
        id: `col-${Date.now()}`,
        span: 1 as const
      }
    ]
    updateSettings({ columns: newColumns, cols: newColumns.length })
  }

  const removeColumn = (columnIndex: number) => {
    const newColumns = settings.columns?.filter((_, index) => index !== columnIndex) || []
    updateSettings({ columns: newColumns, cols: newColumns.length })
  }

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Columns</label>
        <select
          value={settings.cols}
          onChange={e => updateSettings({ cols: parseInt(e.target.value) })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(num => (
            <option key={num} value={num}>
              {num} Column{num > 1 ? 's' : ''}
            </option>
          ))}
        </select>
      </div>

      {settings.columns && settings.columns.length > 0 && (
        <div className="space-y-2">
          <label className="block text-sm font-medium">Column Spans</label>
          <div className="space-y-2">
            {settings.columns.map((column, index) => (
              <div key={column.id} className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Column {index + 1}:</span>
                <select
                  value={column.span}
                  onChange={e => updateColumn(index, parseInt(e.target.value))}
                  className="flex-1 px-2 py-1 border border-gray-300 rounded text-sm"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(span => (
                    <option key={span} value={span}>
                      span-{span}
                    </option>
                  ))}
                </select>
                <button
                  onClick={() => removeColumn(index)}
                  className="px-2 py-1 text-red-600 hover:text-red-800 text-sm"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
          <button
            onClick={addColumn}
            className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md hover:bg-gray-50"
          >
            + Add Column
          </button>
        </div>
      )}

      <div className="space-y-2">
        <label className="block text-sm font-medium">Gap</label>
        <select
          value={settings.gap}
          onChange={e => updateSettings({ gap: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="none">None</option>
          <option value="xs">Extra Small</option>
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
          <option value="xl">Extra Large</option>
          <option value="2xl">2XL</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Direction</label>
        <select
          value={settings.direction}
          onChange={e => updateSettings({ direction: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="row">Row</option>
          <option value="col">Column</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Align</label>
        <select
          value={settings.align}
          onChange={e => updateSettings({ align: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="start">Start</option>
          <option value="center">Center</option>
          <option value="end">End</option>
          <option value="stretch">Stretch</option>
        </select>
      </div>

      <div className="space-y-2">
        <label className="block text-sm font-medium">Justify</label>
        <select
          value={settings.justify}
          onChange={e => updateSettings({ justify: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="start">Start</option>
          <option value="center">Center</option>
          <option value="end">End</option>
          <option value="between">Between</option>
          <option value="around">Around</option>
          <option value="evenly">Evenly</option>
        </select>
      </div>

      <div className="flex items-center space-x-4">
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.fullWidth}
            onChange={e => updateSettings({ fullWidth: e.target.checked })}
            className="mr-2"
          />
          Full Width
        </label>
        <label className="flex items-center">
          <input
            type="checkbox"
            checked={settings.fullHeight}
            onChange={e => updateSettings({ fullHeight: e.target.checked })}
            className="mr-2"
          />
          Full Height
        </label>
      </div>
    </>
  )
}

// Image Settings
const ImageSettings: FC<{ element: IElement }> = ({ element }) => {
  const { updateElement } = useCanvas()

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Source URL</label>
        <input
          type="text"
          value={element.settings.src}
          onChange={e => updateElement(element.id, { ...element.settings, src: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Alt Text</label>
        <input
          type="text"
          value={element.settings.alt}
          onChange={e => updateElement(element.id, { ...element.settings, alt: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Width</label>
        <input
          type="number"
          value={element.settings.width}
          onChange={e =>
            updateElement(element.id, { ...element.settings, width: parseInt(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Height</label>
        <input
          type="number"
          value={element.settings.height}
          onChange={e =>
            updateElement(element.id, { ...element.settings, height: parseInt(e.target.value) })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
    </>
  )
}

// Divider Settings
const DividerSettings: FC<{ element: IElement }> = ({ element }) => {
  const { updateElement } = useCanvas()

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Orientation</label>
        <select
          value={element.settings.orientation}
          onChange={e =>
            updateElement(element.id, { ...element.settings, orientation: e.target.value })
          }
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="horizontal">Horizontal</option>
          <option value="vertical">Vertical</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Size</label>
        <select
          value={element.settings.size}
          onChange={e => updateElement(element.id, { ...element.settings, size: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="xs">Extra Small</option>
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
          <option value="xl">Extra Large</option>
        </select>
      </div>
    </>
  )
}

// Spacer Settings
const SpacerSettings: FC<{ element: IElement }> = ({ element }) => {
  const { updateElement } = useCanvas()

  return (
    <>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Size</label>
        <select
          value={element.settings.size}
          onChange={e => updateElement(element.id, { ...element.settings, size: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="xs">Extra Small</option>
          <option value="sm">Small</option>
          <option value="md">Medium</option>
          <option value="lg">Large</option>
          <option value="xl">Extra Large</option>
        </select>
      </div>
      <div className="space-y-2">
        <label className="block text-sm font-medium">Axis</label>
        <select
          value={element.settings.axis}
          onChange={e => updateElement(element.id, { ...element.settings, axis: e.target.value })}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        >
          <option value="vertical">Vertical</option>
          <option value="horizontal">Horizontal</option>
        </select>
      </div>
    </>
  )
}
