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
		marginInlineStart: is ? state.indicatorElementOffset : undefined,
		...style,
	} as const,
})) satisfies CreateGetIndicatorProps<any>;
