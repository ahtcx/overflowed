export interface OverflowedOptions {
	axis?: "horizontal" | "vertical";
	onUpdate: (visibleItemCount: number, indicatorElementOffset: number) => void;
	disableIndicatorResizeProtection?: boolean;

	ResizeObserver?: typeof ResizeObserver;
}

export type Breakpoint = [lowerBound: number, upperBound: number];

export class Overflowed {
	public readonly axis;

	private onUpdate;

	private resizeObserver: ResizeObserver | undefined;

	private containerElement: HTMLElement | null = null;
	private indicatorElement: HTMLElement | null = null;

	// private disableIndicatorResizeProtection;
	private indicatorSize?: number;

	constructor({
		ResizeObserver = typeof window === "undefined" ? undefined : window.ResizeObserver,
		axis = "horizontal",
		onUpdate,
	}: // disableIndicatorResizeProtection,
	OverflowedOptions) {
		this.resizeObserver =
			ResizeObserver &&
			new ResizeObserver((entries) => {
				for (const entry of entries) {
					if (entry.target === this.indicatorElement) {
						if (entry.target.clientWidth > 0 && entry.target.clientWidth !== this.indicatorSize) {
							console.warn("width doesn't match", this.indicatorSize, entry.target.clientWidth);
						}

						this.indicatorSize = entry.target.clientWidth;
					} else if (entry.target.parentNode === this.containerElement) {
						// console.log(entry.target);
					}
				}
				this.requestUpdate();
			});

		this.axis = axis;
		this.onUpdate = onUpdate;
		// this.disableIndicatorResizeProtection = disableIndicatorResizeProtection;
	}

	public registerContainerElement(containerElement: HTMLElement) {
		this.containerElement = containerElement;

		this.resizeObserver?.observe(containerElement);
		this.requestUpdate();
	}

	public registerIndicatorElement(indicatorElement: HTMLElement) {
		this.indicatorElement = indicatorElement;
		this.indicatorSize = indicatorElement.clientWidth;

		this.resizeObserver?.observe(indicatorElement);
		this.requestUpdate();
	}

	public registerItemElement(itemElement: HTMLElement) {
		this.resizeObserver?.observe(itemElement);

		this.requestUpdate();
	}

	/** Should be called before the container element is unmounted. */
	public onContainerElementWillUnmount() {
		this.resizeObserver?.disconnect();

		this.containerElement = null;
		this.indicatorElement = null;
	}

	private getElementSize(element?: HTMLElement | null) {
		if (!element) {
			return 0;
		}

		if (this.axis === "horizontal") {
			return element.offsetWidth;
		}

		return element.offsetHeight;
	}

	private getElementOffsetFromRight(element?: HTMLElement) {
		if (!element) {
			return 0;
		}

		console.log(element.parentElement);
		if (this.axis === "horizontal") {
			return this.getElementSize(element.parentElement) - this.getElementSize(element) - element.offsetLeft;
		}

		return this.getElementSize(element.parentElement) - this.getElementSize(element) - element.offsetTop;
	}

	private getElementOffsetFromLeft(element?: HTMLElement) {
		if (!element) {
			return 0;
		}

		if (this.axis === "horizontal") {
			return element.offsetLeft;
		}

		return element.offsetTop;
	}

	// TODO: optimize so breakpoints only get calculated when a element changes size and calculate
	// positions based off of that. :)
	private update() {
		if (!this.containerElement) {
			return;
		}

		const { direction, paddingBlockStart, paddingBlockEnd, paddingInlineStart, paddingInlineEnd } =
			window.getComputedStyle(this.containerElement);

		const offsetStartAsString = this.axis === "horizontal" ? paddingInlineStart : paddingBlockStart;
		const offsetEndAsString = this.axis === "horizontal" ? paddingInlineEnd : paddingBlockEnd;

		if (!offsetStartAsString.endsWith("px")) throw new Error("ok");
		if (!offsetEndAsString.endsWith("px")) throw new Error("ok2");

		const offsetStart = parseInt(offsetStartAsString, 10);
		const offsetEnd = parseInt(offsetEndAsString, 10);

		const isRtl = direction === "rtl";

		const containerElementSize = this.getElementSize(this.containerElement) - offsetStart - offsetEnd;
		const indicatorElementSize = this.getElementSize(this.indicatorElement);

		const childrenArray = Array.from(this.containerElement.children)
			.filter((element) => element !== this.indicatorElement)
			.filter(isHtmlElement);

		const getOffset = isRtl ? this.getElementOffsetFromRight.bind(this) : this.getElementOffsetFromLeft.bind(this);

		const breakpoints: Breakpoint[] = [];
		for (const [_index, childElement] of childrenArray.entries()) {
			const childOffset = getOffset(childElement);
			const childSize = this.getElementSize(childElement);

			breakpoints.push([childOffset - offsetStart, childOffset + childSize + offsetEnd]);
		}

		if (breakpoints.length === 0) {
			return;
		}

		const containerIntersectingChildIndex = breakpoints.findIndex(([_start, end]) => end > containerElementSize);
		if (containerIntersectingChildIndex !== -1) {
			const intersectingChildIndex = breakpoints.findIndex(
				([start, end]) => (this.indicatorElement ? start : end) > containerElementSize - indicatorElementSize,
			);

			const newVisibleItemCount = Math.max(intersectingChildIndex - (this.indicatorElement ? 1 : 0), 0);
			const newIndicatorElementOffset = breakpoints[newVisibleItemCount]?.[0]! + offsetStart;

			this.onUpdate(newVisibleItemCount, newIndicatorElementOffset);
		} else {
			this.onUpdate(breakpoints.length, 0);
		}
	}

	private requestedUpdate = false;
	public requestUpdate() {
		if (this.requestedUpdate) {
			return;
		}

		this.requestedUpdate = true;
		this.update();
		window.requestAnimationFrame(() => {
			this.requestedUpdate = false;
		});
	}
}

const isHtmlElement = (element: Element): element is HTMLElement => {
	if (element instanceof HTMLElement) {
		return true;
	}

	throw new Error("Element provided is not a HTMLElement.");
};
