<script>
  import '../app.css';
</script>

<div class="min-h-screen bg-black text-white selection:bg-white selection:text-black relative">
  
  <!-- Option 3: Analog Void (Gradient + Noise) -->
  
  <!-- 1. Asymmetric Gradient Background -->
  <div class="fixed inset-0 bg-[radial-gradient(circle_at_80%_0%,_#1c1c1c_0%,_#000000_70%)] pointer-events-none z-0"></div>

  <!-- 2. Noise Overlay -->
  <div class="fixed inset-0 opacity-[0.04] pointer-events-none z-0 mix-blend-overlay" style="background-image: url('/noise.svg'); background-repeat: repeat; background-size: 128px;"></div>
  
  <div class="relative z-10">
    <slot />
  </div>
</div>
