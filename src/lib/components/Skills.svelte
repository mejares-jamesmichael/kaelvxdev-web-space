<script lang="ts">
  const skills = [
    { 
      category: "Full Stack Development", 
      items: ['Laravel 12', 'Spring Boot', 'Angular 21', 'Flutter', 'PHP', 'Node.js']
    },
    { 
      category: "DevOps & Cloud", 
      items: ['Docker', 'GitHub Actions', 'AWS', 'MySQL', 'SQLite']
    },
    { 
      category: "AI & Tools", 
      items: ['Python', 'OpenCV', 'Groq AI', 'PowerShell', 'Lua', 'Neovim']
    }
  ];
</script>

<section 
  id="skills" 
  class="py-20 pointer-events-auto"
>
  <div class="mb-12">
    <h2 class="section-header">
      <span class="section-number">02.</span>
      <span>Technology Stack</span>
      <div class="section-divider"></div>
    </h2>
    <p class="section-description">
      // Tools & technologies I use to build and deploy
    </p>
  </div>

  <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
    {#each skills as group}
      <div class="card cursor-default h-full">
        <h3 class="text-xl font-bold text-white mb-6 font-mono border-b border-gray-800 pb-2">
          {group.category}
        </h3>
        <div class="space-y-4">
          {#each group.items as skill}
            <div class="flex items-center gap-3 text-gray-400 hover:text-white transition-colors duration-300 cursor-pointer">
              <span class="font-mono text-sm">{skill}</span>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</section>
