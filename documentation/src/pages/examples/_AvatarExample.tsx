import { useOverflowedItems } from "overflowed/react";

import styles from "./_AvatarExample.module.css"; // @docs-line-hidden
import { stargazers } from "./_data"; // @docs-line-hidden

export const AvatarExample = () => {
	const [visibleStargazers, overflowedStargazers, { getContainerProps, getIndicatorProps }] =
		useOverflowedItems(stargazers);

	return (
		<div
			className={styles["root"]} // @docs-line-hidden
		>
			<h2>
				Starred by{" "}
				<span
					className={styles["counter"]} // @docs-line-hidden
				>
					{stargazers.length}
				</span>
			</h2>
			<ul
				className={styles["container"]} // @docs-line-hidden
				{...getContainerProps()}
			>
				{visibleStargazers.map(([stargazer, getItemProps]) => (
					<li
						key={stargazer.id}
						className={styles["avatar"]} // @docs-line-hidden
						{...getItemProps({ style: { backgroundColor: stargazer.color } })}
					>
						{stargazer.initials}
					</li>
				))}
				<li
					className={styles["avatar"]} // @docs-line-hidden
					{...getIndicatorProps()}
				>
					+{overflowedStargazers.length}
				</li>
			</ul>
		</div>
	);
};
