import { useEffect, useMemo, useRef, useState } from "react";

import { HIDDEN_STYLE, Overflowed, OverflowedOptions } from "../core/Overflowed";

export const useOverflowedItems = <Item extends any>(items: Item[], options?: Omit<OverflowedOptions, "onRender">) => {
	const [visibleItemCount, setVisibleItemCount] = useState(items.length);
	const [indicatorElementOffset, setIndicatorElementOffset] = useState(0);

	const overflowedRef = useRef(
		new Overflowed({
			...options,
			onRender(newVisibleItemCount, newIndicatorElementOffset) {
				setVisibleItemCount(newVisibleItemCount);
				setIndicatorElementOffset(newIndicatorElementOffset);
			},
		}),
	);

	useEffect(() => {
		overflowedRef.current.onContainerElementDidMount();

		return () => {
			overflowedRef.current.onContainerElementWillUnmount();
		};
	}, []);

	const overflowedItems = useMemo(
		() =>
			items.map((item, index) => ({
				props: {
					ref: <ItemElement extends Element | null>(itemElement: ItemElement) => {
						if (!itemElement) return; // throw new Error("TODO: 4");
						overflowedRef.current.registerItemElement(itemElement);
					},
					style: { flexShrink: 0, ...(index >= visibleItemCount ? HIDDEN_STYLE : {}) },
					"aria-hidden": index >= visibleItemCount,
				},
				item,
			})),
		[items, visibleItemCount],
	);

	const extraItems = useMemo(() => items.slice(visibleItemCount), [visibleItemCount]);

	const props = {
		containerProps: {
			ref: <ContainerElement extends Element | null>(containerElement: ContainerElement) => {
				if (!containerElement) return; // throw new Error("TODO 1");
				overflowedRef.current.registerContainerElement(containerElement);
			},
			style: overflowedRef.current.getContainerElementStyles(),
		},
		indicatorProps: {
			ref: <IndicatorElement extends Element | null>(indicatorElement: IndicatorElement) => {
				if (!indicatorElement) return; // throw new Error("TODO 2");
				overflowedRef.current.registerIndicatorElement(indicatorElement);
			},
			style: {
				...overflowedRef.current.getIndicatorElementStyles(),
				...(extraItems.length > 0
					? ({
							position: "absolute",
							left: indicatorElementOffset,
							whiteSpace: "nowrap",
					  } as const)
					: HIDDEN_STYLE),
			},
		},
	};

	return [overflowedItems, extraItems, props] as const;
};
