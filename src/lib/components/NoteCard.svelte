<script lang="ts">
  import { config } from '$lib/config';

  interface Note {
    id: number;
    content: string;
    category: string;
    reactions: number;
    created_at: string;
  }

  let { note }: { note: Note } = $props();
  let reactions = $state(0);
  let hasReacted = $state(false);

  $effect(() => {
    reactions = note.reactions;
  });

  const categoryConfig = $derived(
    config.noteCategories.find((c) => c.id === note.category) ?? config.noteCategories[0]
  );

  function formatTimeAgo(dateStr: string): string {
    const date = new Date(dateStr + 'Z');
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    return `${diffDays}d ago`;
  }

  async function handleReaction() {
    if (hasReacted) return;

    try {
      const res = await fetch('/api/notes/reaction', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: note.id })
      });

      if (res.ok) {
        reactions += 1;
        hasReacted = true;
      }
    } catch {}
  }
</script>

<div class="card group cursor-default">
  <div class="relative z-10">
    <div class="flex items-start justify-between mb-3">
      <span class="px-2 py-0.5 text-xs font-mono border border-gray-800 rounded-sm {categoryConfig.color}">
        {categoryConfig.label}
      </span>
      <span class="text-xs font-mono text-gray-600">{formatTimeAgo(note.created_at)}</span>
    </div>

    <p class="text-gray-300 text-sm font-mono leading-relaxed mb-4 whitespace-pre-wrap">{note.content}</p>

    <div class="flex items-center gap-2 pt-3 border-t border-gray-800/50">
      <button
        onclick={handleReaction}
        disabled={hasReacted}
        class="flex items-center gap-1.5 text-xs font-mono transition-colors duration-200
               {hasReacted ? 'text-red-400 cursor-default' : 'text-gray-600 hover:text-red-400 cursor-pointer'}"
      >
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill={hasReacted ? 'currentColor' : 'none'}
          stroke="currentColor"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        >
          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
        </svg>
        <span>{reactions}</span>
      </button>
    </div>
  </div>
</div>
