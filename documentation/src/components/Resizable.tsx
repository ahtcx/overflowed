import { DragHandleHorizontalIcon, DragHandleVerticalIcon } from "@radix-ui/react-icons";
import clsx from "clsx";
import { Resizable as ReResizable, ResizableProps as ReResizableProps } from "re-resizable";
import { useEffect, useState } from "react";

import styles from "./Resizable.module.css";

export interface ResizableProps extends ReResizableProps {
	children?: React.ReactNode;
	axis?: "horizontal" | "vertical";
}

const HorizontalHandle = (props: any) => (
	<div className={clsx(styles["handle"], styles["horizontal"])} {...props}>
		<DragHandleHorizontalIcon />
	</div>
);
const VerticalHandle = (props: any) => (
	<div className={clsx(styles["handle"], styles["vertical"])} {...props}>
		<DragHandleVerticalIcon />
	</div>
);

export const Resizable = ({ children, axis = "horizontal", ...props }: ResizableProps) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<ReResizable
			{...props}
			handleComponent={{ right: <VerticalHandle />, bottom: <HorizontalHandle /> }}
			enable={{ right: axis === "horizontal" && isMounted, bottom: axis === "vertical" && isMounted }}
			maxWidth="100%"
		>
			{children}
		</ReResizable>
	);
};
