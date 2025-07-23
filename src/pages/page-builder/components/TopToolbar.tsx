import { getGlobalSettings, setCurrentDevice } from '@hn/store/reducers/pageBuilder.reducer'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const TopToolbar: React.FC = () => {
  const dispatch = useDispatch()
  const globalSettings = useSelector(getGlobalSettings())

  const currentDevice = globalSettings.responsive.currentDevice

  const handleDeviceChange = (device: PageBuilder.DeviceType) => {
    dispatch(setCurrentDevice(device))
  }

  const handleUndo = () => {
    // TODO: Implement undo
    console.log('Undo clicked')
  }

  const handleRedo = () => {
    // TODO: Implement redo
    console.log('Redo clicked')
  }

  const handleTogglePreview = () => {
    // TODO: Implement preview toggle
    console.log('Preview toggle clicked')
  }

  return (
    <div className="h-16 bg-slate-800 border-b border-slate-700 flex items-center px-6 gap-4">
      <div className="text-xl font-bold text-slate-100">Page Builder</div>

      <div className="flex gap-1 ml-auto mr-4">
        <button
          className={`px-3 py-2 text-xs rounded border transition-colors ${
            currentDevice === 'desktop'
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700'
          }`}
          onClick={() => handleDeviceChange('desktop')}
          title="Desktop View"
        >
          🖥️ Desktop
        </button>
        <button
          className={`px-3 py-2 text-xs rounded border transition-colors ${
            currentDevice === 'tablet'
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700'
          }`}
          onClick={() => handleDeviceChange('tablet')}
          title="Tablet View"
        >
          📱 Tablet
        </button>
        <button
          className={`px-3 py-2 text-xs rounded border transition-colors ${
            currentDevice === 'mobile'
              ? 'bg-blue-600 border-blue-600 text-white'
              : 'bg-transparent border-slate-600 text-slate-300 hover:bg-slate-700'
          }`}
          onClick={() => handleDeviceChange('mobile')}
          title="Mobile View"
        >
          📱 Mobile
        </button>
      </div>

      <div className="flex gap-2">
        <button
          className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white text-sm rounded transition-colors"
          onClick={handleUndo}
          title="Undo (Ctrl+Z)"
        >
          ↶ Undo
        </button>

        <button
          className="px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white text-sm rounded transition-colors"
          onClick={handleRedo}
          title="Redo (Ctrl+Y)"
        >
          ↷ Redo
        </button>

        <button
          className="px-4 py-2 text-sm rounded transition-colors bg-blue-600 hover:bg-blue-700 text-white"
          onClick={handleTogglePreview}
          title="Toggle Preview Mode"
        >
          👁️ Preview
        </button>
      </div>
    </div>
  )
}

export default TopToolbar
