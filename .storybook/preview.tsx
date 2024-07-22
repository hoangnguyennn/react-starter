import type { Preview } from '@storybook/react'
import { Provider } from 'react-redux'
import store, { persistor } from '../src/store'
import React from 'react'
import { PersistGate } from 'redux-persist/integration/react'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    Story => {
      return (
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <Story />
          </PersistGate>
        </Provider>
      )
    }
  ]
}

export default preview
