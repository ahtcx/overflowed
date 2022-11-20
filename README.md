# Overflowed

Overflowed is a small library allowing you to build better responsive websites. It's currently in it's alpha stage and the APIs are potentially unstable, but I aim to satisfy the following goals before a stable version.

- ⚛️ Works across all major frameworks
- 🌳 Lightweight and dependency-free, tree-shakable
- 🏗️ Includes strongly typed TypeScript declarations
- 🎨 Infinitely customizable, sensible defaults
- ⚡ Highly optimized and performant
- 📚 Clean API and comprehensive documentation
- ♿ Encourages accessible practices
- ↩️ Supports right-to-left writing modes
- 🦄 Ponyfills can be provided
- ⚙️ Supports SSR and environments without JS
- 🧩 Ships with ESM and CJS bundles

## Installation

```
npm install overflowed
yarn add overflowed
pnpm add overflowed
```

## Progress

- [ ] Documentation
  - [ ] Getting started
  - [ ] Examples
  - [ ] Playground
- [ ] `overflowed/core`
- [ ] `overflowed/react`
- [ ] `overflowed/vue`
- [ ] `overflowed/svelte`
- [ ] `overflowed/preact`
- [ ] `overflowed/solid`

## Usage

Check out the [examples](https://overflowed.aht.cx/examples) to see how to use the library with your preferred framework.

<details>
<summary>React</summary>

```tsx
import { useOverflowedItems } from "overflowed/react";

export const AvatarExample = () => {
	const [visiblePeople, overflowedPeople, { getContainerProps, getIndicatorProps }] = useOverflowedItems(people);

	return (
		<ul {...getContainerProps()}>
			{visiblePeople.map(([person, getItemProps]) => (
				<li key={person.id} {...getItemProps({ style: { backgroundColor: person.color } })}>
					{person.initials}
				</li>
			))}
			<li {...getIndicatorProps()}>+{overflowedPeople.length}</li>
		</ul>
	);
};
```

</details>

<details>
<summary>Svelte</summary>

WIP

</details>
