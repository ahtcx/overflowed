import { useOverflowedItems } from "overflowed/react";

// @docs-line-hidden
import styles from "./_AvatarExample.module.css";
// @docs-line-hidden
import { stargazers } from "./_data";

export const AvatarExample = () => {
	const [visibleStargazers, overflowedStargazers, { getContainerProps, getIndicatorProps }] =
		useOverflowedItems(stargazers);

	return (
		<div
			// @docs-line-hidden
			className={styles["root"]}
		>
			<h2>
				Starred by{" "}
				<span
					// @docs-line-hidden
					className={styles["counter"]}
				>
					{stargazers.length}
				</span>
			</h2>
			<ul
				// @docs-line-hidden
				className={styles["container"]}
				{...getContainerProps()}
			>
				{visibleStargazers.map(([stargazer, getItemProps]) => (
					<li
						key={stargazer.id}
						// @docs-line-hidden
						className={styles["avatar"]}
						{...getItemProps({ style: { backgroundColor: stargazer.color } })}
					>
						{stargazer.initials}
					</li>
				))}
				<li
					// @docs-line-hidden
					className={styles["avatar"]}
					{...getIndicatorProps()}
				>
					+{overflowedStargazers.length}
				</li>
			</ul>
		</div>
	);
};
