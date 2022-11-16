import { Resizable as ReResizable, ResizableProps as ReResizableProps } from "re-resizable";
import { useEffect, useState } from "react";

import "./Resizable.css";

export interface ResizableProps extends ReResizableProps {
	children?: React.ReactNode;
	direction?: "horizontal" | "vertical";
}

const VerticalHandle = (props: any) => <div className="vertical" {...props} />;

export const Resizable = ({ children, direction = "horizontal", ...props }: ResizableProps) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<ReResizable
			{...props}
			handleComponent={{ right: <VerticalHandle /> }}
			enable={{ right: direction === "horizontal" && isMounted }}
			maxWidth="100%"
		>
			{children}
		</ReResizable>
	);
};
