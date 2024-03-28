import { useStore } from "@nanostores/react";
import { useState } from "react";
import type { Key } from "react-aria-components";

import { tabStore } from "./store";

export function useTabState(initialCurr: Key, storeKey?: string) {
	const $tabStore = useStore(tabStore);

	// Use localState when no storeKey is provided
	// Would be nice to conditionally create this but alas...
	// hooks can't use conditionals :(
	const localState = useState(initialCurr);
	if (!storeKey) {
		return localState;
	}

	const curr = $tabStore[storeKey] ?? initialCurr;
	function setCurrent(newCurr: Key) {
		if (storeKey) {
			tabStore.setKey(storeKey, String(newCurr));
		} else {
			throw new Error(
				"[Tabs] Looks like a sharedStore key is no longer present on your tab view! If your store key is dynamic, consider using a static string value instead.",
			);
		}
	}

	return [curr, setCurrent] as const;
}
