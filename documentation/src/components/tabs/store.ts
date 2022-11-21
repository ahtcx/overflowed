import {  persistentMap } from "@nanostores/persistent";

type TabStore = {
	[key: string]: string;
};

export const tabStore = persistentMap<TabStore>("tabStore", {});

