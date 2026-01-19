<script lang="ts">
  import GeometricLines from '$lib/components/GeometricLines.svelte';
</script>

<GeometricLines />

<div class="relative z-10 h-screen flex flex-col justify-between p-12 md:p-24 max-w-[1600px] mx-auto">

  <!-- LOGO (Top Left) -->
  <header>
    <div class="text-4xl font-bold tracking-tighter text-white">
      <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M5 10 L15 10 L15 30 L5 30 Z" fill="white" />
        <path d="M35 10 L20 20 L35 30" stroke="white" stroke-width="4" />
      </svg>
    </div>
  </header>

  <!-- MAIN CONTENT (Vertically Centered, Left Aligned) -->
  <main class="max-w-xl -mt-10">
    <div class="space-y-8 text-xl md:text-2xl font-normal leading-snug text-gray-200">
      <p>
        We develop <span class="text-white">private, efficient, and respectful software</span>.
        We also do security research, reverse engineering, and develop network services.
      </p>

      <p class="text-lg md:text-xl text-gray-400 leading-relaxed">
        Our work follows standards and always puts people above everything else. Everyone at kaelvx is extremely passionate about what they do.
      </p>

      <p class="text-lg md:text-xl text-gray-400">
        There are currently <span class="text-white">1</span> of us, we're not hiring <span class="text-gray-600">(...yet?)</span>.
      </p>
    </div>

    <!-- LINKS ROW -->
    <div class="mt-8 flex flex-wrap gap-6 text-lg font-medium">
      <a href="https://github.com/mejares-jamesmichael" target="_blank" class="text-white underline decoration-1 underline-offset-4 hover:text-gray-300 transition-colors">
        github.com
      </a>
      <a href="#" class="text-white underline decoration-1 underline-offset-4 hover:text-gray-300 transition-colors">
        portfolio.v1
      </a>
      <a href="#" class="text-white underline decoration-1 underline-offset-4 hover:text-gray-300 transition-colors">
        notes.dev
      </a>
    </div>
  </main>

  <!-- FOOTER (Bottom Left) -->
  <footer>
    <div class="flex flex-wrap gap-8 text-sm font-semibold text-white">
      <a href="https://github.com/mejares-jamesmichael" class="hover:text-gray-400 transition-colors">GitHub</a>
      <a href="mailto:contact@kael.dev" class="hover:text-gray-400 transition-colors">Email</a>
      <a href="https://twitter.com" class="hover:text-gray-400 transition-colors">X/Twitter</a>
      <span class="text-gray-500">AS16909</span>
    </div>
  </footer>
</div>
