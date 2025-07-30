import {
  Button,
  Checkbox,
  Divider,
  Image,
  Input,
  Layout,
  Radio,
  Select,
  Spacer,
  Text,
  Textarea
} from '@hn/components/common'
import { ElementContentProps } from '@hn/types/components'
import { FC } from 'react'

export const ElementContent: FC<ElementContentProps> = ({
  element,
  onLayoutDrop,
  columnChildren
}) => {
  switch (element.type) {
    case 'button':
      return (
        <Button
          variant={element.settings.variant}
          size={element.settings.size}
          disabled={element.settings.disabled}
          loading={element.settings.loading}
          fullWidth={element.settings.fullWidth}
          rounded={element.settings.rounded}
        >
          {element.settings.text}
        </Button>
      )

    case 'text':
      return (
        <Text
          as={element.settings.as}
          size={element.settings.size}
          weight={element.settings.weight}
          color={element.settings.color}
          align={element.settings.align}
          truncate={element.settings.truncate}
          noWrap={element.settings.noWrap}
          breakWords={element.settings.breakWords}
          breakAll={element.settings.breakAll}
        >
          {element.settings.content}
        </Text>
      )

    case 'image':
      return (
        <Image
          src={element.settings.src}
          alt={element.settings.alt}
          width={element.settings.width}
          height={element.settings.height}
          objectFit={element.settings.objectFit}
          rounded={element.settings.rounded}
          shadow={element.settings.shadow}
          loading={element.settings.loading}
        />
      )

    case 'divider':
      return (
        <Divider
          orientation={element.settings.orientation}
          color={element.settings.color}
          size={element.settings.size}
          spacing={element.settings.spacing}
          dashed={element.settings.dashed}
          dotted={element.settings.dotted}
        />
      )

    case 'spacer':
      return (
        <Spacer
          size={element.settings.size}
          axis={element.settings.axis}
          inline={element.settings.inline}
        />
      )

    case 'input':
      return (
        <Input
          type={element.settings.type}
          placeholder={element.settings.placeholder}
          value={element.settings.value}
          disabled={element.settings.disabled}
          readonly={element.settings.readonly}
          required={element.settings.required}
          size={element.settings.size}
          variant={element.settings.variant}
          fullWidth={element.settings.fullWidth}
          rounded={element.settings.rounded}
        />
      )

    case 'textarea':
      return (
        <Textarea
          placeholder={element.settings.placeholder}
          value={element.settings.value}
          rows={element.settings.rows}
          cols={element.settings.cols}
          disabled={element.settings.disabled}
          readonly={element.settings.readonly}
          required={element.settings.required}
          size={element.settings.size}
          variant={element.settings.variant}
          fullWidth={element.settings.fullWidth}
          rounded={element.settings.rounded}
          resize={element.settings.resize}
        />
      )

    case 'select':
      return (
        <Select
          options={element.settings.options}
          value={element.settings.value}
          placeholder={element.settings.placeholder}
          disabled={element.settings.disabled}
          required={element.settings.required}
          size={element.settings.size}
          variant={element.settings.variant}
          fullWidth={element.settings.fullWidth}
          rounded={element.settings.rounded}
          multiple={element.settings.multiple}
        />
      )

    case 'checkbox':
      return (
        <Checkbox
          checked={element.settings.checked}
          disabled={element.settings.disabled}
          required={element.settings.required}
          size={element.settings.size}
          variant={element.settings.variant}
          rounded={element.settings.rounded}
          label={element.settings.label}
        />
      )

    case 'radio':
      return (
        <Radio
          checked={element.settings.checked}
          disabled={element.settings.disabled}
          required={element.settings.required}
          name={element.settings.name}
          value={element.settings.value}
          size={element.settings.size}
          variant={element.settings.variant}
          label={element.settings.label}
        />
      )

    case 'layout':
      return (
        <Layout
          cols={element.settings.cols}
          columns={element.settings.columns?.map(col => ({
            id: col.id,
            span: col.span,
            children: undefined
          }))}
          gap={element.settings.gap}
          direction={element.settings.direction}
          align={element.settings.align}
          justify={element.settings.justify}
          fullWidth={element.settings.fullWidth}
          fullHeight={element.settings.fullHeight}
          onDrop={onLayoutDrop}
          columnChildren={columnChildren}
        />
      )

    default:
      return <div>Unknown element type: {element.type}</div>
  }
}
