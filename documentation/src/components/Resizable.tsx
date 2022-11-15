import { Resizable as ReResizable, ResizableProps as ReResizableProps } from "re-resizable";
import { useEffect, useState } from "react";

export interface ResizableProps extends ReResizableProps {
	children?: React.ReactNode;
	direction?: "horizontal" | "vertical";
}

const Handle = (props: any) => <div className="handle" {...props} />;

export const Resizable = ({ children, direction = "horizontal", ...props }: ResizableProps) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	return (
		<ReResizable
			{...props}
			handleComponent={{ right: <Handle /> }}
			enable={{ right: direction === "horizontal" && isMounted }}
			maxWidth="100%"
		>
			{children}
		</ReResizable>
	);
};
