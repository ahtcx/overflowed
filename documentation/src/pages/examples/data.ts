export const people = [
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
}));
