import { useEffect, useMemo, useRef, useState } from "react";

import { Overflowed, OverflowedOptions } from "../core/Overflowed";
import { defaultCreateGetContainerProps } from "./defaultCreateGetContainerProps";

import { defaultCreateGetIndicatorProps } from "./defaultCreateGetIndicatorProps";
import { defaultCreateGetItemProps } from "./defaultCreateGetItemProps";

export interface UseOverflowedItemsState {
	visibleItemCount: number;
	indicatorElementOffset: number | undefined;
	isMounted: boolean;
}

export interface UseOverflowedItemsOptions extends Omit<OverflowedOptions, "onUpdate"> {
	enableEmptyOverflowedItems?: boolean;
	maxItemCount?: number;
}

export const useOverflowedItems = <Item extends any>(
	items: Item[],
	{
		//
		enableEmptyOverflowedItems,
		maxItemCount = items.length,
		...options
	}: UseOverflowedItemsOptions = {},
) => {
	const [state, setState] = useState<UseOverflowedItemsState>({
		visibleItemCount: maxItemCount,
		indicatorElementOffset: undefined,
		isMounted: false,
	});

	const overflowedRef = useRef(
		new Overflowed({
			...options,
			onUpdate: (newVisibleItemCount, newIndicatorElementOffset) =>
				setState(({ isMounted }) => ({
					isMounted,
					visibleItemCount: Math.min(newVisibleItemCount, maxItemCount),
					indicatorElementOffset: newIndicatorElementOffset,
				})),
		}),
	);

	useEffect(() => {
		setState((previousState) => ({ ...previousState, isMounted: true }));
		return () => overflowedRef.current.onContainerElementWillUnmount();
	}, []);

	const visibleItems = useMemo(
		() =>
			items.map((item, index) => ({
				getItemProps: defaultCreateGetItemProps(overflowedRef.current, state, index >= state.visibleItemCount),
				item,
			})),
		[items, state],
	);

	// TODO: type this depending on options
	const overflowedItems = useMemo(
		() => (state.visibleItemCount < items.length ? items.slice(state.visibleItemCount) : []),
		[state.visibleItemCount, enableEmptyOverflowedItems],
	);

	const props = useMemo(
		() => ({
			getContainerProps: defaultCreateGetContainerProps(overflowedRef.current, state),
			getIndicatorProps: defaultCreateGetIndicatorProps(overflowedRef.current, state, overflowedItems.length > 0),
		}),
		[state, overflowedItems],
	);

	return [visibleItems, overflowedItems, props] as const;
};
