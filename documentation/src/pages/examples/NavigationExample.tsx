import { useOverflowedItems } from "overflowed/react";

// @docs-line-hidden
import styles from "./NavigationExample.module.css";
// @docs-line-hidden
import { links } from "./data";

export const NavigationExample = () => {
	const [visibleLinks, overflowedLinks, { getContainerProps, getIndicatorProps }] = useOverflowedItems(links);

	return (
		<ul
			// @docs-line-hidden
			className={styles["container"]}
			{...getContainerProps()}
		>
			{visibleLinks.map(([link, getProps]) => (
				<li key={link.id} {...getProps()}>
					<a
						href={link.url}
						// @docs-line-hidden
						onClick={(event) => event.preventDefault()}
					>
						{link.title}
					</a>
				</li>
			))}
			<li {...getIndicatorProps()}>More</li>
		</ul>
	);
};
