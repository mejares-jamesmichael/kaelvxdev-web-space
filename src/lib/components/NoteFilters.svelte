<script lang="ts">
  import { config } from '$lib/config';

  let {
    selected = 'all',
    onchange,
    searchQuery = '',
    onSearchChange
  }: {
    selected?: string;
    onchange: (category: string) => void;
    searchQuery?: string;
    onSearchChange?: (query: string) => void;
  } = $props();
</script>

<div class="space-y-3">
  {#if onSearchChange}
    <div class="relative">
      <input
        type="text"
        value={searchQuery}
        oninput={(e) => onSearchChange((e.target as HTMLInputElement).value)}
        placeholder="Filter notes by keyword..."
        class="w-full bg-black/50 border border-gray-800 rounded-sm px-4 py-2 text-xs font-mono text-white
               placeholder:text-gray-600 focus:outline-none focus:border-gray-500 transition-colors"
      />
      {#if searchQuery}
        <button
          type="button"
          onclick={() => onSearchChange('')}
          class="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-white text-xs font-mono"
        >
          ✕
        </button>
      {/if}
    </div>
  {/if}

  <div class="flex flex-wrap gap-2">
    <button
      type="button"
      onclick={() => onchange('all')}
      class="px-3 py-1 text-xs font-mono border rounded-sm transition-all duration-200
             {selected === 'all'
               ? 'border-white text-white bg-white/10 font-semibold'
               : 'border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300'}"
    >
      All
    </button>
    {#each config.noteCategories as cat}
      <button
        type="button"
        onclick={() => onchange(cat.id)}
        class="px-3 py-1 text-xs font-mono border rounded-sm transition-all duration-200
               {selected === cat.id
                 ? 'border-white text-white bg-white/10 font-semibold'
                 : 'border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300'}"
      >
        {cat.label}
      </button>
    {/each}
  </div>
</div>
