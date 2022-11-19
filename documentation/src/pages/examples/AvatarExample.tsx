import { useOverflowedItems } from "overflowed/react";

// @docs-line-hidden
import styles from "./AvatarExample.module.css";
// @docs-line-hidden
import { people } from "./data";

export const AvatarExample = () => {
	const [visiblePeople, overflowedPeople, { getContainerProps, getIndicatorProps }] = useOverflowedItems(people);

	return (
		<ul
			// @docs-line-hidden
			className={styles["container"]}
			{...getContainerProps()}
		>
			{visiblePeople.map(([person, getItemProps]) => (
				<li
					key={person.id}
					// @docs-line-hidden
					className={styles["avatar"]}
					{...getItemProps({ style: { backgroundColor: person.color } })}
				>
					{person.initials}
				</li>
			))}
			<li
				// @docs-line-hidden
				className={styles["avatar"]}
				{...getIndicatorProps()}
			>
				+{overflowedPeople.length}
			</li>
		</ul>
	);
};
