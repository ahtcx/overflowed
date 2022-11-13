import { useOverflowedItems } from "./useOverflowedItems";

export interface TestProps {
	className: string;
}

export const Test = ({ className }: TestProps) => {
	const [visibleItems, overflowedItems, { getContainerProps, getIndicatorProps }] = useOverflowedItems(
		// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233],
		[1, 2, 3],
		{
			// enableEmptyOverflowedItems: true,
			// direction: "vertical",
		},
	);

	return (
		<div className={className} {...getContainerProps()}>
			{visibleItems.map(({ item, getProps }, index) => (
				<div key={index} {...getProps()}>
					fibonacci({index}) = {item};&nbsp;
				</div>
			))}
			{overflowedItems && (
				<div {...getIndicatorProps({ style: { width: 200, backgroundColor: "black", color: "white" } })}>
					indicator {overflowedItems.length}
				</div>
			)}
		</div>
	);
};
