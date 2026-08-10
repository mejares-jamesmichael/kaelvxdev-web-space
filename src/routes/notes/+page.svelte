<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import GeometricLines from "$lib/components/GeometricLines.svelte";
  import NoteForm from "$lib/components/NoteForm.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";
  import NoteFilters from "$lib/components/NoteFilters.svelte";
  import type { PageData } from "./$types";

  let { data, form }: { data: PageData; form?: { success?: boolean; error?: string } } = $props();

  let selectedCategory = $state("all");
  let searchQuery = $state("");

  $effect(() => {
    const cat = $page.url.searchParams.get("category");
    if (cat) {
      selectedCategory = cat;
    }
  });

  function handleFilterChange(category: string) {
    selectedCategory = category;
    const url = new URL($page.url);
    if (category === "all") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", category);
    }
    goto(url, { replaceState: true, keepFocus: true });
  }

  const filteredNotes = $derived(() => {
    let result = data.notes;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (n) =>
          n.content.toLowerCase().includes(q) ||
          n.category.toLowerCase().includes(q)
      );
    }
    return result;
  });

  const notesList = $derived(filteredNotes());
</script>

<svelte:head>
  <title>Notes | kaelvxdev</title>
  <meta name="description" content="Leave an anonymous note or message." />
</svelte:head>

<GeometricLines />

<div class="relative z-10 min-h-screen p-6 md:p-12 lg:p-24 max-w-[1600px] mx-auto pointer-events-auto">
  <header class="mb-12 md:mb-16">
    <div class="flex items-center justify-between gap-4 mb-6">
      <a
        href="/"
        class="inline-flex items-center gap-2 text-xs md:text-sm font-mono text-gray-500 hover:text-white transition-colors duration-200 group"
      >
        <span class="text-gray-600 group-hover:-translate-x-1 transition-transform duration-200">&larr;</span>
        <span>back to home</span>
      </a>

      <div class="flex items-center gap-2 px-2.5 py-1 text-xs font-mono border border-gray-800/80 rounded-sm bg-black/60 backdrop-blur-md text-gray-400">
        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
        <span>{data.notes.length} {data.notes.length === 1 ? 'note' : 'notes'} online</span>
      </div>
    </div>

    <div class="mb-3">
      <h1 class="section-header text-3xl md:text-4xl lg:text-5xl font-bold text-white font-mono tracking-tight flex items-center gap-4">
        <span>Anonymous Notes</span>
        <div class="section-divider hidden sm:block"></div>
      </h1>
    </div>

    <p class="text-gray-400 font-mono text-xs md:text-sm max-w-2xl leading-relaxed">
      // Leave a message, a thought, or feedback. No login required.
    </p>
  </header>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
    <!-- Left Column: Sticky Form -->
    <div class="lg:col-span-1">
      <div class="lg:sticky lg:top-12">
        <NoteForm {form} />
      </div>
    </div>

    <!-- Right Column: Filter & Notes Feed -->
    <div class="lg:col-span-2 space-y-6">
      <NoteFilters
        selected={selectedCategory}
        onchange={handleFilterChange}
        {searchQuery}
        onSearchChange={(q) => (searchQuery = q)}
      />

      {#if notesList.length === 0}
        <div class="card text-center py-16 px-6 border-dashed border-gray-800 bg-black/40 backdrop-blur-sm">
          <div class="w-10 h-10 mx-auto mb-4 rounded-full border border-gray-800 flex items-center justify-center text-gray-600 font-mono text-sm">
            #
          </div>
          <p class="text-gray-400 font-mono text-sm mb-1">
            {#if searchQuery}
              > no notes found matching "{searchQuery}".
            {:else}
              > no notes found in this category.
            {/if}
          </p>
          <p class="text-gray-600 font-mono text-xs">
            // try clearing filters or post a new note on the left.
          </p>
        </div>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {#each notesList as note (note.id)}
            <NoteCard {note} />
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>

