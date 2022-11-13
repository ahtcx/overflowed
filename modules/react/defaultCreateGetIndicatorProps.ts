import type { Overflowed } from "../core";

import type { UseOverflowedItemsState } from "./useOverflowedItems";

export type CreateGetIndicatorProps<F extends (...a: any[]) => {}> = (
	overflowed: Overflowed,
	state: UseOverflowedItemsState,
) => F;

export interface DefaultCreateGetIndicatorPropsOptions {
	style?: React.CSSProperties
}

export const defaultCreateGetIndicatorProps = ((overflowed, state) => ({ style }: DefaultCreateGetIndicatorPropsOptions = {}) => ({
	ref: <IndicatorElement extends Element | null>(indicatorElement: IndicatorElement) => {
		if (!indicatorElement) return;
		overflowed.registerIndicatorElement(indicatorElement);
	},
	style: {
		position: "absolute",
		marginInlineStart: state.indicatorElementOffset,
		...style,
	} satisfies React.CSSProperties,
})) satisfies CreateGetIndicatorProps<any>;
