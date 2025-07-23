import { customRender } from '@hn/test/customRender'
import { composeStories } from '@storybook/react'
import { describe, expect, it } from 'vitest'
import * as stories from './index.stories'

describe('HomePage', () => {
  const { FirstStory } = composeStories(stories)

  it('Render thành công', () => {
    customRender(<FirstStory />)
    expect(true).toBeTruthy()
  })
})
