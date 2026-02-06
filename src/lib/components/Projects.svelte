<script lang="ts">
  import ProjectCard from './ProjectCard.svelte';
  import ScrambleText from './ScrambleText.svelte';
  import { onMount } from 'svelte';

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
</script>

<section 
  id="projects" 
  bind:this={sectionRef}
  class="py-24 pointer-events-auto transition-all duration-1000 ease-out {isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'}"
>
  <div class="mb-12">
    <h2 class="text-3xl font-bold text-white mb-4 font-mono flex items-center gap-4">
      <span class="text-blue-500">01.</span>
      <span>Project Showcase</span>
      <div class="h-px bg-gray-800 flex-grow ml-4"></div>
    </h2>
    <p class="text-gray-400 font-mono text-sm">
      // Engineering robust systems & automated pipelines
    </p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
    <ProjectCard
      title="iBudget Finance Savings Platform"
      description="A smart financial budgeting platform, featuring a dedicated AI microservice (RAG) for personalized advice/insights
        and a highly automated DevOps pipeline enforcing 80% code coverage."
      repoUrl="https://github.com/PUP-BSIT/project-appvengers"
      demoUrl="https://i-budget.site"
      tags={['Spring Boot', 'Angular', 'GitHub Actions', 'Hostinger VPS', 'AI Microservices', 'Pinecone Vector DB', 'Supabase']}
      stats={[
        { label: 'Coverage', value: '80% Enforced', color: 'text-green-400' },
        { label: 'Security', value: 'JWT + Gitleaks', color: 'text-yellow-400' },
        { label: 'Architecture', value: 'Microservices', color: 'text-purple-400' },
        { label: 'Deployment', value: 'CI/CD VPS', color: 'text-blue-400' }
      ]}
    />

    <ProjectCard
      title="PawSight Pet Utility Mobile"
      description="An android utility application for pet care with integrated AI assistance.
        Built with clean MVVM architecture and forui library offering offline-first capabilities."
      repoUrl="https://github.com/mejares-jamesmichael/project-pawsight"
      demoUrl="https://github.com/mejares-jamesmichael/project-pawsight/releases"
      tags={['Flutter', 'Dart', 'forui', 'AI Microservices', 'SQLite', 'MVVM Architecture']}
      stats={[
        { label: 'Platform', value: 'Android', color: 'text-blue-400' },
        { label: 'AI Model', value: 'Smart-AI', color: 'text-purple-400' },
        { label: 'State', value: 'Provider', color: 'text-yellow-400' },
        { label: 'Database', value: 'Local SQLite', color: 'text-green-400' }
      ]}
    />
  </div>
</section>
