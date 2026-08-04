<script lang="ts">
  import { goto } from "$app/navigation";
  import { page } from "$app/stores";
  import NoteForm from "$lib/components/NoteForm.svelte";
  import NoteCard from "$lib/components/NoteCard.svelte";
  import NoteFilters from "$lib/components/NoteFilters.svelte";
  import type { PageData } from "./$types";

  let {
    data,
    form,
  }: { data: PageData; form?: { success?: boolean; error?: string } } =
    $props();
  let selectedCategory = $state("all");

  $effect(() => {
    selectedCategory;
    handleFilterChange();
  });

  function handleFilterChange() {
    const url = new URL($page.url);
    if (selectedCategory === "all") {
      url.searchParams.delete("category");
    } else {
      url.searchParams.set("category", selectedCategory);
    }
    goto(url, { replaceState: true, keepFocus: true });
  }
</script>

<svelte:head>
  <title>Notes | kaelvxdev</title>
  <meta name="description" content="Leave an anonymous note or message." />
</svelte:head>

<div class="min-h-screen p-12 md:p-24 max-w-[1600px] mx-auto">
  <header class="mb-16">
    <a
      href="/"
      class="text-sm font-mono text-gray-500 hover:text-white transition-colors mb-8 inline-block"
    >
      &#8592; back
    </a>

    <h1
      class="text-4xl md:text-5xl font-bold text-white mb-4 font-mono tracking-tight"
    >
      Anonymous Notes
    </h1>
    <p class="text-gray-400 font-mono text-sm max-w-xl">
      // Leave a message, a thought, or just say hi. No account needed.
    </p>
  </header>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-12">
    <div class="lg:col-span-1">
      <div class="lg:sticky lg:top-12">
        <NoteForm {form} />
      </div>
    </div>

    <div class="lg:col-span-2">
      <div class="mb-6">
        <NoteFilters bind:selected={selectedCategory} />
      </div>

      {#if data.notes.length === 0}
        <div class="card text-center py-12">
          <p class="text-gray-500 font-mono text-sm">
            > no notes yet. be the first!
          </p>
        </div>
      {:else}
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          {#each data.notes as note (note.id)}
            <NoteCard {note} />
          {/each}
        </div>
      {/if}
    </div>
  </div>
</div>
