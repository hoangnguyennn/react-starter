import { getTodoListHandlerFactory } from '@hn/mocks/todo/getList/mock'
import { Meta, StoryObj } from '@storybook/react'
import Component from '.'

const meta: Meta<typeof Component> = {
  component: Component
}

export default meta

type Story = StoryObj<typeof Component>

export const FirstStory: Story = {
  render: () => {
    return <Component />
  }
}

export const Loading: Story = {
  render: () => {
    return <Component />
  },
  parameters: {
    msw: {
      handlers: [getTodoListHandlerFactory.loading()]
    }
  }
}
