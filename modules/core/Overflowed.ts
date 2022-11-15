export interface OverflowedOptions {
	direction?: "horizontal" | "vertical";
	onUpdate: (visibleItemCount: number, indicatorElementOffset: number) => void;
	disableIndicatorResizeProtection?: boolean;

	ResizeObserver?: typeof ResizeObserver;
}

export class Overflowed {
	public readonly direction;

	private onUpdate;

	private resizeObserver: ResizeObserver | undefined;

	private containerElement?: Element | undefined;
	private indicatorElement?: Element | undefined;

	// private disableIndicatorResizeProtection;
	private indicatorSize?: number;

	constructor({
		ResizeObserver = typeof window === "undefined" ? undefined : window.ResizeObserver,
		//
		direction = "horizontal",
		onUpdate,
		disableIndicatorResizeProtection,
	}: OverflowedOptions) {
		this.resizeObserver =
			ResizeObserver &&
			new ResizeObserver((entries) => {
				for (const entry of entries) {
					if (entry.target === this.indicatorElement) {
						if (entry.target.clientWidth > 0 && entry.target.clientWidth !== this.indicatorSize)
							console.warn("width doesn't match", this.indicatorSize, entry.target.clientWidth);

						this.indicatorSize = entry.target.clientWidth;
					} else if (entry.target.parentNode === this.containerElement) {
						console.log(entry.target);
					}
				}
				this.requestUpdate();
			});

		this.direction = direction;
		this.onUpdate = onUpdate;
		// this.disableIndicatorResizeProtection = disableIndicatorResizeProtection;
	}

	public registerContainerElement(containerElement: Element) {
		this.containerElement = containerElement;

		this.resizeObserver?.observe(containerElement);
		this.requestUpdate();
	}

	public registerIndicatorElement(indicatorElement: Element) {
		this.indicatorElement = indicatorElement;
		this.indicatorSize = indicatorElement.clientWidth;

		this.resizeObserver?.observe(indicatorElement);
		this.requestUpdate();
	}

	public registerItemElement(itemElement: Element) {
		this.resizeObserver?.observe(itemElement);

		this.requestUpdate();
	}

	/** Should be called before the container element is unmounted. */
	public onContainerElementWillUnmount() {
		this.resizeObserver?.disconnect();

		this.containerElement = undefined;
		this.indicatorElement = undefined;
	}

	// private previousChildOffsets = [0, 0];
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
				this.onUpdate(index, childOffset);
				return;
			}
		}

		this.onUpdate(childrenArray.length, 0);
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
