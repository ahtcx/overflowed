import type { Action } from "svelte/action";

import { Overflowed } from "../core";

export const overflowedItems = <Item>(
	items: Item[],
	onUpdate: (newVisibleItems: Item[], newOverflowedItems: Item[]) => void,
) => {
	const overflowed = new Overflowed({
		onUpdate: (newVisibleItemCount, indicatorElementOffset) => {
			onUpdate(items, newVisibleItemCount < items.length ? items.slice(newVisibleItemCount) : []);
			console.log(indicatorElementOffset);
		},
	});

	const container: Action<HTMLElement> = (element) => {
		overflowed.registerContainerElement(element);

		element.style.display = "flex";
		element.style.position = "relative";
		element.style.flexDirection = overflowed.axis === "horizontal" ? "row" : "column";
		element.style.overflowX = overflowed.axis === "horizontal" ? "clip" : "";
		element.style.overflowY = overflowed.axis === "horizontal" ? "clip" : "";
	};

	const indicator: Action<HTMLElement> = (element) => {
		overflowed.registerIndicatorElement(element);

		element.style.flexShrink = "0";
	};

	const item: Action<HTMLElement, number> = (element, index) => {
		overflowed.registerItemElement(element);

		element.style.flexShrink = "0";
	};

	return [items, items, { container, indicator, item }] as const;
};
