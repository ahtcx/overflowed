<script lang="ts">
	import { overflowedItems } from "overflowed/svelte";

	// @docs-line-hidden
	import "./AvatarExample.module.css";
	// @docs-line-hidden
	import { people } from "./data";

	let [visiblePeople, overflowedPeople, actions] = overflowedItems(people, (newVisiblePeople, newOverflowedPeople) => {
		visiblePeople = newVisiblePeople;
		overflowedPeople = newOverflowedPeople;
	});
</script>

<div class="container" use:actions.container>
	{#each visiblePeople as person, index}
		<div class="avatar" use:actions.item={index}>
			{person.initials}
		</div>
	{/each}
	<div class="avatar" use:actions.indicator>
		+{overflowedPeople.length}
	</div>
</div>
