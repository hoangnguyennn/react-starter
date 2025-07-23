# Base Components

Thư viện các base components được xây dựng với Tailwind CSS.

## Components

### Button

Component button với nhiều variant và size khác nhau.

```tsx
import { Button } from '@/components/common';

// Sử dụng cơ bản
<Button>Click me</Button>

// Với variant và size
<Button variant="primary" size="lg">Large Primary Button</Button>

// Với loading state
<Button loading>Loading...</Button>

// Với full width
<Button fullWidth>Full Width Button</Button>
```

**Props:**

- `variant`: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger' | 'success' | 'warning'
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- `disabled`: boolean
- `loading`: boolean
- `fullWidth`: boolean
- `rounded`: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'

### Image

Component image với các tùy chọn styling.

```tsx
import { Image } from '@/components/common';

// Sử dụng cơ bản
<Image src="/path/to/image.jpg" alt="Description" />

// Với rounded corners và shadow
<Image
  src="/path/to/image.jpg"
  alt="Description"
  rounded="lg"
  shadow="md"
/>

// Với object fit
<Image
  src="/path/to/image.jpg"
  alt="Description"
  objectFit="cover"
/>
```

**Props:**

- `src`: string (required)
- `alt`: string (required)
- `objectFit`: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down'
- `rounded`: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | 'full'
- `shadow`: 'none' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
- `loading`: 'lazy' | 'eager'

### Text

Component text với nhiều tùy chọn typography.

```tsx
import { Text } from '@/components/common';

// Sử dụng cơ bản
<Text>Hello World</Text>

// Với size và weight
<Text size="xl" weight="bold">Large Bold Text</Text>

// Với color và alignment
<Text color="blue" align="center">Centered Blue Text</Text>

// Với truncate
<Text truncate>Very long text that will be truncated...</Text>
```

**Props:**

- `as`: 'p' | 'span' | 'div' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'label'
- `size`: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl' | '8xl' | '9xl'
- `weight`: 'thin' | 'extralight' | 'light' | 'normal' | 'medium' | 'semibold' | 'bold' | 'extrabold' | 'black'
- `color`: 'inherit' | 'current' | 'transparent' | 'black' | 'white' | 'gray' | 'red' | 'orange' | 'yellow' | 'green' | 'blue' | 'indigo' | 'purple' | 'pink'
- `align`: 'left' | 'center' | 'right' | 'justify'
- `truncate`: boolean
- `noWrap`: boolean
- `breakWords`: boolean
- `breakAll`: boolean

### Divider

Component divider để tạo đường phân cách.

```tsx
import { Divider } from '@/components/common';

// Sử dụng cơ bản
<Divider />

// Với color và size
<Divider color="blue" size="lg" />

// Với dashed style
<Divider dashed />

// Vertical divider
<Divider orientation="vertical" />
```

**Props:**

- `orientation`: 'horizontal' | 'vertical'
- `color`: 'gray' | 'blue' | 'red' | 'green' | 'yellow' | 'purple' | 'pink' | 'indigo'
- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl'
- `spacing`: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
- `dashed`: boolean
- `dotted`: boolean

### Spacer

Component spacer để tạo khoảng cách.

```tsx
import { Spacer } from '@/components/common';

// Vertical spacing
<Spacer size="lg" />

// Horizontal spacing
<Spacer size="md" axis="horizontal" />

// Both axes
<Spacer size="xl" axis="both" />
```

**Props:**

- `size`: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl'
- `axis`: 'horizontal' | 'vertical' | 'both'
- `inline`: boolean

## Import

```tsx
// Import tất cả components
import { Button, Image, Text, Divider, Spacer } from '@/components/common'

// Hoặc import từng component riêng lẻ
import Button from '@/components/common/Button'
import Image from '@/components/common/Image'
import Text from '@/components/common/Text'
import Divider from '@/components/common/Divider'
import Spacer from '@/components/common/Spacer'
```
