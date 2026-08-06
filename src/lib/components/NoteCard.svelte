<script lang="ts">
  import { config } from '$lib/config';
  import { onMount } from 'svelte';

  interface Note {
    id: number;
    content: string;
    category: string;
    reactions: number;
    created_at: string;
  }

  let { note, isPreview = false }: { note: Note; isPreview?: boolean } = $props();

  let reactions = $state(0);
  let hasReacted = $state(false);
  let copied = $state(false);

  $effect(() => {
    reactions = note.reactions;
  });

  onMount(() => {
    if (isPreview) return;
    try {
      const stored = localStorage.getItem('kaelvx_reacted_notes');
      if (stored) {
        const reactedIds: number[] = JSON.parse(stored);
        if (reactedIds.includes(note.id)) {
          hasReacted = true;
        }
      }
    } catch {}
  });

  const categoryConfig = $derived(
    config.noteCategories.find((c) => c.id === note.category) ?? config.noteCategories[0]
  );

  function formatTimeAgo(dateStr: string): string {
    if (!dateStr) return 'just now';
    const date = new Date(dateStr.endsWith('Z') ? dateStr : dateStr + 'Z');
    if (isNaN(date.getTime())) return 'just now';

    const now = new Date();
    const diffMs = Math.max(0, now.getTime() - date.getTime());
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMins / 60);
    const diffDays = Math.floor(diffHours / 24);

    if (diffMins < 1) return 'just now';
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 30) return `${diffDays}d ago`;
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric' });
  }

  async function handleReaction() {
    if (hasReacted || isPreview) return;

    reactions += 1;
    hasReacted = true;

    try {
      const stored = localStorage.getItem('kaelvx_reacted_notes');
      const reactedIds: number[] = stored ? JSON.parse(stored) : [];
      if (!reactedIds.includes(note.id)) {
        reactedIds.push(note.id);
        localStorage.setItem('kaelvx_reacted_notes', JSON.stringify(reactedIds));
      }
    } catch {}

    try {
      await fetch('/api/notes/reaction', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: note.id })
      });
    } catch {}
  }

  function copyText() {
    navigator.clipboard.writeText(note.content);
    copied = true;
    setTimeout(() => {
      copied = false;
    }, 2000);
  }
</script>

<div class="card group cursor-default flex flex-col justify-between hover:-translate-y-0.5 hover:border-gray-700 transition-all duration-200">
  <div>
    <div class="flex items-start justify-between mb-3 gap-2">
      <span class="inline-flex items-center gap-1.5 px-2 py-0.5 text-xs font-mono border border-gray-800 rounded-sm {categoryConfig.color}">
        <span class="text-[9px]">●</span>
        <span>{categoryConfig.label}</span>
      </span>

      <div class="flex items-center gap-2">
        <span class="text-xs font-mono text-gray-600">{formatTimeAgo(note.created_at)}</span>
        {#if !isPreview}
          <button
            type="button"
            onclick={copyText}
            title="Copy text"
            class="text-gray-600 hover:text-gray-300 transition-colors text-xs font-mono"
          >
            {copied ? 'copied!' : 'copy'}
          </button>
        {/if}
      </div>
    </div>

    <p class="text-gray-300 text-sm font-mono leading-relaxed mb-4 whitespace-pre-wrap break-words">
      {note.content}
    </p>
  </div>

  <div class="flex items-center justify-between pt-3 border-t border-gray-800/50">
    <button
      type="button"
      onclick={handleReaction}
      disabled={hasReacted || isPreview}
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

    <span class="text-[10px] font-mono text-gray-700">#{note.id}</span>
  </div>
</div>
