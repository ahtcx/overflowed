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
			display: "flex",
			position: "relative",
			flexDirection: overflowed.direction === "horizontal" ? "row" : "column",
			overflowInline: state.isMounted ? "clip" : "auto",
			...style,
		} as const,
	})) as CreateGetContainerProps<any>;
