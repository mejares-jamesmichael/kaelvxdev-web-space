<script lang="ts">
  import { config } from '$lib/config';

  interface Note {
    id: number;
    content: string;
    category: string;
    reactions: number;
    created_at: string;
  }

  let { notes }: { notes: Note[] } = $props();

  function getCategoryColor(category: string): string {
    return config.noteCategories.find((c) => c.id === category)?.color ?? 'text-gray-400';
  }

  function getCategoryLabel(category: string): string {
    return config.noteCategories.find((c) => c.id === category)?.label ?? 'General';
  }
</script>

<section class="py-20 pointer-events-auto">
  <div class="mb-12">
    <h2 class="section-header">
      <span class="section-number">03.</span>
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
        <div class="card cursor-default">
          <div class="relative z-10">
            <div class="flex items-start justify-between mb-3">
              <span class="px-2 py-0.5 text-xs font-mono border border-gray-800 rounded-sm {getCategoryColor(note.category)}">
                {getCategoryLabel(note.category)}
              </span>
            </div>
            <p class="text-gray-300 text-sm font-mono leading-relaxed mb-3 line-clamp-3">{note.content}</p>
            <div class="flex items-center gap-1.5 text-xs font-mono text-gray-600">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
              </svg>
              <span>{note.reactions}</span>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <a href="/notes" class="btn inline-block text-white">
      > leave a note
    </a>
  {/if}
</section>
