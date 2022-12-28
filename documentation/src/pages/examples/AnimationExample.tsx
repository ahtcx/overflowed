import { useOverflowedItems } from "overflowed/react";

// @docs-line-hidden
import styles from "./AnimationExample.module.css";

// @docs-line-hidden
import { mulberry32 } from "./utilities";

// @docs-line-hidden
const MINIMUM_DURATION_IN_MS = 8000;
// @docs-line-hidden
const MAXIMUM_DURATION_IN_MS = 16000;

// @docs-line-hidden
const randomDurationInMs = (seed: number) =>
	// @docs-line-hidden
	Math.floor(mulberry32(seed) * (MAXIMUM_DURATION_IN_MS - MINIMUM_DURATION_IN_MS + 1) + MINIMUM_DURATION_IN_MS);

// @docs-line-hidden
const LETTERS = "I♥OVERFLOWED".split("");

export const AnimationExample = () => {
	const [visibleLetters, overflowedLetters, { getContainerProps, getIndicatorProps }] = useOverflowedItems(LETTERS);

	return (
		<div
			// @docs-line-hidden
			className={styles["root"]}
			{...getContainerProps()}
		>
			{visibleLetters.map(([letter, getProps], index) => (
				<span
					key={index}
					// @docs-line-hidden
					className={styles["letter"]}
					{...getProps(
						// @docs-line-hidden
						{
							// @docs-line-hidden
							style: {
								// @docs-line-hidden
								animationDuration: `${randomDurationInMs(index)}ms, ${randomDurationInMs(
									// @docs-line-hidden
									LETTERS.length * 0 + index,
									// @docs-line-hidden
								)}ms, ${randomDurationInMs(LETTERS.length * 2 + index)}ms`,
								// @docs-line-hidden
							},
							// @docs-line-hidden
						},
					)}
				>
					{letter}
				</span>
			))}
			<div
				// @docs-line-hidden
				className={styles["indicator"]}
				{...getIndicatorProps()}
			>
				{overflowedLetters.join("")}
			</div>
		</div>
	);
};
