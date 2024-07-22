import { expect, describe, it } from 'vitest'
import * as stories from './index.stories'
import { composeStories } from '@storybook/react'
import { customRender } from '@hn/test/customRender'

describe('HomePage', () => {
  const { FirstStory } = composeStories(stories)

  it('Render successfully', () => {
    customRender(<FirstStory />)
    expect(true).toBeTruthy()
  })
})
