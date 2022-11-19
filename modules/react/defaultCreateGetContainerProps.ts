import type { Overflowed } from "../core";

import type { UseOverflowedItemsState } from "./useOverflowedItems";

export type CreateGetContainerProps<F extends (...a: any[]) => {}> = (
	overflowed: Overflowed,
	state: UseOverflowedItemsState,
) => F;

export interface DefaultCreateGetContainerProps {
	style?: Record<string, any>;
}

export const defaultCreateGetContainerProps = ((overflowed, state) =>
	({ style }: DefaultCreateGetContainerProps = {}) => ({
		ref: <ContainerElement extends Element | null>(containerElement: ContainerElement) => {
			if (!(containerElement instanceof HTMLElement)) {
				return;
			}

			overflowed.registerContainerElement(containerElement);
		},
		style: {
			// display: "flex",
			// position: "relative",
			// flexDirection: overflowed.direction === "horizontal" ? "row" : "column",
			overflowX: overflowed.axis === "horizontal" ? (state.isMounted ? "clip" : "auto") : undefined,
			overflowY: overflowed.axis === "horizontal" ? (state.isMounted ? "clip" : "auto") : undefined,
			...style,
		} as const,
	})) as CreateGetContainerProps<any>;
