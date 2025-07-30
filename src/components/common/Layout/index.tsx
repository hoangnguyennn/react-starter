import { IDragItem } from '@hn/types/components'
import React, { FC, ReactNode } from 'react'
import { useDrop } from 'react-dnd'

export type LayoutCols = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12
export type LayoutGap = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
export type LayoutDirection = 'row' | 'col'
export type LayoutAlign = 'start' | 'center' | 'end' | 'stretch'
export type LayoutJustify = 'start' | 'center' | 'end' | 'between' | 'around' | 'evenly'

export interface LayoutColumn {
  id: string
  span: LayoutCols
  children?: ReactNode
}

export interface LayoutProps {
  cols?: LayoutCols
  columns?: LayoutColumn[]
  gap?: LayoutGap
  direction?: LayoutDirection
  align?: LayoutAlign
  justify?: LayoutJustify
  fullWidth?: boolean
  fullHeight?: boolean
  className?: string
  onDrop?: (item: IDragItem, columnIndex?: number) => void
  columnChildren?: ReactNode[]
}

export const Layout: FC<LayoutProps> = ({
  cols = 2,
  columns,
  gap = 'md',
  direction = 'row',
  align = 'stretch',
  justify = 'start',
  fullWidth = true,
  fullHeight = false,
  className = '',
  onDrop,
  columnChildren = []
}) => {
  const gapClasses = {
    none: 'gap-0',
    xs: 'gap-1',
    sm: 'gap-2',
    md: 'gap-4',
    lg: 'gap-6',
    xl: 'gap-8',
    '2xl': 'gap-12'
  }

  const alignClasses = {
    start: 'items-start',
    center: 'items-center',
    end: 'items-end',
    stretch: 'items-stretch'
  }

  const justifyClasses = {
    start: 'justify-start',
    center: 'justify-center',
    end: 'justify-end',
    between: 'justify-between',
    around: 'justify-around',
    evenly: 'justify-evenly'
  }

  const directionClasses = {
    row: 'flex-row',
    col: 'flex-col'
  }

  const widthClass = fullWidth ? 'w-full' : 'w-auto'
  const heightClass = fullHeight ? 'h-full' : 'h-auto'

  const baseClasses = 'flex'

  const classes = [
    baseClasses,
    directionClasses[direction],
    alignClasses[align],
    justifyClasses[justify],
    gapClasses[gap],
    widthClass,
    heightClass,
    className
  ].join(' ')

  // Generate columns dynamically
  const renderColumns = () => {
    if (columns && columns.length > 0) {
      // Use custom columns configuration
      return columns.map((column, index) => (
        <LayoutColumn
          key={column.id}
          column={column}
          index={index}
          onDrop={onDrop}
          columnChildren={columnChildren}
        />
      ))
    } else {
      // Use default columns based on cols prop
      const columns = []
      for (let i = 0; i < cols; i++) {
        columns.push(
          <LayoutColumn
            key={i}
            column={{ id: `col-${i}`, span: (12 / cols) as LayoutCols }}
            index={i}
            onDrop={onDrop}
            columnChildren={columnChildren}
          />
        )
      }
      return columns
    }
  }

  return <div className={`${classes} grid grid-cols-12`}>{renderColumns()}</div>
}

// Layout Column component with react-dnd support
interface LayoutColumnProps {
  column: LayoutColumn
  index: number
  onDrop?: (item: IDragItem, columnIndex?: number) => void
  columnChildren?: ReactNode[]
}

const LayoutColumn: FC<LayoutColumnProps> = ({ column, index, onDrop, columnChildren = [] }) => {
  const [{ isOver }, drop] = useDrop(
    () => ({
      accept: 'element',
      drop: (item: IDragItem) => {
        console.log('LayoutColumn drop handler called for column', index)
        onDrop?.(item, index)
        const result = { handled: true }
        console.log('LayoutColumn returning:', result)
        return result // Báo hiệu đã xử lý
      },
      collect: monitor => ({
        isOver: monitor.isOver()
      })
    }),
    [index, onDrop]
  )

  const spanClasses = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
    9: 'col-span-9',
    10: 'col-span-10',
    11: 'col-span-11',
    12: 'col-span-12'
  }

  return (
    <div
      ref={drop as unknown as React.RefObject<HTMLDivElement>}
      className={`${spanClasses[column.span]} min-h-[100px] border-2 border-dashed border-gray-300 rounded-lg p-4 transition-colors ${
        isOver ? 'bg-blue-50 border-blue-400' : 'bg-gray-50 hover:bg-gray-100'
      }`}
    >
      <div className="text-center text-gray-500 text-sm mb-2">
        Column {index + 1} (span: {column.span})
      </div>
      {/* Render children for this specific column */}
      <div className="space-y-2">
        {columnChildren[index] || (
          <div className="text-center text-gray-400 text-xs">Drop elements here</div>
        )}
      </div>
    </div>
  )
}

// Layout Column component
export interface LayoutColProps {
  span?: LayoutCols
  className?: string
  children?: ReactNode
}

export const LayoutCol: FC<LayoutColProps> = ({ span = 1, className = '', children }) => {
  const spanClasses = {
    1: 'col-span-1',
    2: 'col-span-2',
    3: 'col-span-3',
    4: 'col-span-4',
    5: 'col-span-5',
    6: 'col-span-6',
    7: 'col-span-7',
    8: 'col-span-8',
    9: 'col-span-9',
    10: 'col-span-10',
    11: 'col-span-11',
    12: 'col-span-12'
  }

  const classes = [spanClasses[span], className].join(' ')

  return <div className={classes}>{children}</div>
}
