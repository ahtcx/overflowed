import type { Overflowed } from "../core";

import type { UseOverflowedItemsState } from "./useOverflowedItems";

export type CreateGetItemProps<F extends (...a: any[]) => {}> = (
	isHidden: boolean,
	overflowed: Overflowed,
	state: UseOverflowedItemsState,
) => F;

export interface DefaultCreateGetItemPropsOptions {
	style?: React.CSSProperties;
}

export const defaultCreateGetItemProps = ((isHidden, overflowed, state) =>
	({ style }: DefaultCreateGetItemPropsOptions = {}) => ({
		ref: <ItemElement extends Element | null>(itemElement: ItemElement) => {
			if (!itemElement) return;
			overflowed.registerItemElement(itemElement);
		},
		style: {
			flexShrink: 0,
			...(isHidden
				? {
						userSelect: "none",
						pointerEvents: "none",
						visibility: "hidden",
				  }
				: {}),
			...style,
		} satisfies React.CSSProperties,
		"aria-hidden": isHidden ? true : false,
	})) satisfies CreateGetItemProps<any>;
