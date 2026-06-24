<script lang="ts">
  import ProjectCard from './ProjectCard.svelte';
</script>

<section 
  id="projects" 
  class="py-20 pointer-events-auto"
>
  <div class="mb-12">
    <h2 class="section-header">
      <span class="section-number">01.</span>
      <span>Project Showcase</span>
      <div class="section-divider"></div>
    </h2>
    <p class="section-description">
      // Engineering robust systems & automated pipelines
    </p>
  </div>

  <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
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

    <ProjectCard
      title="ServeTrack - Volunteer Management System"
      description="A full-stack volunteer management platform for NLCOM with role-based access, ICS module, AI chatbot, RSVP system, attendance tracking, and SMS notifications."
      repoUrl="https://github.com/PUPT-Quantum-Leap/capstone-nlcom-volunteer-management-system"
      demoUrl="https://servetrack.quantumapp.tech/"
      tags={['Laravel 12', 'Angular 21', 'MySQL', 'Docker', 'GitHub Actions', 'Twilio', 'Groq AI']}
      stats={[
        { label: 'Architecture', value: 'Monorepo', color: 'text-purple-400' },
        { label: 'Auth', value: 'Sanctum + OAuth', color: 'text-yellow-400' },
        { label: 'CI/CD', value: 'VPS Atomic Deploy', color: 'text-blue-400' },
        { label: 'Testing', value: 'Pest + Vitest', color: 'text-green-400' }
      ]}
    />
  </div>
</section>
