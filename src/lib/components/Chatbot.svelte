<script lang="ts">
  import { fly, fade } from 'svelte/transition';
  import { X, Send, Bot, User, Sparkles } from 'lucide-svelte';
  import { afterUpdate } from 'svelte';

  let isOpen = false;
  let inputValue = '';
  let isLoading = false;
  let chatContainer: HTMLDivElement;

  type Message = {
    role: 'user' | 'bot';
    text: string;
  };

  let messages: Message[] = [
    { role: 'bot', text: 'System online. How can I assist you with James\'s portfolio?' }
  ];

  // Auto-scroll to bottom
  afterUpdate(() => {
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  });

  async function handleSubmit() {
    if (!inputValue.trim() || isLoading) return;

    // 1. Add User Message
    const userText = inputValue;
    messages = [...messages, { role: 'user', text: userText }];
    inputValue = '';
    isLoading = true;

    try {
      // 2. Send to our own API proxy (hides the n8n URL)
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });

      const data = await response.json();
      
      if (data.error) throw new Error(data.error);

      // 3. Add Bot Response
      messages = [...messages, { role: 'bot', text: data.text }];

    } catch (error) {
      console.error(error);
      messages = [...messages, { role: 'bot', text: 'Error: Connection to neural core failed.' }];
    } finally {
      isLoading = false;
    }
  }
</script>

<!-- Floating Trigger Button -->
<button
  on:click={() => isOpen = !isOpen}
  class="fixed bottom-6 right-6 z-[100] flex h-14 w-14 items-center justify-center rounded-full border border-white/20 bg-black/80 text-white shadow-2xl backdrop-blur-xl transition-all hover:scale-110 hover:border-white/40 hover:bg-white/10 pointer-events-auto"
>
  {#if isOpen}
    <X class="h-6 w-6" />
  {:else}
    <Sparkles class="h-6 w-6" />
  {/if}
</button>

<!-- Chat Window -->
{#if isOpen}
  <div
    transition:fly={{ y: 20, duration: 300 }}
    class="fixed bottom-24 right-6 z-[100] flex h-[500px] w-[350px] flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#0a0a0a]/90 shadow-2xl backdrop-blur-xl sm:w-[400px] pointer-events-auto"
  >
    <!-- Header -->
    <div class="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
      <div class="flex items-center gap-2">
        <div class="flex h-2 w-2">
          <span class="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-green-400 opacity-75"></span>
          <span class="relative inline-flex h-2 w-2 rounded-full bg-green-500"></span>
        </div>
        <span class="font-mono text-sm font-bold text-white">AI_Assistant</span>
      </div>
      <span class="text-[10px] text-gray-500 font-mono">v1.0.0</span>
    </div>

    <!-- Messages Area -->
    <div 
      bind:this={chatContainer}
      class="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent"
    >
      {#each messages as msg}
        <div class="flex gap-3 {msg.role === 'user' ? 'flex-row-reverse' : ''}">
          <!-- Avatar -->
          <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
            {#if msg.role === 'user'}
              <User class="h-4 w-4 text-gray-400" />
            {:else}
              <Bot class="h-4 w-4 text-blue-400" />
            {/if}
          </div>

          <!-- Bubble -->
          <div class="max-w-[80%] rounded-lg px-3 py-2 text-sm leading-relaxed {msg.role === 'user' ? 'bg-white text-black' : 'bg-white/5 text-gray-300 border border-white/5'}">
            {msg.text}
          </div>
        </div>
      {/each}

      <!-- Loading Indicator -->
      {#if isLoading}
        <div class="flex gap-3" transition:fade>
          <div class="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5">
            <Bot class="h-4 w-4 text-blue-400" />
          </div>
          <div class="flex items-center gap-1 rounded-lg border border-white/5 bg-white/5 px-4 py-3">
            <div class="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.3s]"></div>
            <div class="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500 [animation-delay:-0.15s]"></div>
            <div class="h-1.5 w-1.5 animate-bounce rounded-full bg-gray-500"></div>
          </div>
        </div>
      {/if}
    </div>

    <!-- Input Area -->
    <form 
      on:submit|preventDefault={handleSubmit}
      class="border-t border-white/10 bg-black/20 p-4"
    >
      <div class="relative flex items-center">
        <input
          bind:value={inputValue}
          type="text"
          placeholder="Ask about my projects..."
          class="w-full rounded-lg border border-white/10 bg-white/5 py-2.5 pl-4 pr-10 text-sm text-white placeholder-gray-500 focus:border-white/30 focus:outline-none focus:ring-0"
        />
        <button
          type="submit"
          disabled={!inputValue.trim() || isLoading}
          class="absolute right-2 p-1.5 text-gray-400 transition-colors hover:text-white disabled:opacity-50"
        >
          <Send class="h-4 w-4" />
        </button>
      </div>
    </form>
  </div>
{/if}
