import {
  getGlobalSettings,
  getSelectedElements,
  updateElement
} from '@hn/store/reducers/pageBuilder.reducer'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const PropertiesPanel: React.FC = () => {
  const dispatch = useDispatch()
  const selectedElements = useSelector(getSelectedElements())
  const globalSettings = useSelector(getGlobalSettings())

  const selectedElement = selectedElements[0] // Lấy element đầu tiên được select

  if (!selectedElement) {
    return (
      <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <h3 className="text-lg font-semibold text-slate-800 mb-1">Properties</h3>
          <small className="text-gray-600 text-sm">Select an element to edit properties</small>
        </div>
        <div className="p-4">
          <div className="text-center text-gray-500 italic py-10">No element selected</div>
        </div>
      </div>
    )
  }

  const handleStyleChange = (property: string, value: string | number) => {
    dispatch(
      updateElement({
        id: selectedElement.id,
        updates: {
          styles: {
            ...selectedElement.styles,
            [property]: value
          }
        }
      })
    )
  }

  const handleContentChange = (property: string, value: string) => {
    const currentContent = (selectedElement.content as Record<string, unknown>) || {}
    dispatch(
      updateElement({
        id: selectedElement.id,
        updates: {
          content: {
            ...currentContent,
            [property]: value
          }
        }
      })
    )
  }

  const handlePositionChange = (property: 'x' | 'y', value: number) => {
    dispatch(
      updateElement({
        id: selectedElement.id,
        updates: {
          position: {
            ...selectedElement.position,
            [property]: value
          }
        }
      })
    )
  }

  const handleSizeChange = (property: 'width' | 'height', value: string | number) => {
    dispatch(
      updateElement({
        id: selectedElement.id,
        updates: {
          size: {
            ...selectedElement.size,
            [property]: value
          }
        }
      })
    )
  }

  return (
    <div className="w-80 bg-white border-l border-gray-200 overflow-y-auto">
      <div className="p-4 border-b border-gray-200 bg-gray-50">
        <h3 className="text-lg font-semibold text-slate-800 mb-1">Properties</h3>
        <small className="text-gray-600 text-sm">{selectedElement.type} element</small>
      </div>
      <div className="p-4 space-y-6">
        {/* Position & Size */}
        <PropertySection title="Position & Size">
          <PropertyRow label="X">
            <input
              type="number"
              value={selectedElement.position.x}
              onChange={e => handlePositionChange('x', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </PropertyRow>
          <PropertyRow label="Y">
            <input
              type="number"
              value={selectedElement.position.y}
              onChange={e => handlePositionChange('y', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
          </PropertyRow>
          <PropertyRow label="Width">
            <input
              type="text"
              value={selectedElement.size.width.toString()}
              onChange={e => handleSizeChange('width', e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="e.g. 100px, 50%, auto"
            />
          </PropertyRow>
          <PropertyRow label="Height">
            <input
              type="text"
              value={selectedElement.size.height.toString()}
              onChange={e => handleSizeChange('height', e.target.value)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              placeholder="e.g. 100px, 50%, auto"
            />
          </PropertyRow>
        </PropertySection>

        {/* Content Properties */}
        {selectedElement.type === 'text' && (
          <PropertySection title="Content">
            <PropertyRow label="Text">
              <textarea
                value={((selectedElement.content as Record<string, unknown>)?.text as string) || ''}
                onChange={e => handleContentChange('text', e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 resize-vertical"
                rows={3}
              />
            </PropertyRow>
          </PropertySection>
        )}

        {selectedElement.type === 'image' && (
          <PropertySection title="Content">
            <PropertyRow label="Image URL">
              <input
                type="url"
                value={((selectedElement.content as Record<string, unknown>)?.src as string) || ''}
                onChange={e => handleContentChange('src', e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="https://example.com/image.jpg"
              />
            </PropertyRow>
            <PropertyRow label="Alt Text">
              <input
                type="text"
                value={((selectedElement.content as Record<string, unknown>)?.alt as string) || ''}
                onChange={e => handleContentChange('alt', e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Image description"
              />
            </PropertyRow>
          </PropertySection>
        )}

        {selectedElement.type === 'button' && (
          <PropertySection title="Content">
            <PropertyRow label="Button Text">
              <input
                type="text"
                value={((selectedElement.content as Record<string, unknown>)?.text as string) || ''}
                onChange={e => handleContentChange('text', e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="Button text"
              />
            </PropertyRow>
            <PropertyRow label="Link URL">
              <input
                type="url"
                value={((selectedElement.content as Record<string, unknown>)?.link as string) || ''}
                onChange={e => handleContentChange('link', e.target.value)}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                placeholder="https://example.com"
              />
            </PropertyRow>
          </PropertySection>
        )}

        {/* Grid Container Properties */}
        {selectedElement.type === 'grid-container' && (
          <PropertySection title="Grid Settings">
            <PropertyRow label="Max Columns">
              <input
                type="number"
                value={
                  ((selectedElement.settings as Record<string, unknown>)?.maxColumns as number) ||
                  12
                }
                onChange={e => {
                  const currentSettings =
                    (selectedElement.settings as Record<string, unknown>) || {}
                  dispatch(
                    updateElement({
                      id: selectedElement.id,
                      updates: {
                        settings: {
                          ...currentSettings,
                          maxColumns: parseInt(e.target.value) || 12
                        }
                      }
                    })
                  )
                }}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                min="1"
                max="12"
              />
            </PropertyRow>
            <PropertyRow label="Gap">
              <input
                type="number"
                value={((selectedElement.settings as Record<string, unknown>)?.gap as number) || 16}
                onChange={e => {
                  const currentSettings =
                    (selectedElement.settings as Record<string, unknown>) || {}
                  dispatch(
                    updateElement({
                      id: selectedElement.id,
                      updates: {
                        settings: {
                          ...currentSettings,
                          gap: parseInt(e.target.value) || 16
                        }
                      }
                    })
                  )
                }}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                min="0"
                max="100"
              />
            </PropertyRow>
            <PropertyRow label="Gutter X">
              <input
                type="number"
                value={
                  ((selectedElement.settings as Record<string, unknown>)?.gutterX as number) || 16
                }
                onChange={e => {
                  const currentSettings =
                    (selectedElement.settings as Record<string, unknown>) || {}
                  dispatch(
                    updateElement({
                      id: selectedElement.id,
                      updates: {
                        settings: {
                          ...currentSettings,
                          gutterX: parseInt(e.target.value) || 16
                        }
                      }
                    })
                  )
                }}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                min="0"
                max="100"
              />
            </PropertyRow>
            <PropertyRow label="Gutter Y">
              <input
                type="number"
                value={
                  ((selectedElement.settings as Record<string, unknown>)?.gutterY as number) || 16
                }
                onChange={e => {
                  const currentSettings =
                    (selectedElement.settings as Record<string, unknown>) || {}
                  dispatch(
                    updateElement({
                      id: selectedElement.id,
                      updates: {
                        settings: {
                          ...currentSettings,
                          gutterY: parseInt(e.target.value) || 16
                        }
                      }
                    })
                  )
                }}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                min="0"
                max="100"
              />
            </PropertyRow>
          </PropertySection>
        )}

        {/* Grid Column Properties */}
        {selectedElement.type === 'grid-column' && (
          <PropertySection title="Column Settings">
            <PropertyRow label={`Span (${globalSettings.responsive.currentDevice})`}>
              <input
                type="number"
                value={(() => {
                  const settings = selectedElement.settings as Record<string, unknown>
                  const span = settings?.span as Record<string, unknown>
                  return (span?.[globalSettings.responsive.currentDevice] as number) || 4
                })()}
                onChange={e => {
                  const currentSettings =
                    (selectedElement.settings as Record<string, unknown>) || {}
                  const currentSpan = (currentSettings.span as Record<string, unknown>) || {}
                  dispatch(
                    updateElement({
                      id: selectedElement.id,
                      updates: {
                        settings: {
                          ...currentSettings,
                          span: {
                            ...currentSpan,
                            [globalSettings.responsive.currentDevice]: parseInt(e.target.value) || 1
                          }
                        }
                      }
                    })
                  )
                }}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                min="1"
                max="12"
              />
            </PropertyRow>
            <PropertyRow label={`Offset (${globalSettings.responsive.currentDevice})`}>
              <input
                type="number"
                value={(() => {
                  const settings = selectedElement.settings as Record<string, unknown>
                  const offset = settings?.offset as Record<string, unknown>
                  return (offset?.[globalSettings.responsive.currentDevice] as number) || 0
                })()}
                onChange={e => {
                  const currentSettings =
                    (selectedElement.settings as Record<string, unknown>) || {}
                  const currentOffset = (currentSettings.offset as Record<string, unknown>) || {}
                  dispatch(
                    updateElement({
                      id: selectedElement.id,
                      updates: {
                        settings: {
                          ...currentSettings,
                          offset: {
                            ...currentOffset,
                            [globalSettings.responsive.currentDevice]: parseInt(e.target.value) || 0
                          }
                        }
                      }
                    })
                  )
                }}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                min="0"
                max="11"
              />
            </PropertyRow>
            <PropertyRow label={`Order (${globalSettings.responsive.currentDevice})`}>
              <input
                type="number"
                value={(() => {
                  const settings = selectedElement.settings as Record<string, unknown>
                  const order = settings?.order as Record<string, unknown>
                  return (order?.[globalSettings.responsive.currentDevice] as number) || 0
                })()}
                onChange={e => {
                  const currentSettings =
                    (selectedElement.settings as Record<string, unknown>) || {}
                  const currentOrder = (currentSettings.order as Record<string, unknown>) || {}
                  dispatch(
                    updateElement({
                      id: selectedElement.id,
                      updates: {
                        settings: {
                          ...currentSettings,
                          order: {
                            ...currentOrder,
                            [globalSettings.responsive.currentDevice]: parseInt(e.target.value) || 0
                          }
                        }
                      }
                    })
                  )
                }}
                className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                min="0"
                max="12"
              />
            </PropertyRow>
          </PropertySection>
        )}

        {/* Style Properties */}
        <PropertySection title="Appearance">
          <PropertyRow label="Background Color">
            <input
              type="color"
              value={
                ((selectedElement.styles as Record<string, unknown>)?.backgroundColor as string) ||
                '#ffffff'
              }
              onChange={e => handleStyleChange('backgroundColor', e.target.value)}
              className="w-12 h-8 border border-gray-300 rounded cursor-pointer focus:outline-none focus:border-blue-500"
            />
          </PropertyRow>

          {selectedElement.type === 'text' && (
            <>
              <PropertyRow label="Font Size">
                <input
                  type="number"
                  value={
                    ((selectedElement.styles as Record<string, unknown>)?.fontSize as number) || 16
                  }
                  onChange={e => handleStyleChange('fontSize', parseInt(e.target.value) || 16)}
                  className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
                  min="8"
                  max="72"
                />
              </PropertyRow>
              <PropertyRow label="Text Color">
                <input
                  type="color"
                  value={
                    ((selectedElement.styles as Record<string, unknown>)?.color as string) ||
                    '#000000'
                  }
                  onChange={e => handleStyleChange('color', e.target.value)}
                  className="w-12 h-8 border border-gray-300 rounded cursor-pointer focus:outline-none focus:border-blue-500"
                />
              </PropertyRow>
            </>
          )}

          <PropertyRow label="Border Radius">
            <input
              type="number"
              value={
                ((selectedElement.styles as Record<string, unknown>)?.borderRadius as number) || 0
              }
              onChange={e => handleStyleChange('borderRadius', parseInt(e.target.value) || 0)}
              className="w-full px-3 py-1.5 border border-gray-300 rounded text-sm focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              min="0"
              max="50"
            />
          </PropertyRow>
        </PropertySection>
      </div>
    </div>
  )
}

// Helper Components
interface PropertySectionProps {
  title: string
  children: React.ReactNode
}

const PropertySection: React.FC<PropertySectionProps> = ({ title, children }) => (
  <div className="mb-6">
    <h4 className="text-sm font-semibold text-slate-700 mb-3 pb-2 border-b border-gray-200">
      {title}
    </h4>
    <div className="space-y-3">{children}</div>
  </div>
)

interface PropertyRowProps {
  label: string
  children: React.ReactNode
}

const PropertyRow: React.FC<PropertyRowProps> = ({ label, children }) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-gray-700">{label}</label>
    <div className="flex">{children}</div>
  </div>
)

export default PropertiesPanel
