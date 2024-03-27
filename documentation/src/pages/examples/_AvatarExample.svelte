<script lang="ts">
	import { overflowedItems } from "overflowed/svelte";

	// @docs-line-hidden
	import "./_AvatarExample.module.css";
	// @docs-line-hidden
	import { people } from "./_data";

	let [visiblePeople, overflowedPeople, action] = overflowedItems(people, (newVisiblePeople, newOverflowedPeople) => {
		visiblePeople = newVisiblePeople;
		overflowedPeople = newOverflowedPeople;
	});
</script>

<div class="container" use:action.container>
	{#each visiblePeople as person, index}
		<div class="avatar" use:action.item={index}>
			{person.initials}
		</div>
	{/each}
	<div class="avatar" use:action.indicator>
		+{overflowedPeople.length}
	</div>
</div>
