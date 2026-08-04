<script lang="ts">
  import { enhance } from '$app/forms';
  import { config } from '$lib/config';

  let { form }: { form?: { success?: boolean; error?: string } } = $props();

  let content = $state('');
  let category = $state('general');
  let isSubmitting = $state(false);

  function handleKeydown(e: KeyboardEvent) {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      e.preventDefault();
      const formEl = (e.target as HTMLElement).closest('form');
      if (formEl && content.trim().length > 0 && !isSubmitting) {
        formEl.requestSubmit();
      }
    }
  }
</script>

<div class="card p-0 overflow-hidden border border-gray-800 bg-black/60 backdrop-blur-sm">
  <!-- Terminal Window Header -->
  <div class="px-4 py-2 bg-gray-950 border-b border-gray-800 flex items-center justify-between font-mono text-xs text-gray-500">
    <div class="flex items-center gap-2">
      <span class="w-2.5 h-2.5 rounded-full bg-gray-700 inline-block"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-gray-700 inline-block"></span>
      <span class="w-2.5 h-2.5 rounded-full bg-gray-700 inline-block"></span>
      <span class="ml-2 text-gray-400 text-xs font-mono">guest@kaelvx:~$ ./post_note.sh</span>
    </div>
    <span class="text-[10px] text-gray-600 font-mono hidden sm:inline">bash 5.2</span>
  </div>

  <form
    method="POST"
    use:enhance={() => {
      isSubmitting = true;
      return async ({ update }) => {
        await update();
        isSubmitting = false;
        if (form?.success) {
          content = '';
          category = 'general';
        }
      };
    }}
    class="p-5 space-y-4"
  >
    <!-- CLI Flags / Category Selector -->
    <div>
      <span class="block text-xs font-mono text-gray-400 mb-2">
        # select category flag:
      </span>
      <div class="flex flex-wrap gap-1.5">
        {#each config.noteCategories as cat}
          <button
            type="button"
            onclick={() => (category = cat.id)}
            class="px-2.5 py-1 text-xs font-mono border rounded-sm transition-all duration-200
                   {category === cat.id
                     ? 'border-gray-400 text-white bg-white/10 font-semibold'
                     : 'border-gray-800/80 text-gray-500 hover:border-gray-700 hover:text-gray-300'}"
          >
            --{cat.id}
          </button>
        {/each}
      </div>
      <input type="hidden" name="category" value={category} />
    </div>

    <!-- Terminal Textarea Input -->
    <div>
      <label for="content" class="block text-xs font-mono text-gray-400 mb-1.5 flex justify-between items-center">
        <span># enter payload:</span>
        <span class="text-[11px] text-gray-600 font-mono">Ctrl+Enter to send</span>
      </label>

      <div class="relative bg-black border border-gray-800 rounded-sm p-3 focus-within:border-gray-500 transition-colors">
        <div class="flex items-start gap-2">
          <span class="text-green-500 font-mono text-sm select-none pt-0.5">$</span>
          <textarea
            id="content"
            name="content"
            bind:value={content}
            onkeydown={handleKeydown}
            maxlength="500"
            required
            rows="4"
            placeholder='echo "Write your anonymous note..." > note.txt'
            class="w-full bg-transparent text-white font-mono text-sm leading-relaxed
                   placeholder:text-gray-600 focus:outline-none resize-none"
          ></textarea>
        </div>

        <div class="flex justify-between items-center mt-2 pt-2 border-t border-gray-900 text-xs font-mono">
          <span class="text-gray-600 text-[11px]">FLAG: --{category}</span>
          <span class="text-gray-500">
            [LEN: {content.length}/500]
          </span>
        </div>
      </div>
    </div>

    <!-- Toast Alerts -->
    {#if form?.success}
      <div class="px-3 py-2 border border-green-800/80 rounded-sm bg-green-900/20">
        <p class="text-xs font-mono text-green-400">> note appended to wall successfully_</p>
      </div>
    {/if}

    {#if form?.error}
      <div class="px-3 py-2 border border-red-800/80 rounded-sm bg-red-900/20">
        <p class="text-xs font-mono text-red-400">> ERROR: {form.error}</p>
      </div>
    {/if}

    <!-- Terminal Execute Submit Button -->
    <button
      type="submit"
      disabled={isSubmitting || content.trim().length === 0}
      class="btn w-full text-center text-xs tracking-wide py-2.5 disabled:opacity-40 disabled:cursor-not-allowed"
    >
      {isSubmitting ? '> ./sending_note.sh ...' : '> ./submit_note.sh ↵'}
    </button>
  </form>
</div>
