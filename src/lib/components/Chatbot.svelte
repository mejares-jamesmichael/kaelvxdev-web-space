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
      .replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre class="bg-gray-900 border border-gray-800 rounded-sm p-4 my-3 overflow-x-auto text-xs font-mono text-green-400 shadow-inner"><code>$2</code></pre>')
      // Inline code: sharper corners, subtle bg
      .replace(/`([^`]+)`/g, '<code class="bg-gray-800/50 px-1.5 py-0.5 rounded-sm text-xs font-mono text-blue-300 border border-gray-700/50">$1</code>')
      // Headers: Technical, uppercase, mono
      .replace(/^### (.+)$/gm, '<strong class="block text-gray-400 mt-6 mb-2 font-mono text-xs tracking-widest uppercase border-b border-gray-800 pb-1">$1</strong>')
      // Bold: White contrast
      .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
      // Links: Blue, underline on hover
      .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-blue-500 hover:text-blue-400 hover:underline transition-colors">$1</a>')
      // Lists: Custom marker
      .replace(/^[-*] (.+)$/gm, '<li class="ml-4 list-none relative pl-4 text-gray-300 mb-1 before:content-[\'-\'] before:absolute before:left-0 before:text-gray-600">$1</li>')
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
  id="ai-repl" 
  bind:this={sectionRef}
  class="pointer-events-auto my-32 w-full transition-all duration-1000 ease-out {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}"
>
  <div class="mb-12">
    <h3 class="text-3xl font-bold text-white font-mono flex items-center gap-4">
      <span class="text-blue-500">03.</span>
      <span>Chat with Kali-Agent</span>
      <div class="h-px bg-gray-800 flex-grow ml-4"></div>
    </h3>
    <p class="text-gray-400 font-mono text-sm mt-2">
      // Have questions? chat Kael's kali agent
    </p>
  </div>

  <!-- Main Terminal Window -->
  <div class="rounded-sm border border-gray-800 bg-black/80 backdrop-blur-md shadow-2xl flex flex-col md:flex-row h-[600px] overflow-hidden group hover:border-gray-600 transition-colors duration-300">
    
    <!-- Sidebar / Status Panel (Hidden on small screens) -->
    <div class="hidden md:flex w-64 border-r border-gray-800 flex-col bg-black/40">
      
      <!-- Header Area of Sidebar -->
      <div class="p-4 border-b border-gray-800">
        <div class="text-[10px] font-mono text-gray-500 uppercase tracking-widest mb-1">System Status</div>
        <div class="flex items-center gap-2">
           <div class="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
           <span class="text-xs text-green-400 font-mono font-bold">ONLINE</span>
        </div>
      </div>

      <!-- Stats Grid (Aligned with ProjectCard style) -->
      <div class="p-4 space-y-4">
        <div>
          <span class="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-2">Telemetry</span>
          <div class="grid gap-y-2 border-y border-gray-800 py-3">
            <div class="flex items-center justify-between text-xs font-mono">
              <span class="text-gray-500">LLM Core</span>
              <span class="text-blue-400">v1.0.4</span>
            </div>
            <div class="flex items-center justify-between text-xs font-mono">
              <span class="text-gray-500">Uptime</span>
              <span class="text-purple-400">99.9%</span>
            </div>
            <div class="flex items-center justify-between text-xs font-mono">
              <span class="text-gray-500">Latency</span>
              <span class="text-green-400">24ms</span>
            </div>
          </div>
        </div>

        <div>
          <span class="text-[10px] font-mono text-gray-500 uppercase tracking-widest block mb-2">Quick Access</span>
          <div class="space-y-1">
            {#each ['/projects', '/skills', '/contact'] as cmd}
              <button 
                on:click={() => { inputValue = cmd; handleSubmit(); }}
                class="w-full text-left px-3 py-2 rounded-sm border border-gray-800 bg-gray-900/30 text-xs font-mono text-gray-400 hover:text-white hover:border-gray-600 hover:bg-gray-800 transition-all group-item"
              >
                <span class="text-blue-500 opacity-50 group-item-hover:opacity-100">></span> {cmd}
              </button>
            {/each}
          </div>
        </div>
      </div>

      <div class="mt-auto p-4 border-t border-gray-800 text-[10px] text-gray-600 font-mono text-center">
        session_id: {Math.random().toString(36).substring(7)}
      </div>
    </div>

    <!-- Main REPL Area -->
    <div class="flex-1 flex flex-col relative bg-black/20">
      <!-- Terminal Header -->
      <div class="flex items-center justify-between px-4 py-2 border-b border-gray-800 bg-gray-900/50">
        <div class="flex items-center gap-2">
          <Terminal class="w-4 h-4 text-gray-500" />
          <span class="text-xs font-mono text-gray-400">kaelvxdev@portfolio:~</span>
        </div>
        <!-- Window Controls (ASCII Style) -->
        <div class="flex gap-4 text-xs font-mono text-gray-600">
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
        class="flex-1 overflow-y-auto p-6 font-mono text-sm leading-relaxed space-y-6 scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-transparent"
      >
        {#each messages as msg}
          <div class="flex flex-col gap-1 group">
            <!-- Message Header -->
            <div class="flex items-center gap-3 opacity-40 select-none group-hover:opacity-80 transition-opacity text-xs">
              <span class="uppercase tracking-widest">{msg.time}</span>
              {#if msg.role === 'user'}
                <span class="text-blue-400 font-bold">visitor@web</span>
              {:else}
                <span class="text-green-400 font-bold">root@system</span>
              {/if}
            </div>

            <!-- Message Body -->
            <div class="{msg.role === 'user' ? 'text-gray-200' : 'text-gray-300'} pl-0">
              {#if msg.role === 'user'}
                <span class="text-blue-500 mr-2">$</span>{msg.text}
              {:else}
                <div class="border-l-2 border-gray-800 pl-3 mt-1">
                  {@html renderMarkdown(msg.text)}
                  {#if isTyping && messages.indexOf(msg) === messages.length - 1}
                    <span class="inline-block w-2 h-4 bg-green-500 animate-pulse ml-1 align-middle after:content-['▌'] after:animate-blink"></span>
                  {/if}
                </div>
              {/if}
            </div>
          </div>
        {/each}

        {#if isLoading}
          <div class="flex items-center gap-2 text-gray-500 text-xs pl-0 animate-pulse">
            <span class="text-green-500">$</span>
            <span>processing_query...</span>
          </div>
        {/if}
      </div>

      <!-- Input Bar -->
      <div class="p-4 bg-black border-t border-gray-800">
        <form 
          on:submit|preventDefault={handleSubmit}
          class="flex items-center gap-3"
        >
          <span class="text-green-500 font-bold font-mono">➜ ~</span>
          <input
            bind:value={inputValue}
            type="text"
            placeholder={isTyping ? "" : "Enter command..."}
            disabled={isTyping || isLoading}
            class="flex-1 bg-transparent outline-none text-white font-mono text-sm placeholder-gray-700 caret-green-500"
            autocomplete="off"
            spellcheck="false"
          />
        </form>
      </div>
    </div>

  </div>
</section>
