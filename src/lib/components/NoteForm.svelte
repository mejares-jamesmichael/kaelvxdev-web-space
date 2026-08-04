<script lang="ts">
  import { enhance } from '$app/forms';
  import { config } from '$lib/config';

  let { form }: { form?: { success?: boolean; error?: string } } = $props();
  let content = $state('');
  let category = $state('general');
  let isSubmitting = $state(false);
</script>

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
  class="card"
>
  <div class="mb-4">
    <label for="content" class="block text-sm font-mono text-gray-400 mb-2">
      > leave a note_
    </label>
    <textarea
      id="content"
      name="content"
      bind:value={content}
      maxlength="500"
      required
      rows="3"
      placeholder="Type your anonymous message..."
      class="w-full bg-black/50 border border-gray-800 rounded-sm px-4 py-3 text-white font-mono text-sm
             placeholder:text-gray-600 focus:outline-none focus:border-gray-500 transition-colors resize-none"
    ></textarea>
    <div class="flex justify-between items-center mt-2">
      <span class="text-xs font-mono text-gray-600">{content.length}/500</span>
    </div>
  </div>

  <fieldset class="mb-4">
    <legend class="block text-sm font-mono text-gray-400 mb-2">category:</legend>
    <div class="flex flex-wrap gap-2">
      {#each config.noteCategories as cat}
        <button
          type="button"
          onclick={() => (category = cat.id)}
          class="px-3 py-1 text-xs font-mono border rounded-sm transition-all duration-200
                 {category === cat.id
                   ? 'border-white text-white bg-white/10'
                   : 'border-gray-800 text-gray-500 hover:border-gray-600 hover:text-gray-300'}"
        >
          {cat.label}
        </button>
      {/each}
    </div>
    <input type="hidden" name="category" value={category} />
  </fieldset>

  {#if form?.success}
    <div class="mb-4 px-4 py-3 border border-green-800 rounded-sm bg-green-900/20">
      <p class="text-sm font-mono text-green-400">> note sent successfully_</p>
    </div>
  {/if}

  {#if form?.error}
    <div class="mb-4 px-4 py-3 border border-red-800 rounded-sm bg-red-900/20">
      <p class="text-sm font-mono text-red-400">> {form.error}</p>
    </div>
  {/if}

  <button
    type="submit"
    disabled={isSubmitting || content.length === 0}
    class="btn w-full text-center disabled:opacity-40 disabled:cursor-not-allowed"
  >
    {isSubmitting ? '> sending...' : '> send note'}
  </button>
</form>
