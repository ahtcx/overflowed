import type { Overflowed } from "../core";

import type { UseOverflowedItemsState } from "./useOverflowedItems";

export type CreateGetIndicatorProps<F extends (...a: any[]) => {}> = (
	overflowed: Overflowed,
	state: UseOverflowedItemsState,
	isVisible: boolean,
) => F;

export interface DefaultCreateGetIndicatorPropsOptions {
	style?: Record<string, any>;
}

export const defaultCreateGetIndicatorProps = ((overflowed, state, isVisible) =>
	({ style }: DefaultCreateGetIndicatorPropsOptions = {}) => ({
		ref: <IndicatorElement extends Element | null>(indicatorElement: IndicatorElement) => {
			if (!(indicatorElement instanceof HTMLElement)) {
				return;
			}

			overflowed.registerIndicatorElement(indicatorElement);
		},
		style: {
			position: "absolute",
			marginInlineStart: 0,
			insetInlineStart: state.indicatorElementOffset,
			userSelect: isVisible ? undefined : "none",
			pointerEvents: isVisible ? undefined : "none",
			visibility: isVisible ? undefined : "hidden",
			opacity: isVisible ? 1 : 0,
			...style,
		},
	})) as CreateGetIndicatorProps<any>;
