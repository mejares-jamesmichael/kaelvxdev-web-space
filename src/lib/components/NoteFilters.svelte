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

  let isOpen = $state(false);

  const selectedCategoryConfig = $derived(
    config.noteCategories.find((c) => c.id === selected)
  );

  const selectedLabel = $derived(
    selected === 'all' ? 'All Categories' : selectedCategoryConfig?.label ?? 'Category'
  );

  function selectCategory(catId: string) {
    onchange(catId);
    isOpen = false;
  }

  function handleWindowClick(e: MouseEvent) {
    const target = e.target as HTMLElement;
    if (!target.closest('#category-dropdown-container')) {
      isOpen = false;
    }
  }
</script>

<svelte:window onclick={handleWindowClick} />

<div class="flex flex-wrap items-center gap-2.5">
  <!-- Compact Search Input -->
  {#if onSearchChange}
    <div class="relative flex-1 min-w-0">
      <input
        type="text"
        value={searchQuery}
        oninput={(e) => onSearchChange((e.target as HTMLInputElement).value)}
        placeholder="Filter by keyword..."
        class="w-full bg-black/60 border border-gray-800 rounded-sm pl-8 pr-7 py-1.5 text-xs font-mono text-white
               placeholder:text-gray-600 focus:outline-none focus:border-gray-500 transition-colors"
      />
      <!-- Search Icon -->
      <div class="absolute inset-y-0 left-0 pl-2.5 flex items-center pointer-events-none text-gray-600">
        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"></circle>
          <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
        </svg>
      </div>

      {#if searchQuery}
        <button
          type="button"
          onclick={() => onSearchChange('')}
          class="absolute inset-y-0 right-0 pr-2.5 flex items-center text-gray-500 hover:text-white text-xs font-mono"
        >
          ✕
        </button>
      {/if}
    </div>
  {/if}

  <!-- Hamburger / Category Dropdown Trigger -->
  <div id="category-dropdown-container" class="relative">
    <button
      type="button"
      onclick={(e) => {
        e.stopPropagation();
        isOpen = !isOpen;
      }}
      class="flex items-center gap-2 px-3 py-1.5 text-xs font-mono border rounded-sm transition-all duration-200 bg-black/60
             {selected !== 'all'
               ? 'border-gray-400 text-white font-semibold'
               : 'border-gray-800 text-gray-400 hover:border-gray-600 hover:text-gray-200'}"
    >
      <!-- Hamburger Icon -->
      <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="18" y2="18"></line>
      </svg>
      <span>{selectedLabel}</span>
      <span class="text-[9px] text-gray-500 transition-transform duration-200 {isOpen ? 'rotate-180' : ''}">▼</span>
    </button>

    <!-- Dropdown Menu -->
    {#if isOpen}
      <div
        class="absolute left-0 mt-1.5 w-48 bg-black/95 border border-gray-800 rounded-sm shadow-2xl z-30 p-1 font-mono text-xs backdrop-blur-md"
      >
        <button
          type="button"
          onclick={() => selectCategory('all')}
          class="w-full text-left px-3 py-1.5 rounded-sm flex items-center justify-between text-gray-300 hover:bg-gray-900 transition-colors
                 {selected === 'all' ? 'bg-gray-900 text-white font-semibold' : ''}"
        >
          <span>All Categories</span>
          {#if selected === 'all'}
            <span class="text-white text-xs">✓</span>
          {/if}
        </button>

        <div class="h-px bg-gray-800/80 my-1"></div>

        {#each config.noteCategories as cat}
          <button
            type="button"
            onclick={() => selectCategory(cat.id)}
            class="w-full text-left px-3 py-1.5 rounded-sm flex items-center justify-between hover:bg-gray-900 transition-colors {cat.color}
                   {selected === cat.id ? 'bg-gray-900 font-semibold' : ''}"
          >
            <span class="flex items-center gap-1.5">
              <span class="text-[9px]">●</span>
              <span>{cat.label}</span>
            </span>
            {#if selected === cat.id}
              <span class="text-xs">✓</span>
            {/if}
          </button>
        {/each}
      </div>
    {/if}
  </div>

  <!-- Active Filter Pill (Quick Clear) -->
  {#if selected !== 'all'}
    <button
      type="button"
      onclick={() => onchange('all')}
      class="flex items-center gap-1 px-2 py-1 text-[11px] font-mono text-gray-400 border border-gray-800 rounded-sm bg-gray-900/60 hover:text-white hover:border-gray-600 transition-colors"
    >
      <span>filter: {selected}</span>
      <span>✕</span>
    </button>
  {/if}
</div>
