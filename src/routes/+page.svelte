<script lang="ts">
  import { config } from "$lib/config";
  import GeometricLines from "$lib/components/GeometricLines.svelte";
  import Projects from "$lib/components/Projects.svelte";
  import Skills from "$lib/components/Skills.svelte";
  import Certifications from "$lib/components/Certifications.svelte";
  import RecentNotes from "$lib/components/RecentNotes.svelte";
  import CvViewer from "$lib/components/CvViewer.svelte";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
  let emailCopied = $state(false);
  let cvOpen = $state(false);

  function copyEmail() {
    navigator.clipboard.writeText(config.email);
    emailCopied = true;
    setTimeout(() => {
      emailCopied = false;
    }, 2000);
  }
</script>

<GeometricLines />

<div
  class="relative z-10 min-h-screen flex flex-col p-12 md:p-24 max-w-[1600px] mx-auto pointer-events-none"
>
  <!-- LOGO (Top Left) -->
  <header class="pointer-events-auto mb-20">
    <div class="text-4xl font-bold tracking-tighter text-white">
      <svg
        width="40"
        height="40"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill="white"
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="
          M9 5H15V6H16V9H17V11H16V13H17V15H15V16H14V19H12V18H10V17H9V16H8V14H7V8H8V6H9V5ZM
          9 10H13V13H9V10ZM
          14 13H16V15H14V13Z
        "
        />
      </svg>
    </div>
  </header>

  <!-- MAIN HERO CONTENT -->
  <main class="max-w-2xl pointer-events-auto mb-32">
    <h1
      class="text-5xl md:text-6xl font-bold text-white mb-4 font-mono tracking-tight"
    >
      {config.name}
    </h1>

    <h2 class="text-2xl md:text-3xl font-semibold mb-8 font-mono text-gray-400">
      {config.title}
    </h2>

    <div
      class="space-y-6 text-lg md:text-xl font-normal leading-relaxed text-gray-200"
    >
      <p>
        I automate <span class="text-white">deployments,</span> build reliable
        <span class="text-white">backend systems,</span> and optimize
        <span class="text-white">cloud infrastructure.</span>
      </p>

      <p
        class="text-base md:text-lg text-gray-400 flex flex-wrap gap-2 items-center font-mono"
      >
        {#each config.skills as skill, i}
          <span class="text-white">{skill}</span>
          {#if i < config.skills.length - 1}
            •
          {/if}
        {/each}
      </p>
    </div>

    <!-- LINKS ROW -->
    <div class="mt-10 flex flex-wrap gap-4 text-base">
      <a href="#projects" class="btn text-white"> Projects </a>
      <a href="#skills" class="btn text-white"> Skills </a>
      <button onclick={() => (cvOpen = true)} class="btn text-white">
        View CV
      </button>
    </div>
  </main>

  <Projects />
  <Skills />
  <Certifications />
  <!-- <RecentNotes notes={data.recentNotes} /> -->

  <!-- FOOTER (Bottom Left) -->
  <footer id="contact" class="pointer-events-auto mt-20">
    <div
      class="flex flex-wrap gap-8 text-sm font-semibold text-white font-mono"
    >
      <a
        href={config.socials.github}
        target="_blank"
        class="hover:text-gray-400 transition-colors">GitHub</a
      >
      <a
        href={config.socials.linktree}
        target="_blank"
        class="hover:text-gray-400 transition-colors">Linktree</a
      >
      <button onclick={copyEmail} class="hover:text-gray-400 transition-colors">
        {emailCopied ? "Copied!" : "Email"}
      </button>
    </div>
  </footer>
</div>

<CvViewer bind:open={cvOpen} />
