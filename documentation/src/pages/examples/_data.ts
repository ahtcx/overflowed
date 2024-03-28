export const stargazers = [
	"Charmine Pleavin",
	"Winfred Housby",
	"Ethelbert Vignal",
	"Maribel Petegrew",
	"Pyotr Allso",
	"Stephine Swainsbury",
	"Russell De Biaggi",
	"Orion Ovise",
	"Salim Midgley",
	"Dominique Tyhurst",
	"Emmit Ramsell",
	"Jacqueline Ivermee",
	"Evey Shea",
	"Floyd McFayden",
	"Odele Georg",
	"Franciskus Pellingar",
	"Lorenza Sterland",
	"Jarrett Jacklings",
	"Maud Chasle",
	"Florina Windless",
	"Charmine Pleavin",
	"Winfred Housby",
	"Ethelbert Vignal",
	"Maribel Petegrew",
	"Pyotr Allso",
	"Stephine Swainsbury",
	"Russell De Biaggi",
	"Orion Ovise",
	"Salim Midgley",
	"Dominique Tyhurst",
	"Emmit Ramsell",
	"Jacqueline Ivermee",
	"Evey Shea",
	"Floyd McFayden",
	"Odele Georg",
	"Franciskus Pellingar",
	"Lorenza Sterland",
	"Jarrett Jacklings",
	"Maud Chasle",
	"Florina Windless",
].map((name, index) => ({
	id: index,
	initials: name
		.split(" ")
		.map((p) => p[0])
		.join(""),
	name,
	color: `hsl(${index * 100}, 50%, 50%)`,
}));

export const links = [
	"Home",
	"World",
	"Politics",
	"Business",
	"Opinion",
	"Science",
	"Health",
	"Sports",
	"Arts",
	"Books",
	"Style",
	"Food",
	"Travel",
].map((title, index) => ({
	id: index,
	title,
	url: "/",
}));

export const songs = [
	{
		title: "Dribble",
		artist: "Sycco",
		coverArt: "/assets/examples/playlist/sycco_dribble.jpg",
	},
	{
		title: "Idontknow",
		artist: "Jamie xx",
		coverArt: "/assets/examples/playlist/jamie-xx_i-don-t-know.jpg",
	},
	{
		title: "As It Was",
		artist: "Harry Styles",
		coverArt: "/assets/examples/playlist/harry-styles_as-it-was.jpg",
	},
	{
		title: "Remind Me",
		artist: "High Contrast",
		coverArt: "/assets/examples/playlist/high-contrast_remind-me.jpg",
	},
	{
		title: "Rollin' & Scratchin'",
		artist: "Daft Punk",
		coverArt: "/assets/examples/playlist/daft-punk_rollin-and-scratchin.jpg",
	},
	{
		title: "Glue",
		artist: "Bicep",
		coverArt: "/assets/examples/playlist/bicep_glue.jpg",
	},
].map((song, index) => ({
	...song,
	id: index,
	spotifyLink: "https://open.spotify.com/playlist/1KQ0ofHhPeQ20lS8C0B5Es",
}));

export const toolbarItems = [
	{
		label: "File",
		children: [
			{ label: "New Tab" },
			{ label: "New Window" },
			{ label: "Open File..." },
			{ label: "Close Tab" },
			{ label: "Close Window" },
		],
	},
	{
		label: "Edit",
		children: [
			{ label: "Undo" },
			{ label: "Redo" },
			{ label: "Cut" },
			{ label: "Copy" },
			{ label: "Paste" },
			{ label: "Delete" },
			{ label: "Select All" },
		],
	},
	{
		label: "View",
		children: [{ label: "Zoom In" }, { label: "Zoom Out" }, { label: "Actual Size" }, { label: "Enter Full Screen" }],
	},
	{
		label: "History",
		children: [
			{ label: "Show All History" },
			{ label: "Clear Recent History" },
			{ label: "aht.cx" },
			{ label: "overflowed.aht.cx" },
			{ label: "hitchcox.me" },
			{ label: "transitboard.app" },
			{ label: "github.com" },
			{ label: "localhost:1337" },
		],
	},
	{
		label: "Help",
		children: [{ label: "Get Help" }, { label: "Share Ideas and Feedback" }],
	},
];
