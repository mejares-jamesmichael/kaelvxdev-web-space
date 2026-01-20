<script lang="ts">
  import GeometricLines from '$lib/components/GeometricLines.svelte';
  import ScrambleText from '$lib/components/ScrambleText.svelte';

  let emailCopied = false;

  function copyEmail() {
    navigator.clipboard.writeText('jamesmichaelmejares@gmail.com');
    emailCopied = true;
    setTimeout(() => {
      emailCopied = false;
    }, 2000);
  }
</script>

<GeometricLines />

<div class="relative z-10 h-screen flex flex-col justify-between p-12 md:p-24 max-w-[1600px] mx-auto pointer-events-none">

  <!-- LOGO (Top Left) -->
  <header class="pointer-events-auto">
    <div class="text-4xl font-bold tracking-tighter text-white">
      <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill="white" fill-rule="evenodd" clip-rule="evenodd" d="
          M9 5H15V6H16V9H17V11H16V13H17V15H15V16H14V19H12V18H10V17H9V16H8V14H7V8H8V6H9V5ZM
          9 10H13V13H9V10ZM
          14 13H16V15H14V13Z
        "/>
      </svg>
    </div>
  </header>

  <!-- MAIN CONTENT (Vertically Centered, Left Aligned) -->
  <main class="max-w-xl -mt-10 pointer-events-auto">
    <h1 class="text-5xl md:text-6xl font-bold text-white mb-4 font-mono tracking-tight">
      James Michael
    </h1>

    <h2 class="text-2xl md:text-3xl font-semibold text-gray-300 mb-8 font-mono">
      Backend & DevOps Engineer
    </h2>

    <div class="space-y-6 text-lg md:text-xl font-normal leading-relaxed text-gray-200">
      <p>
        I automate <span class="text-white"><ScrambleText text="deployments" /></span>, build reliable
            <span class="text-white"><ScrambleText text="backend systems" /></span>,and optimize
            <span class="text-white"><ScrambleText text="cloud infrastructure." /></span>
      </p>

      <p class="text-base md:text-lg text-gray-400 flex flex-wrap gap-2 items-center font-mono">
        <span class="text-white"><ScrambleText text="Linux" /></span> •
        <span class="text-white"><ScrambleText text="AWS" /></span> •
        <span class="text-white"><ScrambleText text="CI/CD" /></span> •
        <span class="text-white"><ScrambleText text="Docker" /></span> •
        <span class="text-white"><ScrambleText text="AI-automation" /></span>
      </p>
    </div>

    <!-- LINKS ROW -->
    <div class="mt-10 flex flex-wrap gap-4 text-base font-medium font-mono">
      <a href="#projects" class="px-6 py-3 border border-white text-white rounded hover:bg-white hover:text-black transition-colors">
        Projects
      </a>
      <a href="https://github.com/mejares-jamesmichael" target="_blank"
          class="px-6 py-3 border border-white text-white rounded hover:bg-white hover:text-black transition-colors">
        GitHub
      </a>
      <a href="#contact" class="px-6 py-3 border border-white text-white rounded hover:bg-white hover:text-black transition-colors">
        Let's Talk
      </a>
    </div>
  </main>

  <!-- FOOTER (Bottom Left) -->
  <footer class="pointer-events-auto">
    <div class="flex flex-wrap gap-8 text-sm font-semibold text-white font-mono">
      <a href="https://github.com/mejares-jamesmichael" target="_blank" class="hover:text-gray-400 transition-colors">GitHub</a>
      <a href="https://linktr.ee/kaelvxd" target="_blank" class="hover:text-gray-400 transition-colors">Linktree</a>
      <button on:click={copyEmail} class="hover:text-gray-400 transition-colors">
        {emailCopied ? 'Copied!' : 'Email'}
      </button>
    </div>
  </footer>
</div>
