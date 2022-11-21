import * as TabsRadix from "@radix-ui/react-tabs";

import { useEffect, useState } from "react";

import { useTabState } from "./useTabState";

import styles from "./Tabs.module.css";

const tabSlotKey = "tab." as const;
const panelSlotKey = "panel." as const;

type TabSlot = `${typeof tabSlotKey}${string}`;
type PanelSlot = `${typeof panelSlotKey}${string}`;

function isTabSlotEntry(entry: [string, React.ReactNode]): entry is [TabSlot, React.ReactNode] {
	const [key] = entry;
	return key.startsWith(tabSlotKey);
}

function isPanelSlotEntry(entry: [string, React.ReactNode]): entry is [PanelSlot, React.ReactNode] {
	const [key] = entry;
	return key.startsWith(panelSlotKey);
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
		<TabsRadix.Root value={value} onValueChange={(newValue) => setValue(newValue)}>
			<TabsRadix.List className={styles["tabs"]}>
				{tabs.map(([key, content]) => (
					<TabsRadix.Trigger key={key} className={styles["tab"]} value={getBaseKeyFromPanel(key)}>
						{content}
					</TabsRadix.Trigger>
				))}
			</TabsRadix.List>
			{panels.map(([key, content]) => (
				<TabsRadix.Content key={key} value={getBaseKeyFromPanel(key)}>
					{content}
				</TabsRadix.Content>
			))}
		</TabsRadix.Root>
	);
};
