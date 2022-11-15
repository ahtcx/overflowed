---
layout: ~/layouts/Documentation.astro
---

# Getting Started

## Installation

Add the package to your project.

```shell
npm install overflowed
```

```shell
yarn add overflowed
```

```shell
pnpm add overflowed
```

## React

Using the `useOverflowedItems` hook it's very easy to get a simple overflowable menu working.

```tsx
import { useOverflowedItems } from "overflowed/react";

export default () => {
	const [visibleItems, overflowedItems, { getContainerProps, getIndicatorProps }] = useOverflowedItems(items);

	return (
		<div {...getContainerProps()}>
			{visibleItems.map(({ item, getProps }) => (
				<div key={item.id} {...getProps()}>
					{item.name}
				</div>
			))}
			{overflowedItems && <div {...getIndicatorProps()}>More</div>}
		</div>
	);
};
```

Visit the [examples](./examples) to see it in action.
