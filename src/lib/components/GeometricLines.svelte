<svg
  class="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
  xmlns="http://www.w3.org/2000/svg"
  preserveAspectRatio="none"
  viewBox="0 0 1920 1080"
>
  <g stroke="rgba(255,255,255,0.15)" stroke-width="1" fill="none" class="topology-lines">
    <!-- Main cluster (right side) -->
    <line x1="1200" y1="0" x2="1600" y2="400" />
    <line x1="1600" y1="400" x2="1400" y2="800" />
    <line x1="1400" y1="800" x2="1800" y2="1080" />
    <line x1="1800" y1="1080" x2="1920" y2="600" />
    <line x1="1920" y1="600" x2="1600" y2="0" />
    <line x1="1200" y1="0" x2="1400" y2="800" />
    <line x1="1600" y1="400" x2="1800" y2="1080" />
    <line x1="1400" y1="800" x2="1920" y2="600" />
    <line x1="1800" y1="1080" x2="1600" y2="0" />
    <line x1="1200" y1="0" x2="1920" y2="600" />
    <line x1="1600" y1="0" x2="1800" y2="1080" />
    <line x1="1400" y1="800" x2="1600" y2="400" />

    <!-- Center density (filling gaps) -->
    <line x1="800" y1="200" x2="1400" y2="100" />
    <line x1="800" y1="200" x2="1200" y2="600" />
    <line x1="1000" y1="500" x2="1600" y2="400" />
    <line x1="900" y1="700" x2="1400" y2="800" />
    <line x1="1000" y1="500" x2="1400" y2="800" />
    <line x1="800" y1="200" x2="1000" y2="500" />

    <!-- Long diagonals for depth -->
    <line x1="600" y1="0" x2="1200" y2="600" />
    <line x1="0" y1="400" x2="1200" y2="600" />
    <line x1="600" y1="1080" x2="1400" y2="800" />
    <line x1="0" y1="700" x2="800" y2="200" />

    <!-- Sparse outer framing -->
    <line x1="400" y1="0" x2="800" y2="200" />
    <line x1="400" y1="1080" x2="900" y2="700" />
    <line x1="1200" y1="600" x2="1800" y2="1080" />
  </g>
</svg>

<style>
  .topology-lines line {
    /* Large enough dasharray to cover the longest line */
    stroke-dasharray: 2500;
    stroke-dashoffset: 2500;
    /* Draw in, then pulse */
    animation: 
      drawTopology 2.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards,
      pulseTopology 6s 2.5s infinite alternate ease-in-out;
  }

  /* Stagger the animation so they don't all draw at exactly the same time */
  .topology-lines line:nth-child(odd) {
    animation-delay: 0.15s, 2.65s;
  }
  .topology-lines line:nth-child(3n) {
    animation-delay: 0.3s, 2.8s;
  }
  .topology-lines line:nth-child(5n) {
    animation-delay: 0.45s, 2.95s;
  }

  @keyframes drawTopology {
    to {
      stroke-dashoffset: 0;
    }
  }

  @keyframes pulseTopology {
    0% { opacity: 1; }
    50% { opacity: 0.4; }
    100% { opacity: 0.9; }
  }
</style>
