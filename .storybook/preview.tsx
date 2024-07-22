import type { Preview } from '@storybook/react'
import React from 'react'
import { GlobalProvider } from '@hn/test/provider'

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
        <GlobalProvider>
          <Story />
        </GlobalProvider>
      )
    }
  ]
}

export default preview
