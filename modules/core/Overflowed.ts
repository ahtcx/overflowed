export interface OverflowedOptions {
	direction?: "horizontal" | "vertical";
	onUpdate: (visibleItemCount: number, indicatorElementOffset: number) => void;
	disableIndicatorResizeProtection?: boolean;

	ResizeObserver?: typeof ResizeObserver;
}

export type Breakpoint = [minimumSize: number, maximumSize: number];

export class Overflowed {
	public readonly direction;

	private onUpdate;

	private resizeObserver: ResizeObserver | undefined;

	private containerElement?: HTMLElement | undefined;
	private indicatorElement?: HTMLElement | undefined;

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

		this.direction = direction;
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

		this.containerElement = undefined;
		this.indicatorElement = undefined;
	}

	private getElementSize(element?: HTMLElement | null) {
		if (!element) {
			return 0;
		}

		if (this.direction === "horizontal") {
			return element.offsetWidth;
		}

		return element.offsetHeight;
	}

	private getElementOffsetRtlFromRight(element?: HTMLElement) {
		if (!element) {
			return 0;
		}

		if (this.direction === "horizontal") {
			return this.getElementSize(element.parentElement) - this.getElementSize(element) - element.offsetLeft;
		}

		return this.getElementSize(element.parentElement) - this.getElementSize(element) - element.offsetTop;
	}

	private getElementOffsetFromLeft(element?: HTMLElement) {
		if (!element) {
			return 0;
		}

		if (this.direction === "horizontal") {
			return element.offsetLeft;
		}

		return element.offsetTop;
	}

	private breakpoints: Breakpoint[] = [];
	private updateBreakpoints() {
		if (!this.containerElement) {
			return;
		}

		const containerComputedStyles = window.getComputedStyle(this.containerElement);

		const offsetStart = parseInt(containerComputedStyles.paddingInlineStart, 10);
		const offsetEnd = parseInt(containerComputedStyles.paddingInlineEnd, 10);

		const isRtl = containerComputedStyles.direction === "rtl";

		const containerElementSize = this.getElementSize(this.containerElement) - offsetStart - offsetEnd;
		const indicatorElementSize = this.getElementSize(this.indicatorElement);

		const childrenArray = Array.from(this.containerElement.children)
			.filter(isHtmlElement)
			.filter((element) => element !== this.indicatorElement);

		if (childrenArray.length === 0) {
			throw new Error("length shouldn't be zero, or nah?");
		}

		const getOffset = isRtl ? this.getElementOffsetRtlFromRight.bind(this) : this.getElementOffsetFromLeft.bind(this);

		const newBreakpoints: Breakpoint[] = [];

		for (const [_index, childElement] of childrenArray.entries()) {
			const childOffset = getOffset(childElement) - offsetStart;
			const childSize = this.getElementSize(childElement);

			newBreakpoints.push([childOffset, childOffset + childSize]);
		}

		const containerIntersectingChildIndex = newBreakpoints.findIndex(([_start, end]) => end > containerElementSize); // - indicatorElementSize);

		if (containerIntersectingChildIndex !== -1) {
			const newVisibleItemCount = Math.max(
				newBreakpoints.findIndex(([start]) => start > containerElementSize - indicatorElementSize) - 1,
				0,
			);

			const newIndicatorElementOffset = newBreakpoints[newVisibleItemCount]?.[0]! + offsetStart;

			this.onUpdate(newVisibleItemCount, newIndicatorElementOffset);
		} else {
			this.onUpdate(newBreakpoints.length, 0);
		}
	}

	// private previousChildOffsets = [0, 0];
	private update() {
		if (!this.containerElement) {
			return; // throw new Error("TODO 3");
		}

		this.updateBreakpoints();
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

	throw new Error("NOPE 1");
};
