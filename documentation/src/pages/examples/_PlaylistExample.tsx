import clsx from "clsx"; // @docs-line-hidden
import { useOverflowedItems } from "overflowed/react";
import { useState } from "react"; // @docs-line-hidden

import { songs } from "./_data"; // @docs-line-hidden

import styles from "./_PlaylistExample.module.scss"; // @docs-line-hidden

export const PlaylistExample = () => {
	const [visibleSongs, overflowedSongs, { getContainerProps, getIndicatorProps }] = useOverflowedItems(songs);
	const [isExpanded, setIsExpanded] = useState(false);

	return (
		<article
			className={styles.playlist} // @docs-line-hidden
		>
			<header>
				<h1>Overflowed</h1>
				<h2>Playlist</h2>
			</header>
			<ul
				className={clsx(styles.songs, !isExpanded && styles.songsIsNotExpanded)} // @docs-line-hidden
				{...getContainerProps()}
			>
				{visibleSongs.map(([song, getItemProps]) => (
					<li
						key={song.id}
						className={styles.song} // @docs-line-hidden
						{...getItemProps()}
					>
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
				<li
					className={styles.indicator} // @docs-line-hidden
					data-count={overflowedSongs.length}
					{...getIndicatorProps()}
				>
					<button onClick={() => setIsExpanded(true)} data-text={`+${overflowedSongs.length}`}>
						{overflowedSongs.slice(0, 4).map((song) => (
							<img key={song.id} src={song.coverArt} />
						))}
					</button>
				</li>
				{isExpanded && (
					<li
						className={styles.indicator} // @docs-line-hidden
					>
						<button onClick={() => setIsExpanded(false)} data-text="⨉" />
					</li>
				)}
			</ul>
		</article>
	);
};
