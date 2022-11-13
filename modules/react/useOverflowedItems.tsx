import { useEffect, useMemo, useRef, useState } from "react";

import { Overflowed, OverflowedOptions } from "../core/Overflowed";
import { defaultCreateGetContainerProps } from "./defaultCreateGetContainerProps";

import { defaultCreateGetIndicatorProps } from "./defaultCreateGetIndicatorProps";
import { defaultCreateGetItemProps } from "./defaultCreateGetItemProps";

export interface UseOverflowedItemsState {
	visibleItemCount: number;
	indicatorElementOffset: number;
	isMounted: boolean;
}

export interface UseOverflowedItemsOptions extends Omit<OverflowedOptions, "onUpdate"> {}

export const useOverflowedItems = <Item extends any>(items: Item[], options: UseOverflowedItemsOptions = {}) => {
	const [state, setState] = useState<UseOverflowedItemsState>({
		visibleItemCount: items.length,
		indicatorElementOffset: 0,
		isMounted: false,
	});

	const overflowedRef = useRef(
		new Overflowed({
			...options,
			onUpdate: (newVisibleItemCount, newIndicatorElementOffset) =>
				setState(({ isMounted }) => ({
					isMounted,
					visibleItemCount: newVisibleItemCount,
					indicatorElementOffset: newIndicatorElementOffset,
				})),
		}),
	);

	useEffect(() => {
		setState((previousState) => ({ ...previousState, isMounted: true }));
		return () => overflowedRef.current.onContainerElementWillUnmount();
	}, []);

	const overflowedItems = useMemo(
		() =>
			items.map((item, index) => ({
				getProps: defaultCreateGetItemProps(index >= state.visibleItemCount, overflowedRef.current, state),
				item,
			})),
		[items, state.visibleItemCount],
	);

	const extraItems = useMemo(() => items.slice(state.visibleItemCount), [state.visibleItemCount]);

	const props = useMemo(
		() => ({
			getContainerProps: defaultCreateGetContainerProps(overflowedRef.current, state),
			getIndicatorProps: defaultCreateGetIndicatorProps(overflowedRef.current, state),
			isIndicatorVisible: extraItems.length > 0,
		}),
		[state, extraItems],
	);

	return [overflowedItems, extraItems, props] as const;
};
