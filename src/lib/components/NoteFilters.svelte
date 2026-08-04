<script lang="ts">
  import { config } from '$lib/config';

  let { selected = $bindable('all') }: { selected: string } = $props();
</script>

<div class="flex flex-wrap gap-2">
  <button
    onclick={() => (selected = 'all')}
    class="px-3 py-1 text-xs font-mono border rounded-sm transition-all duration-200
           {selected === 'all'
             ? 'border-white text-white bg-white/10'
             : 'border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300'}"
  >
    All
  </button>
  {#each config.noteCategories as cat}
    <button
      onclick={() => (selected = cat.id)}
      class="px-3 py-1 text-xs font-mono border rounded-sm transition-all duration-200
             {selected === cat.id
               ? 'border-white text-white bg-white/10'
               : 'border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300'}"
    >
      {cat.label}
    </button>
  {/each}
</div>
