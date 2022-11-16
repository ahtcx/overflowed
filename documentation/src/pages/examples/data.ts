export const people = [
	"Alexandre H",
	"Hannah S",
	"Alan G",
	"Nathalie H",
	"Michael H",
	"Anne-Sophie H",
	"Alexandre H",
	"Hannah S",
	"Alan G",
	"Nathalie H",
	"Michael H",
	"Anne-Sophie H",
	"Anne-Sophie H",
].map((name, index) => ({
	id: index,
	initials: name
		.split(" ")
		.map((p) => p[0])
		.join(""),
	name,
	color: `hsl(${index * 100}, 50%, 50%)`,
}));
