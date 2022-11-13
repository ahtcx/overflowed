import { useOverflowedItems } from "./useOverflowedItems";

export interface TestProps {
	className: string;
}

export const Test = ({ className }: TestProps) => {
	const [items, extra, { getContainerProps, getIndicatorProps, isIndicatorVisible }] = useOverflowedItems(
		// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233],
		[1, 2, 3],
		{
			// direction: "vertical",
		},
	);

	return (
		<div className={className} {...getContainerProps()}>
			{items.map(({ item, getProps }, index) => (
				<div key={index} {...getProps()}>
					fibonacci({index}) = {item};&nbsp;
				</div>
			))}
			{isIndicatorVisible && <div {...getIndicatorProps({ style: { width: 200 } })}>indicator {extra.length}</div>}
		</div>
	);
};
