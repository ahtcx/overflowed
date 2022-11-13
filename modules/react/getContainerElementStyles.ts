type B = "horizontal" | "horizontal_unmounted" | "vertical" | "vertical_unmounted";

export const getContainerElementStyles = (a: B) => ({
	display: "flex",
	position: "relative",
	flexDirection: this.direction === "horizontal" ? "row" : "column",
	[(this.direction === "horizontal" ? "overflowX" : "overflowY") as "overflowX"]: this.isMounted ? "clip" : "auto",
});
