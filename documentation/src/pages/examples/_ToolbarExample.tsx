import { TriangleRightIcon } from "@radix-ui/react-icons"; // @docs-line-hidden
import { useOverflowedItems } from "overflowed/react";
import { Button, Menu, MenuItem, MenuTrigger, Popover, SubmenuTrigger, Toolbar } from "react-aria-components"; // @docs-line-hidden

import styles from "./_ToolbarExample.module.css"; // @docs-line-hidden
import { toolbarItems } from "./_data"; // @docs-line-hidden

export const ToolbarExample = () => {
	const [visibleToolbarItems, overflowedToolbarItems, { getContainerProps, getIndicatorProps }] =
		useOverflowedItems(toolbarItems);

	return (
		<Toolbar
			className={styles.toolbar} // @docs-line-hidden
			{...getContainerProps()}
		>
			{visibleToolbarItems.map(([link, getProps], index) => (
				<MenuTrigger key={index}>
					<Button
						className={styles.button} // @docs-line-hidden
						{...getProps()}
					>
						{link.label}
					</Button>
					<Popover>
						<Menu
							className={styles.menu} // @docs-line-hidden
						>
							{link.children.map((childItem, index) => (
								<MenuItem
									className={styles.menu_item} // @docs-line-hidden
									key={index}
								>
									{childItem.label}
								</MenuItem>
							))}
						</Menu>
					</Popover>
				</MenuTrigger>
			))}
			<MenuTrigger>
				<Button
					className={styles.button} // @docs-line-hidden
					{...getIndicatorProps()}
				>
					More
				</Button>
				<Popover>
					<Menu
						className={styles.menu} // @docs-line-hidden
					>
						{overflowedToolbarItems.map((toolbarItem, index) => (
							<SubmenuTrigger key={index}>
								<MenuItem
									className={styles.menu_item} // @docs-line-hidden
								>
									{toolbarItem.label} <TriangleRightIcon />
								</MenuItem>
								<Popover>
									<Menu
										className={styles.menu} // @docs-line-hidden
									>
										{toolbarItem.children.map((toolbarItemChild, index) => (
											<MenuItem
												className={styles.menu_item} // @docs-line-hidden
												key={index}
											>
												{toolbarItemChild.label}
											</MenuItem>
										))}
									</Menu>
								</Popover>
							</SubmenuTrigger>
						))}
					</Menu>
				</Popover>
			</MenuTrigger>
		</Toolbar>
	);
};
