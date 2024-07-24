import { RouterProvider, createMemoryRouter } from 'react-router-dom'

import { Meta, StoryObj } from '@storybook/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import { routes } from '@hn/router'

import Component from '.'

const queryClient = new QueryClient()

const meta: Meta<typeof Component> = {
  component: Component
}

export default meta

type Story = StoryObj<typeof Component>

export const FirstStory: Story = {
  render: () => {
    const router = createMemoryRouter(routes, {
      initialEntries: ['/todos']
    })

    return (
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={router} />
      </QueryClientProvider>
    )
  }
}
