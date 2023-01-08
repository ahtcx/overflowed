import { useOverflowedItems } from "overflowed/react";

// @docs-line-hidden
import { songs } from "./data";

// @docs-line-hidden
import styles from "./PlaylistExample.module.scss";

export const PlaylistExample = () => {
	const [visibleSongs, overflowedSongs, { getContainerProps, getIndicatorProps }] = useOverflowedItems(songs);

	return (
		<div className={styles.playlist}>
			<h1>Liked Songs</h1>
			<ul className={styles.songs} {...getContainerProps()}>
				{visibleSongs.map(([song, getItemProps]) => (
					<li key={song.id} className={styles.song} {...getItemProps({ style: { transition: "opacity 0.2s" } })}>
						<a href={song.spotifyLink} target="_blank">
							<article>
								<img src={song.coverArt} />
								<header>
									<h1>{song.title}</h1>
									<h2>{song.artist}</h2>
								</header>
							</article>
						</a>
					</li>
				))}
				<li className={styles.indicator} data-count={overflowedSongs.length} {...getIndicatorProps()}>
					{overflowedSongs.slice(0, 4).map((song) => (
						<a key={song.id} href={song.spotifyLink}>
							<img src={song.coverArt} />
						</a>
					))}
				</li>
			</ul>
		</div>
	);
};
