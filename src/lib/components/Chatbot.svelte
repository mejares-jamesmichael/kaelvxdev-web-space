<script lang="ts">
  import { fade } from 'svelte/transition';
  import { Send, Terminal, Cpu, ShieldCheck, Globe } from 'lucide-svelte';
  import { afterUpdate, onMount } from 'svelte';

  // Chat State
  let inputValue = '';
  let isLoading = false;
  let isTyping = false;
  let chatContainer: HTMLDivElement;
  let isVisible = false;
  let sectionRef: HTMLElement;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          isVisible = true;
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef) observer.observe(sectionRef);
    return () => observer.disconnect();
  });

  type Message = {
    role: 'user' | 'bot';
    text: string;
    time: string;
  };

  let messages: Message[] = [
    {
      role: 'bot',
      text: 'Welcome to the kali REPL \n\nI am a neural-linked agent trained on James\'s technical expertise. You can ask me about his personal life, education, work experience, skills, projects, or appoint a schedule.',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ];

  // --- Chat Logic ---
  function renderMarkdown(text: string): string {
    return text
      // Code blocks: sharper corners, darker bg, slate border
      .replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre class="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-sm p-4 my-3 overflow-x-auto text-xs font-mono text-[var(--color-success)] shadow-inner"><code>$2</code></pre>')
      // Inline code: sharper corners, subtle bg
      .replace(/`([^`]+)`/g, '<code class="bg-[var(--bg-card)] px-1.5 py-0.5 rounded-sm text-xs font-mono text-[var(--color-primary)] border border-[var(--border-default)]">$1</code>')
      // Headers: Technical, uppercase, mono
      .replace(/^### (.+)$/gm, '<strong class="block text-[var(--color-primary)] mt-6 mb-2 font-mono text-xs tracking-widest uppercase border-b border-[var(--border-default)] pb-1">$1</strong>')
      // Bold: White contrast
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      // Links: Blue, underline on hover
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-[var(--color-primary)] hover:text-[var(--color-secondary)] hover:underline transition-colors">$1</a>')
      // Lists: Custom marker
      .replace(/^[-*] (.+)$/gm, '<li class="ml-4 list-none relative pl-4 text-[var(--color-secondary)] mb-1 before:content-[\'-\'] before:absolute before:left-0 before:text-[var(--color-secondary)]">$1</li>')
      .replace(/\n/g, '<br/>');
  }

  afterUpdate(() => {
    if (chatContainer) chatContainer.scrollTop = chatContainer.scrollHeight;
  });

  async function typeText(fullText: string) {
    const botMsgIndex = messages.length;
    messages = [...messages, {
      role: 'bot',
      text: '',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }];

    for (let i = 0; i < fullText.length; i++) {
      messages[botMsgIndex].text += fullText[i];
      messages = messages;
      await new Promise(r => setTimeout(r, 8)); // Snappy terminal speed
    }
  }

  function clearChat() {
    messages = [
      {
        role: 'bot',
        text: 'Console cleared. System ready.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ];
  }

  async function handleSubmit() {
    if (!inputValue.trim() || isLoading || isTyping) return;
    const userText = inputValue;
    messages = [...messages, {
      role: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }];
    inputValue = '';
    isLoading = true;

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userText })
      });
      const data = await response.json();
      if (data.error) throw new Error(data.error);
      isLoading = false;
      isTyping = true;
      await typeText(data.text);
    } catch (error) {
      isLoading = false;
      messages = [...messages, {
        role: 'bot',
        text: 'Fatal Error: Neural link severed. Check logs.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }];
    } finally {
      isLoading = false;
      isTyping = false;
    }
  }
</script>

<section
  id="Kali-agent"
  bind:this={sectionRef}
  class="pointer-events-auto my-32 w-full transition-all duration-1000 ease-out {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}"
>
  <div class="mb-12">
    <h3 class="text-3xl font-bold text-white font-mono flex items-center gap-4">
      <span class="text-[var(--color-primary)]">03.</span>
      <span>Chat with Kali-Agent</span>
      <div class="h-px bg-[var(--border-default)] flex-grow ml-4"></div>
    </h3>
    <p class="text-[var(--color-secondary)] font-mono text-sm mt-2">
      // Have questions? chat Kael's kali agent
    </p>
  </div>

  <!-- Main Terminal Window -->
  <div class="rounded-sm border border-[var(--border-default)] bg-[var(--bg-card)] backdrop-blur-md shadow-2xl flex flex-col md:flex-row h-[600px] overflow-hidden group hover:border-[var(--border-hover)] transition-colors duration-300">

    <!-- Sidebar / Status Panel (Hidden on small screens) -->
    <div class="hidden md:flex w-64 border-r border-[var(--border-default)] flex-col bg-[var(--bg-card)]">

      <!-- Header Area of Sidebar -->
      <div class="p-4 border-b border-[var(--border-default)]">
        <div class="text-[16px] font-mono text-[var(--color-secondary)] uppercase tracking-widest mb-1">System Status</div>
        <div class="flex items-center gap-2">
           <div class="w-2 h-2 rounded-full bg-[var(--color-success)] animate-pulse"></div>
           <span class="text-xs text-[var(--color-success)] font-mono font-bold">ONLINE</span>
        </div>
      </div>

      <!-- Stats Grid (Aligned with ProjectCard style) -->
      <div class="p-4 space-y-4">
        <div>
          <span class="text-[10px] font-mono text-[var(--color-secondary)] uppercase tracking-widest block mb-2">Telemetry</span>
          <div class="grid gap-y-2 border-y border-[var(--border-default)] py-3">
            <div class="flex items-center justify-between text-xs font-mono">
              <span class="text-[var(--color-secondary)]">LLM Core</span>
              <span class="text-[var(--color-primary)]">v1.0.4</span>
            </div>
            <div class="flex items-center justify-between text-xs font-mono">
              <span class="text-[var(--color-secondary)]">Uptime</span>
              <span class="text-[var(--color-primary)]">99.9%</span>
            </div>
            <div class="flex items-center justify-between text-xs font-mono">
              <span class="text-[var(--color-secondary)]">Latency</span>
              <span class="text-[var(--color-success)]">24ms</span>
            </div>
          </div>
        </div>

        <div>
          <span class="text-[10px] font-mono text-[var(--color-secondary)] uppercase tracking-widest block mb-2">Quick Access</span>
          <div class="space-y-1">
            {#each ['/projects', '/skills', '/contact'] as cmd}
              <button
                on:click={() => { inputValue = cmd; handleSubmit(); }}
                class="w-full text-left px-3 py-2 rounded-sm border border-[var(--border-default)] bg-[var(--bg-card)] text-xs font-mono text-[var(--color-secondary)] hover:text-[var(--color-primary)] hover:border-[var(--border-hover)] hover:bg-[var(--bg-card-hover)] transition-all group-item"
              >
                <span class="text-[var(--color-primary)] opacity-50 group-item-hover:opacity-100">></span> {cmd}
              </button>
            {/each}
          </div>
        </div>
      </div>

      <div class="mt-auto p-4 border-t border-[var(--border-default)] text-[16px] text-[var(--color-secondary)] font-mono text-center">
        session_id: {Math.random().toString(36).substring(7)}
      </div>
    </div>

    <!-- Main REPL Area -->
    <div class="flex-1 flex flex-col relative bg-[var(--bg-card)]">
      <!-- Terminal Header -->
      <div class="flex items-center justify-between px-4 py-2 border-b border-[var(--border-default)] bg-[var(--bg-card)]">
        <div class="flex items-center gap-2">
          <Terminal class="w-4 h-4 text-[var(--color-secondary)]" />
          <span class="text-xs font-mono text-[var(--color-secondary)]">kaelvxdev@portfolio:~</span>
        </div>
        <!-- Window Controls (ASCII Style) -->
        <div class="flex gap-4 text-xs font-mono text-[var(--color-secondary)]">
          <span>[ _ ]</span>
          <span>[ □ ]</span>
          <button
            on:click={clearChat}
            class="hover:text-red-500 cursor-pointer transition-colors"
            title="Clear Terminal"
          >
            [ x ]
          </button>
        </div>
      </div>

      <!-- Messages Output -->
      <div
        bind:this={chatContainer}
        class="flex-1 overflow-y-auto p-6 font-mono text-sm leading-relaxed space-y-6 scrollbar-thin scrollbar-thumb-[var(--border-default)] scrollbar-track-transparent"
      >
        {#each messages as msg}
          <div class="flex flex-col gap-1 group">
            <!-- Message Header -->
            <div class="flex items-center gap-3 opacity-40 select-none group-hover:opacity-80 transition-opacity text-xs">
              <span class="uppercase tracking-widest">{msg.time}</span>
              {#if msg.role === 'user'}
                <span class="text-[var(--color-primary)] font-bold">visitor@web</span>
              {:else}
                <span class="text-[var(--color-success)] font-bold">root@system</span>
              {/if}
            </div>

            <!-- Message Body -->
            <div class="{msg.role === 'user' ? 'text-[var(--color-primary)]' : 'text-[var(--color-secondary)]'} pl-0">
              {#if msg.role === 'user'}
                <span class="text-[var(--color-primary)] mr-2">$</span>{msg.text}
              {:else}
                <div class="border-l-2 border-[var(--border-default)] pl-3 mt-1">
                  {@html renderMarkdown(msg.text)}
                  {#if isTyping && messages.indexOf(msg) === messages.length - 1}
                    <span class="inline-block w-2 h-4 bg-[var(--color-success)] animate-pulse ml-1 align-middle after:content-['▌'] after:animate-blink"></span>
                  {/if}
                </div>
              {/if}
            </div>
          </div>
        {/each}

        {#if isLoading}
          <div class="flex items-center gap-2 text-[var(--color-secondary)] text-xs pl-0 animate-pulse">
            <span class="text-[var(--color-success)]">$</span>
            <span>processing_query...</span>
          </div>
        {/if}
      </div>

      <!-- Input Bar -->
      <div class="p-4 bg-[var(--bg-card)] border-t border-[var(--border-default)]">
        <form
          on:submit|preventDefault={handleSubmit}
          class="flex items-center gap-3"
        >
          <span class="text-[var(--color-success)] font-bold font-mono">➜ ~</span>
          <input
            bind:value={inputValue}
            type="text"
            placeholder={isTyping ? "" : "Enter command..."}
            disabled={isTyping || isLoading}
            class="flex-1 bg-transparent outline-none text-[var(--color-primary)] font-mono text-sm placeholder-[var(--color-secondary)] caret-[var(--color-success)]"
            autocomplete="off"
            spellcheck="false"
          />
        </form>
      </div>
    </div>

  </div>
</section>
