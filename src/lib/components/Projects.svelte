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

  <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[minmax(0,1fr)]">
    <ProjectCard
      class="md:col-span-2 lg:col-span-2 lg:row-span-2"
      title="iBudget Finance Savings Platform"
      description="A smart financial budgeting platform, featuring a dedicated AI microservice (RAG) for personalized advice/insights
        and a highly automated DevOps pipeline enforcing 80% code coverage."
      repoUrl="https://github.com/PUP-BSIT/project-appvengers"
      demoUrl="https://i-budget.site"
      tags={['Spring Boot', 'Angular', 'GitHub Actions', 'Ubuntu VPS', 'AI Microservices (n8n)', 'Pinecone Vector DB', 'Supabase']}
      stats={[
        { label: 'Coverage', value: '80% Enforced', color: 'text-green-400' },
        { label: 'Security', value: 'JWT + OAuth', color: 'text-yellow-400' },
        { label: 'Architecture', value: 'Microservices', color: 'text-purple-400' },
        { label: 'Deployment', value: 'CI/CD VPS', color: 'text-blue-400' }
      ]}
    />

    <ProjectCard
      class="md:col-span-1 lg:col-span-1"
      title="PawSight Pet Utility Mobile"
      description="An android utility application for pet care with integrated AI assistance.
        Built with clean MVVM architecture and forui library offering offline-first capabilities."
      repoUrl="https://github.com/mejares-jamesmichael/project-pawsight"
      demoUrl="https://github.com/mejares-jamesmichael/project-pawsight/releases"
      tags={['Flutter', 'Dart', 'forui', 'AI Microservices', 'SQLite', 'MVVM Architecture']}
      stats={[
        { label: 'Platform', value: 'Android', color: 'text-blue-400' },
        { label: 'AI Model', value: 'Groq AI', color: 'text-purple-400' },
        { label: 'State', value: 'Provider', color: 'text-yellow-400' },
        { label: 'Database', value: 'SQLite', color: 'text-green-400' }
      ]}
    />

    <ProjectCard
      class="md:col-span-1 lg:col-span-1"
      title="ServeTrack - Volunteer Management System"
      description="A full-stack volunteer management platform for NLCOM with role-based access, ICS module, AI chatbot, RSVP system, attendance tracking, and SMS notifications."
      repoUrl="https://github.com/PUPT-Quantum-Leap/capstone-nlcom-volunteer-management-system"
      demoUrl="https://servetrack.quantumapp.tech/"
      tags={['Laravel 12', 'Angular 21', 'MySQL', 'Docker', 'GitHub Actions', 'Twilio', 'Groq AI']}
      stats={[
        { label: 'Architecture', value: 'Monorepo', color: 'text-purple-400' },
        { label: 'Auth', value: 'Sanctum + OAuth', color: 'text-yellow-400' },
        { label: 'CI/CD', value: 'GitHub Actions', color: 'text-blue-400' },
        { label: 'Testing', value: 'Pest + Vitest', color: 'text-green-400' }
      ]}
    />

    <ProjectCard
      class="md:col-span-1 lg:col-span-1"
      title="PowerShell Disk Analyzer"
      description="A PowerShell GUI (WinForms) application for disk usage analysis and automated cleanup with file preview and safe mode."
      repoUrl="https://github.com/mejares-jamesmichael/OS-PROJECT-Powershell-GUI"
      tags={['PowerShell', 'WinForms', 'Scripting', 'System Administration']}
      stats={[
        { label: 'Interface', value: 'GUI App', color: 'text-purple-400' },
        { label: 'Features', value: 'Clean', color: 'text-green-400' },
        { label: 'Safety', value: 'Restore', color: 'text-yellow-400' },
        { label: 'License', value: 'MIT', color: 'text-blue-400' }
      ]}
    />

    <ProjectCard
      class="md:col-span-1 lg:col-span-2"
      title="Windows Dotfiles"
      description="Personal Windows development environment featuring tiling window manager, Neovim config, and custom terminal setups."
      repoUrl="https://github.com/mejares-jamesmichael/windows-dotfiles"
      tags={['Lua', 'PowerShell', 'Neovim', 'Komorebi', 'Alacritty', 'WezTerm', 'Nu Shell', 'Tmux']}
      stats={[
        { label: 'Window Manager', value: 'Komorebi', color: 'text-blue-400' },
        { label: 'Editor', value: 'Neovim', color: 'text-green-400' },
        { label: 'Shell', value: 'PowerShell + Nu Shell', color: 'text-yellow-400' },
        { label: 'Terminals', value: 'Windows Terminal + Tmux', color: 'text-purple-400' }
      ]}
    />

    <ProjectCard
      class="md:col-span-2 lg:col-span-3"
      title="Gesture to LLM"
      description="A real-time hand gesture recognition system that lets you communicate with an LLM using sign language gestures via webcam."
      repoUrl="https://github.com/mejares-jamesmichael/sl-llm"
      tags={['Python', 'OpenCV', 'MediaPipe', 'NumPy', 'Webhooks','Machine Learning']}
      stats={[
        { label: 'Detection', value: 'Real-time CV', color: 'text-green-400' },
        { label: 'Gestures', value: '5 Mapped', color: 'text-purple-400' },
        { label: 'Architecture', value: 'Modular', color: 'text-blue-400' },
        { label: 'Threading', value: 'Non-blocking', color: 'text-yellow-400' }
      ]}
    />
  </div>
</section>
