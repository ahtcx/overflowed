export interface OverflowedOptions {
	direction?: "horizontal" | "vertical";
	onRender: (visibleItemCount: number, indicatorElementOffset: number) => void;

	ResizeObserver?: typeof ResizeObserver;
	IntersectionObserver?: typeof IntersectionObserver;
}

export const HIDDEN_STYLE = {
	userSelect: "none",
	pointerEvents: "none",
	visibility: "hidden",
} as const;

export class Overflowed {
	// private IntersectionObserver: typeof IntersectionObserver | undefined;

	private direction;
	private onRender;

	private resizeObserver: ResizeObserver | undefined;
	// private intersectionObserver: IntersectionObserver | undefined;

	private containerElement?: Element | undefined;
	private indicatorElement?: Element | undefined;

	private isMounted = false;

	constructor({
		ResizeObserver = typeof window === "undefined" ? undefined : window.ResizeObserver,
		// IntersectionObserver = typeof window === "undefined" ? undefined : window.IntersectionObserver,
		//
		direction = "horizontal",
		onRender,
	}: OverflowedOptions) {
		// this.IntersectionObserver = IntersectionObserver;

		this.resizeObserver = ResizeObserver && new ResizeObserver(() => this.requestUpdate());

		this.direction = direction;
		this.onRender = onRender;
	}

	public registerContainerElement(containerElement: Element) {
		this.containerElement = containerElement;

		// if (this.IntersectionObserver)
		// 	this.intersectionObserver = new this.IntersectionObserver(
		// 		(entries) => {
		// 			for (const entry of entries) {
		// 				const index = Array.from(containerElement.children).indexOf(entry.target);
		// 				if (index >= 0) {
		// 					return;
		// 				}
		// 			}
		// 		},
		// 		{ root: containerElement, threshold: 1 },
		// 	);

		this.resizeObserver?.observe(containerElement);
		this.requestUpdate();
	}

	/** Returns styles which must be applied to the container element. */
	public getContainerElementStyles() {
		return {
			display: "flex",
			position: "relative",
			flexDirection: this.direction === "horizontal" ? "row" : "column",
			[(this.direction === "horizontal" ? "overflowX" : "overflowY") as "overflowX"]: this.isMounted ? "clip" : "auto",
		} as const;
	}

	public registerIndicatorElement(indicatorElement: Element) {
		this.indicatorElement = indicatorElement;

		this.resizeObserver?.observe(indicatorElement);
		// this.intersectionObserver?.observe(indicatorElement);

		this.requestUpdate();
	}

	/** Returns styles which must be applied to the indicator element. */
	public getIndicatorElementStyles() {
		return {
			// display: this.isMounted ? undefined : "none",
		} as const;
	}

	public registerItemElement(itemElement: Element) {
		this.resizeObserver?.observe(itemElement);
		// this.intersectionObserver?.observe(itemElement);

		this.requestUpdate();
	}

	/** Should be called after the container element is mounted. */
	public onContainerElementDidMount() {
		this.isMounted = true;
	}

	/** Should be called before the container element is unmounted. */
	public onContainerElementWillUnmount() {
		this.isMounted = false;

		this.resizeObserver?.disconnect();
		// this.intersectionObserver?.disconnect();

		this.containerElement = undefined;
		this.indicatorElement = undefined;
	}

	private previousChildOffsets = [0, 0];
	private update() {
		if (!this.containerElement) return; // throw new Error("TODO 3");

		const containerElementSize =
			this.direction === "horizontal" ? this.containerElement.clientWidth : this.containerElement.clientHeight;
		const indicatorElementSize =
			(this.direction === "horizontal" ? this.indicatorElement?.clientWidth : this.indicatorElement?.clientHeight) ?? 0;

		// todo: r these 3 decls valid? can i do bettr?????!!!!
		const isRtl = getComputedStyle(this.containerElement).direction === "rtl";
		const childrenArray = Array.from(this.containerElement.children) as HTMLElement[];

		for (const [index, child] of childrenArray.entries()) {
			const childSize = this.direction === "horizontal" ? child.clientWidth : child.clientHeight;
			const childOffset =
				this.direction === "horizontal"
					? isRtl
						? containerElementSize - childSize - child.offsetLeft
						: child.offsetLeft
					: child.offsetTop;

			if (childOffset + childSize >= containerElementSize - indicatorElementSize) {
				// const first = this.previousChildOffsets.shift();
				// this.previousChildOffsets.push(childOffset);
				// if (first !== childOffset)
				this.onRender(index, childOffset);
				return;
			}
		}

		this.onRender(childrenArray.length, 0);
	}

	private requestedUpdate = false;
	public requestUpdate() {
		if (this.requestedUpdate) return;

		this.requestedUpdate = true;
		this.update();
		window.requestAnimationFrame(() => {
			this.requestedUpdate = false;
		});
	}
}
