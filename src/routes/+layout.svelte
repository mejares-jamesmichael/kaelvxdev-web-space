<script>
  import '../app.css';
  // ponytail: Removed TelemetryBar because it's redundant (YAGNI)
</script>

<div class="min-h-screen bg-black text-white selection:bg-white selection:text-black relative">

  <!-- Gradient Background -->
  <div class="fixed inset-0 bg-[radial-gradient(circle_at_80%_0%,_#1c1c1c_0%,_#000000_70%)] pointer-events-none z-0"></div>

  <div class="relative z-10">
    <slot />
  </div>
</div>
