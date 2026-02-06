<script lang="ts">
  export let title: string;
  export let description: string;
  export let tags: string[] = [];
  export let stats: { label: string; value: string; color?: string }[] = [];
  export let repoUrl: string | undefined = undefined;
  export let demoUrl: string | undefined = undefined;
</script>

<div class="group relative p-6 border border-gray-800 bg-black/50 
            hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]
            transition-all duration-300 ease-out cursor-pointer
            hover:-translate-y-1 rounded-sm">
  <!-- Hover Glow Effect -->
  <div class="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-purple-500/0
              group-hover:from-blue-500/5 group-hover:to-purple-500/5
              transition-all duration-500 pointer-events-none rounded-sm"></div>

  <!-- Header -->
  <div class="relative z-10 flex justify-between items-start mb-4">
    <h3 class="text-xl font-bold text-white font-mono tracking-tight group-hover:text-blue-400 transition-colors">
      > {title}
    </h3>
    <div class="flex gap-2">
      {#if demoUrl}
        <a href={demoUrl} target="_blank" class="p-2 text-gray-400 hover:text-white transition-colors" title="Live Demo">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
        </a>
      {/if}
      <a href={repoUrl} target="_blank" class="p-2 text-gray-400 hover:text-white transition-colors" title="Source Code">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16
                2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
      </a>
    </div>
  </div>

  <!-- Description -->
  <p class="relative z-10 text-gray-400 text-sm leading-relaxed mb-6 font-mono">
    {description}
  </p>

  <!-- Stats Grid (The "Wow" Factor) -->
  {#if stats.length > 0}
    <div class="relative z-10 grid grid-cols-2 gap-y-2 gap-x-4 mb-6 py-3 border-y border-gray-800">
      {#each stats as stat}
        <div class="flex items-center justify-between text-xs font-mono">
          <span class="text-gray-500">{stat.label}</span>
          <span class="{stat.color || 'text-green-400'}">{stat.value}</span>
        </div>
      {/each}
    </div>
  {/if}

  <!-- Tech Stack -->
  <div class="relative z-10 flex flex-wrap gap-2">
    {#each tags as tag}
      <span class="px-2 py-1 text-xs border border-gray-700 text-gray-300 rounded-sm font-mono bg-gray-900/50">
        {tag}
      </span>
    {/each}
  </div>
</div>
