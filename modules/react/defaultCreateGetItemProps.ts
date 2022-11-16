import type { Overflowed } from "../core";

import type { UseOverflowedItemsState } from "./useOverflowedItems";

export type CreateGetItemProps<F extends (...a: any[]) => {}> = (
	overflowed: Overflowed,
	state: UseOverflowedItemsState,
	isHidden: boolean,
) => F;

export interface DefaultCreateGetItemPropsOptions {
	style?: {};
}

export const defaultCreateGetItemProps = ((overflowed, state, isHidden) =>
	({ style }: DefaultCreateGetItemPropsOptions = {}) => ({
		ref: <ItemElement extends Element | null>(itemElement: ItemElement) => {
			if (!(itemElement instanceof HTMLElement)) {
				return;
			}

			overflowed.registerItemElement(itemElement);
		},
		style: {
			flexShrink: 0,
			...(isHidden
				? ({
						userSelect: "none",
						pointerEvents: "none",
						visibility: "hidden",
				  } as const)
				: {}),
			...style,
		} as const,
		"aria-hidden": isHidden ? true : false,
	})) as CreateGetItemProps<any>;
