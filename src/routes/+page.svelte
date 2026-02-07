<script lang="ts">
import GeometricLines from '$lib/components/GeometricLines.svelte';
  import ScrambleText from '$lib/components/ScrambleText.svelte';
  import Projects from '$lib/components/Projects.svelte';
  import Skills from '$lib/components/Skills.svelte';
  import Chatbot from '$lib/components/Chatbot.svelte';
  import { onMount } from 'svelte';

  let emailCopied = false;
  let autoScramble = false;

  onMount(() => {
    setTimeout(() => autoScramble = true, 500);
  });

  function copyEmail() {
    navigator.clipboard.writeText('jamesmichaelmejares@gmail.com');
    emailCopied = true;
    setTimeout(() => {
      emailCopied = false;
    }, 2000);
  }
</script>

<GeometricLines />

<div class="relative z-10 min-h-screen flex flex-col p-12 md:p-24 max-w-[1600px] mx-auto pointer-events-none">

  <!-- LOGO (Top Left) -->
  <header class="pointer-events-auto mb-20">
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

  <!-- MAIN HERO CONTENT -->
  <main class="max-w-2xl pointer-events-auto mb-32">
    <h1 class="text-5xl md:text-6xl font-bold text-white mb-4 font-mono tracking-tight">
      <ScrambleText text="James Michael" hoverTrigger={false} autoPlay={autoScramble} />
    </h1>

    <h2 class="text-2xl md:text-3xl font-semibold mb-8 font-mono bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient">
      Backend & DevOps Engineer
    </h2>

    <div class="space-y-6 text-lg md:text-xl font-normal leading-relaxed text-gray-200">
      <p>
        I automate <span class="text-white"><ScrambleText text="deployments," /></span> build reliable
            <span class="text-white"><ScrambleText text="backend systems," /></span> and optimize
            <span class="text-white"><ScrambleText text="cloud infrastructure." /></span>
      </p>

      <p class="text-base md:text-lg text-gray-400 flex flex-wrap gap-2 items-center font-mono">
        <span class="text-white"><ScrambleText text="Linux" /></span> •
        <span class="text-white"><ScrambleText text="AWS" /></span> •
        <span class="text-white"><ScrambleText text="CI/CD" /></span> •
        <span class="text-white"><ScrambleText text="Docker" /></span> •
        <span class="text-white"><ScrambleText text="GitHub Actions" /></span>
      </p>
    </div>

    <!-- LINKS ROW -->
    <div class="mt-10 flex flex-wrap gap-4 text-base">
      <a href="#projects" class="btn text-white">
        Projects
      </a>
      <a href="#skills" class="btn text-white">
        Skills
      </a>
      <a href="/James-Michael-Mejares.pdf" download="James-Michael-Mejares.pdf" class="btn text-white">
        Download CV
      </a>
    </div>
  </main>

  <Projects />
  <Skills />
  <Chatbot />

  <!-- FOOTER (Bottom Left) -->
  <footer id="contact" class="pointer-events-auto mt-20">
    <div class="flex flex-wrap gap-8 text-sm font-semibold text-white font-mono">
      <a href="https://github.com/mejares-jamesmichael" target="_blank" class="hover:text-gray-400 transition-colors">GitHub</a>
      <a href="https://linktr.ee/kaelvxd" target="_blank" class="hover:text-gray-400 transition-colors">Linktree</a>
      <button on:click={copyEmail} class="hover:text-gray-400 transition-colors">
        {emailCopied ? 'Copied!' : 'Email'}
      </button>
    </div>
  </footer>
</div>
