<script lang="ts">
  import NoteCard from './NoteCard.svelte';

  interface Note {
    id: number;
    content: string;
    category: string;
    reactions: number;
    created_at: string;
  }

  let { notes }: { notes: Note[] } = $props();
</script>

<section class="py-20 pointer-events-auto">
  <div class="mb-12">
    <h2 class="section-header">
      <span class="section-number">04.</span>
      <span>Recent Notes</span>
      <div class="section-divider"></div>
    </h2>
    <p class="section-description">
      // Anonymous messages from visitors
    </p>
  </div>

  {#if notes.length === 0}
    <div class="card text-center py-8">
      <p class="text-gray-500 font-mono text-sm">> no notes yet. be the first!</p>
    </div>
  {:else}
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      {#each notes as note (note.id)}
        <NoteCard {note} />
      {/each}
    </div>

    <a href="/notes" class="btn inline-block text-white">
      > leave a note
    </a>
  {/if}
</section>
