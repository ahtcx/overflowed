import { useOverflowedItems } from "overflowed/react";

// @docs-line-hidden
import { songs } from "./data";

// @docs-line-hidden
import styles from "./PlaylistExample.module.css";

export const PlaylistExample = () => {
	const [visibleSongs, overflowedSongs, { getContainerProps, getIndicatorProps }] = useOverflowedItems(songs);

	return (
		<>
			<h1>Liked Songs</h1>
			<ul className={styles["container"]} {...getContainerProps()}>
				{visibleSongs.map(([song, getItemProps]) => (
					<li key={song.id} {...getItemProps({ style: { transition: "opacity 0.2s" } })}>
						<a href={song.spotifyLink} target="_blank">
							<article className={styles["cover"]}>
								<img src={song.coverArt} />
								<header>
									<h1>{song.title}</h1>
									<h2>{song.artist}</h2>
								</header>
							</article>
						</a>
					</li>
				))}
				<li className={styles["indicator"]} data-count={overflowedSongs.length} {...getIndicatorProps()}>
					{overflowedSongs.slice(0, 4).map((song) => (
						<a href={song.spotifyLink}>
							<img key={song.id} src={song.coverArt} />
						</a>
					))}
				</li>
			</ul>
		</>
	);
};
