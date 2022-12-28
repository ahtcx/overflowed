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
		style: isVisible
			? {
					position: isVisible ? "absolute" : undefined,
					insetInlineStart: isVisible ? state.indicatorElementOffset : undefined,
					marginInlineStart: 0,
					...style,
			  }
			: {
					display: "none",
			  },
	})) as CreateGetIndicatorProps<any>;
