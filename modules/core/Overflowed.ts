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

	private getElementComputedValues(element: HTMLElement) {
		const {
			direction,
			marginBlockStart,
			marginBlockEnd,
			marginInlineStart,
			marginInlineEnd,
			paddingBlockStart,
			paddingBlockEnd,
			paddingInlineStart,
			paddingInlineEnd,
		} = window.getComputedStyle(element);

		const marginStartAsString = this.axis === "horizontal" ? marginInlineStart : marginBlockStart;
		const marginEndAsString = this.axis === "horizontal" ? marginInlineEnd : marginBlockEnd;
		const paddingStartAsString = this.axis === "horizontal" ? paddingInlineStart : paddingBlockStart;
		const paddingEndAsString = this.axis === "horizontal" ? paddingInlineEnd : paddingBlockEnd;

		if (marginStartAsString && !marginStartAsString.endsWith("px")) throw new Error("ok1");
		if (marginEndAsString && !marginEndAsString.endsWith("px")) throw new Error("ok2");
		if (paddingStartAsString && !paddingStartAsString.endsWith("px")) throw new Error("ok3");
		if (paddingEndAsString && !paddingEndAsString.endsWith("px")) throw new Error("ok4");

		const marginStart = parseInt(marginStartAsString || "0", 10);
		const marginEnd = parseInt(marginEndAsString || "0", 10);
		const paddingStart = parseInt(paddingStartAsString || "0", 10);
		const paddingEnd = parseInt(paddingEndAsString || "0", 10);

		const isRtl = direction === "rtl";

		return { isRtl, marginStart, marginEnd, paddingStart, paddingEnd };
	}

	// TODO: optimize so breakpoints only get calculated when a element changes size and calculate
	// positions based off of that. :)
	private update() {
		if (!this.containerElement) {
			return;
		}

		const {
			isRtl,
			paddingStart: containerPaddingStart,
			paddingEnd: containerPaddingEnd,
		} = this.getElementComputedValues(this.containerElement);
		const indicatorMarginEnd = this.indicatorElement
			? this.getElementComputedValues(this.indicatorElement).marginEnd
			: 0;

		const containerElementSize =
			this.getElementSize(this.containerElement) - containerPaddingStart - containerPaddingEnd;
		const indicatorElementSize = this.getElementSize(this.indicatorElement) + indicatorMarginEnd;

		const childrenArray = Array.from(this.containerElement.children)
			.filter((element) => element !== this.indicatorElement)
			.filter(isHtmlElement);

		const getOffset = isRtl ? this.getElementOffsetFromRight.bind(this) : this.getElementOffsetFromLeft.bind(this);

		const breakpoints: Breakpoint[] = [];
		for (const childElement of childrenArray.values()) {
			const childOffset = getOffset(childElement);
			const childSize = this.getElementSize(childElement);

			breakpoints.push([childOffset - containerPaddingStart, childOffset + childSize + containerPaddingEnd]);
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
			const newIndicatorElementOffset = breakpoints[newVisibleItemCount]![0] + containerPaddingStart;

			this.onUpdate(newVisibleItemCount, newIndicatorElementOffset);
		} else {
			this.onUpdate(breakpoints.length, breakpoints[breakpoints.length - 1]![0] + containerPaddingStart);
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
