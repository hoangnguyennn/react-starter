import { Button, Divider, Image, Spacer, Text } from '@hn/components/common'
import { useHandleClick } from '@hn/hooks/useHandleClick'
import { MouseEvent, useCallback, useState } from 'react'

const ExamplePage = () => {
  const [loading, setLoading] = useState(false)

  const handleClick = useCallback((event?: MouseEvent) => {
    console.log('handle click', event)
  }, [])

  const handleDblClick = useCallback((event?: MouseEvent) => {
    console.log('handle dbl click', event)
  }, [])

  const handler = useHandleClick({ handleClick, handleDblClick })

  const handleLoadingClick = () => {
    setLoading(true)
    setTimeout(() => setLoading(false), 2000)
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <Text as="h1" size="3xl" weight="bold" className="mb-8 text-center">
        Base Components Demo
      </Text>

      {/* Button Section */}
      <section className="mb-12">
        <Text as="h2" size="2xl" weight="semibold" className="mb-6">
          Button Components
        </Text>

        <div className="space-y-4">
          {/* Button Variants */}
          <div>
            <Text weight="medium" className="mb-3">
              Button Variants:
            </Text>
            <div className="flex flex-wrap gap-3">
              <Button variant="primary">Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="danger">Danger</Button>
              <Button variant="success">Success</Button>
              <Button variant="warning">Warning</Button>
            </div>
          </div>

          {/* Button Sizes */}
          <div>
            <Text weight="medium" className="mb-3">
              Button Sizes:
            </Text>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="xs">Extra Small</Button>
              <Button size="sm">Small</Button>
              <Button size="md">Medium</Button>
              <Button size="lg">Large</Button>
              <Button size="xl">Extra Large</Button>
            </div>
          </div>

          {/* Button States */}
          <div>
            <Text weight="medium" className="mb-3">
              Button States:
            </Text>
            <div className="flex flex-wrap gap-3">
              <Button>Normal</Button>
              <Button disabled>Disabled</Button>
              <Button loading={loading} onClick={handleLoadingClick}>
                {loading ? 'Loading...' : 'Click to Load'}
              </Button>
              <Button fullWidth>Full Width</Button>
            </div>
          </div>

          {/* Button Rounded */}
          <div>
            <Text weight="medium" className="mb-3">
              Button Rounded:
            </Text>
            <div className="flex flex-wrap gap-3">
              <Button rounded="none">No Rounded</Button>
              <Button rounded="sm">Small Rounded</Button>
              <Button rounded="md">Medium Rounded</Button>
              <Button rounded="lg">Large Rounded</Button>
              <Button rounded="full">Full Rounded</Button>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Text Section */}
      <section className="mb-12">
        <Text as="h2" size="2xl" weight="semibold" className="mb-6">
          Text Components
        </Text>

        <div className="space-y-4">
          {/* Text Sizes */}
          <div>
            <Text weight="medium" className="mb-3">
              Text Sizes:
            </Text>
            <div className="space-y-2">
              <Text size="xs">Extra Small Text (xs)</Text>
              <Text size="sm">Small Text (sm)</Text>
              <Text size="base">Base Text (base)</Text>
              <Text size="lg">Large Text (lg)</Text>
              <Text size="xl">Extra Large Text (xl)</Text>
              <Text size="2xl">2XL Text (2xl)</Text>
              <Text size="3xl">3XL Text (3xl)</Text>
            </div>
          </div>

          {/* Text Weights */}
          <div>
            <Text weight="medium" className="mb-3">
              Text Weights:
            </Text>
            <div className="space-y-2">
              <Text weight="thin">Thin Weight</Text>
              <Text weight="light">Light Weight</Text>
              <Text weight="normal">Normal Weight</Text>
              <Text weight="medium">Medium Weight</Text>
              <Text weight="semibold">Semibold Weight</Text>
              <Text weight="bold">Bold Weight</Text>
              <Text weight="extrabold">Extrabold Weight</Text>
            </div>
          </div>

          {/* Text Colors */}
          <div>
            <Text weight="medium" className="mb-3">
              Text Colors:
            </Text>
            <div className="flex flex-wrap gap-4">
              <Text color="black">Black Text</Text>
              <Text color="gray">Gray Text</Text>
              <Text color="red">Red Text</Text>
              <Text color="green">Green Text</Text>
              <Text color="blue">Blue Text</Text>
              <Text color="purple">Purple Text</Text>
            </div>
          </div>

          {/* Text Alignment */}
          <div>
            <Text weight="medium" className="mb-3">
              Text Alignment:
            </Text>
            <div className="space-y-2">
              <Text align="left" className="border border-gray-200 p-2">
                Left Aligned Text
              </Text>
              <Text align="center" className="border border-gray-200 p-2">
                Center Aligned Text
              </Text>
              <Text align="right" className="border border-gray-200 p-2">
                Right Aligned Text
              </Text>
              <Text align="justify" className="border border-gray-200 p-2">
                Justified Text: This is a longer text that demonstrates justified alignment. It
                should spread across the full width of the container.
              </Text>
            </div>
          </div>

          {/* Text with truncate */}
          <div>
            <Text weight="medium" className="mb-3">
              Text with Truncate:
            </Text>
            <div className="max-w-xs">
              <Text truncate className="border border-gray-200 p-2">
                This is a very long text that will be truncated when it exceeds the container width
              </Text>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Image Section */}
      <section className="mb-12">
        <Text as="h2" size="2xl" weight="semibold" className="mb-6">
          Image Components
        </Text>

        <div className="space-y-6">
          {/* Image with different rounded */}
          <div>
            <Text weight="medium" className="mb-3">
              Image with Rounded:
            </Text>
            <div className="flex flex-wrap gap-4">
              <Image
                src="https://via.placeholder.com/150x150/3B82F6/FFFFFF?text=No+Rounded"
                alt="No Rounded"
                width={150}
                height={150}
                rounded="none"
              />
              <Image
                src="https://via.placeholder.com/150x150/10B981/FFFFFF?text=Small+Rounded"
                alt="Small Rounded"
                width={150}
                height={150}
                rounded="sm"
              />
              <Image
                src="https://via.placeholder.com/150x150/F59E0B/FFFFFF?text=Medium+Rounded"
                alt="Medium Rounded"
                width={150}
                height={150}
                rounded="md"
              />
              <Image
                src="https://via.placeholder.com/150x150/8B5CF6/FFFFFF?text=Large+Rounded"
                alt="Large Rounded"
                width={150}
                height={150}
                rounded="lg"
              />
              <Image
                src="https://via.placeholder.com/150x150/EF4444/FFFFFF?text=Full+Rounded"
                alt="Full Rounded"
                width={150}
                height={150}
                rounded="full"
              />
            </div>
          </div>

          {/* Image with shadows */}
          <div>
            <Text weight="medium" className="mb-3">
              Image with Shadows:
            </Text>
            <div className="flex flex-wrap gap-4">
              <Image
                src="https://via.placeholder.com/150x150/3B82F6/FFFFFF?text=No+Shadow"
                alt="No Shadow"
                width={150}
                height={150}
                shadow="none"
              />
              <Image
                src="https://via.placeholder.com/150x150/10B981/FFFFFF?text=Small+Shadow"
                alt="Small Shadow"
                width={150}
                height={150}
                shadow="sm"
              />
              <Image
                src="https://via.placeholder.com/150x150/F59E0B/FFFFFF?text=Medium+Shadow"
                alt="Medium Shadow"
                width={150}
                height={150}
                shadow="md"
              />
              <Image
                src="https://via.placeholder.com/150x150/8B5CF6/FFFFFF?text=Large+Shadow"
                alt="Large Shadow"
                width={150}
                height={150}
                shadow="lg"
              />
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Divider Section */}
      <section className="mb-12">
        <Text as="h2" size="2xl" weight="semibold" className="mb-6">
          Divider Components
        </Text>

        <div className="space-y-6">
          {/* Divider Colors */}
          <div>
            <Text weight="medium" className="mb-3">
              Divider Colors:
            </Text>
            <div className="space-y-4">
              <Text>Content above gray divider</Text>
              <Divider color="gray" />
              <Text>Content above blue divider</Text>
              <Divider color="blue" />
              <Text>Content above red divider</Text>
              <Divider color="red" />
              <Text>Content above green divider</Text>
              <Divider color="green" />
            </div>
          </div>

          {/* Divider Sizes */}
          <div>
            <Text weight="medium" className="mb-3">
              Divider Sizes:
            </Text>
            <div className="space-y-4">
              <Text>Extra Small Divider</Text>
              <Divider size="xs" />
              <Text>Small Divider</Text>
              <Divider size="sm" />
              <Text>Medium Divider</Text>
              <Divider size="md" />
              <Text>Large Divider</Text>
              <Divider size="lg" />
              <Text>Extra Large Divider</Text>
              <Divider size="xl" />
            </div>
          </div>

          {/* Divider Styles */}
          <div>
            <Text weight="medium" className="mb-3">
              Divider Styles:
            </Text>
            <div className="space-y-4">
              <Text>Solid Divider</Text>
              <Divider />
              <Text>Dashed Divider</Text>
              <Divider dashed />
              <Text>Dotted Divider</Text>
              <Divider dotted />
            </div>
          </div>

          {/* Vertical Divider */}
          <div>
            <Text weight="medium" className="mb-3">
              Vertical Divider:
            </Text>
            <div className="flex items-center space-x-4">
              <Text>Left Content</Text>
              <div className="h-8">
                <Divider orientation="vertical" />
              </div>
              <Text>Right Content</Text>
            </div>
          </div>
        </div>
      </section>

      <Divider />

      {/* Spacer Section */}
      <section className="mb-12">
        <Text as="h2" size="2xl" weight="semibold" className="mb-6">
          Spacer Components
        </Text>

        <div className="space-y-6">
          {/* Vertical Spacers */}
          <div>
            <Text weight="medium" className="mb-3">
              Vertical Spacers:
            </Text>
            <div className="border border-gray-200 p-4">
              <Text>Content above spacer</Text>
              <Spacer size="xs" />
              <Text>Extra Small Spacer</Text>
              <Spacer size="sm" />
              <Text>Small Spacer</Text>
              <Spacer size="md" />
              <Text>Medium Spacer</Text>
              <Spacer size="lg" />
              <Text>Large Spacer</Text>
              <Spacer size="xl" />
              <Text>Extra Large Spacer</Text>
            </div>
          </div>

          {/* Horizontal Spacers */}
          <div>
            <Text weight="medium" className="mb-3">
              Horizontal Spacers:
            </Text>
            <div className="flex items-center">
              <Text>Left</Text>
              <Spacer axis="horizontal" size="sm" />
              <Text>Small Spacer</Text>
              <Spacer axis="horizontal" size="md" />
              <Text>Medium Spacer</Text>
              <Spacer axis="horizontal" size="lg" />
              <Text>Large Spacer</Text>
              <Spacer axis="horizontal" size="xl" />
              <Text>Right</Text>
            </div>
          </div>

          {/* Both Axes Spacer */}
          <div>
            <Text weight="medium" className="mb-3">
              Both Axes Spacer:
            </Text>
            <div className="flex items-center">
              <Text>Content</Text>
              <Spacer axis="both" size="md" />
              <Text>Content with both axes spacing</Text>
            </div>
          </div>
        </div>
      </section>

      {/* Original Example */}
      <Divider />
      <section>
        <Text as="h2" size="2xl" weight="semibold" className="mb-6">
          Original Example
        </Text>
        <div>
          <div>ExamplePage</div>
          <button onClick={handler}>Click me</button>
        </div>
      </section>
    </div>
  )
}

export default ExamplePage
