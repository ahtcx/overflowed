import type { Overflowed } from "../core";

import type { UseOverflowedItemsState } from "./useOverflowedItems";

export type CreateGetIndicatorProps<F extends (...a: any[]) => {}> = (
	overflowed: Overflowed,
	state: UseOverflowedItemsState,
	is: boolean,
) => F;

export interface DefaultCreateGetIndicatorPropsOptions {
	style?: Record<string, any>
}

export const defaultCreateGetIndicatorProps = (( overflowed, state, is) => ({ style }: DefaultCreateGetIndicatorPropsOptions = {}) => ({
	ref: <IndicatorElement extends Element | null>(indicatorElement: IndicatorElement) => {
		if (!indicatorElement) return;
		overflowed.registerIndicatorElement(indicatorElement);
	},
	style: {
		position: is ? "absolute" : undefined,
		insetInlineStart: is ? state.indicatorElementOffset : undefined,
		margin: 0,
		...style,
	} as const,
})) satisfies CreateGetIndicatorProps<any>;
