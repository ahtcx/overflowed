import { useOverflowedItems } from "overflowed/react";

// @docs-hidden
import "./AvatarExample.css";
// @docs-hidden
import { people } from "./data";

export const AvatarExample = () => {
	const [visiblePeople, overflowedPeople, { getContainerProps, getIndicatorProps }] = useOverflowedItems(people);

	return (
		<div className="container" {...getContainerProps()} dir="ltr">
			{visiblePeople.map(({ item, getProps }) => (
				<div key={item.id} className="avatar" {...getProps({ style: { backgroundColor: item.color } })}>
					{item.initials}
				</div>
			))}
			<div className="avatar long" {...getIndicatorProps()}>
				+{overflowedPeople.length}
			</div>
		</div>
	);
};
