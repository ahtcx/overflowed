import { useOverflowedItems } from "./useOverflowedItems";

export const Test = () => {
	const [items, extra, { containerProps, indicatorProps }] = useOverflowedItems(
		// [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233],
		[1, 2, 3],
		{
			// direction: "vertical",
		},
	);

	return (
		<div {...containerProps}>
			{items.map(({ item, props }, index) => (
				<div key={index} {...props}>
					fibonacci({index}) = {item};&nbsp;
				</div>
			))}
			{extra.length > 0 && <div {...indicatorProps}>indicator {extra.length}</div>}
		</div>
	);
};
