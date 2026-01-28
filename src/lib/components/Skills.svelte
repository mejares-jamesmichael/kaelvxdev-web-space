<script lang="ts">
  import { 
    Code, Server, Database, Cloud, Terminal, Cpu, Layout, 
    GitBranch, Container, Shield, Zap, Smartphone, Command, FileCode
  } from 'lucide-svelte';

  const skills = [
    { 
      category: "Core Tech", 
      items: [
        { name: 'Angular', icon: Layout },
        { name: 'Flutter', icon: Smartphone },
        { name: 'Docker', icon: Container },
        { name: 'Linux', icon: Terminal },
        { name: 'Git / GitHub', icon: GitBranch },
      ]
    },
    { 
      category: "Cloud & DevOps", 
      items: [
        { name: 'AWS (EC2)', icon: Cloud },
        { name: 'Spring Boot', icon: Zap },
        { name: 'n8n Automation', icon: FileCode },
        { name: 'Bash Scripting', icon: Command },
      ]
    },
    { 
      category: "Other Skills", 
      items: [
        { name: 'Python', icon: Code },
        { name: 'PHP', icon: Code },
        { name: 'SQL', icon: Database },
        { name: 'PowerShell', icon: Terminal },
      ]
    }
  ];
</script>

<section id="skills" class="py-24 pointer-events-auto scroll-mt-24">
  <div class="mb-12">
    <h2 class="text-3xl font-bold text-white mb-4 font-mono flex items-center gap-4">
      <span class="text-blue-500">02.</span>
      <span>Technical Arsenal</span>
      <div class="h-px bg-gray-800 flex-grow ml-4"></div>
    </h2>
    <p class="text-gray-400 font-mono text-sm">
      // Tools & technologies I use to build and deploy
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    {#each skills as group}
      <div class="p-6 border border-gray-800 bg-black/50 rounded-sm hover:border-white/20 transition-colors">
        <h3 class="text-xl font-bold text-white mb-6 font-mono border-b border-gray-800 pb-2">
          {group.category}
        </h3>
        <div class="space-y-4">
          {#each group.items as skill}
            <div class="flex items-center gap-3 text-gray-400 hover:text-white transition-colors group">
              <svelte:component this={skill.icon} class="w-5 h-5 text-gray-500 group-hover:text-blue-400 transition-colors" />
              <span class="font-mono text-sm">{skill.name}</span>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</section>
