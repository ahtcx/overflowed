import { Tabs as TabsRoot, TabList, Tab, TabPanel } from "react-aria-components";

import { isValidElement, useEffect, useState } from "react";

import { useTabState } from "./useTabState";

import styles from "./Tabs.module.css";

const tabSlotKey = "tab." as const;
const panelSlotKey = "panel." as const;

type TabSlot = `${typeof tabSlotKey}${string}`;
type PanelSlot = `${typeof panelSlotKey}${string}`;

interface NodeProps {
	value: string;
}

function isTabSlotEntry(entry: [string, React.ReactNode]): entry is [TabSlot, React.ReactNode] {
	const [key, node] = entry;
	return key.startsWith(tabSlotKey) && isValidElement<NodeProps>(node) && !!node.props.value.toString();
}

function isPanelSlotEntry(entry: [string, React.ReactNode]): entry is [PanelSlot, React.ReactNode] {
	const [key, node] = entry;
	return key.startsWith(panelSlotKey) && isValidElement<NodeProps>(node) && !!node.props.value.toString();
}

function getBaseKeyFromPanel(slot: string = "") {
	return slot.split(".")[1]!;
}

export interface TabsProps {
	[key: TabSlot | PanelSlot]: React.ReactNode;
	sharedStore?: string;
}

export const Tabs = ({ sharedStore, ...slots }: TabsProps) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const slotEntries = Object.entries(slots).sort(([keyA], [keyB]) => {
		const indexA = parseInt(getBaseKeyFromPanel(keyA), 10);
		const indexB = parseInt(getBaseKeyFromPanel(keyB), 10);

		return indexA - indexB;
	});

	const tabs = slotEntries.filter(isTabSlotEntry);
	const panels = slotEntries.filter(isPanelSlotEntry);

	const firstPanelKey = panels[0]?.[0];

	const [value, setValue] = useTabState(getBaseKeyFromPanel(firstPanelKey), sharedStore);

	if (!isMounted) {
		return (
			<>
				{panels.map(([key, content], index) => (
					<details className={styles["details"]} key={getBaseKeyFromPanel(key)} open={index === 0}>
						<summary className={styles["tab"]}>{tabs[index]![1]}</summary>
						{content}
					</details>
				))}
			</>
		);
	}

	return (
		<TabsRoot selectedKey={value} onSelectionChange={(newValue) => setValue(newValue)}>
			<TabList className={styles["tabs"]}>
				{tabs.map(([key, content]) => (
					<Tab key={key} className={styles["tab"]} id={getBaseKeyFromPanel(key)}>
						{content}
					</Tab>
				))}
			</TabList>
			{panels.map(([key, content]) => (
				<TabPanel key={key} id={getBaseKeyFromPanel(key)}>
					{content}
				</TabPanel>
			))}
		</TabsRoot>
	);
};
