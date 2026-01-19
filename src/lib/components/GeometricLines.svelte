<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let width: number;
  let height: number;
  let animationFrame: number;

  // Define points for the mesh
  const points: { x: number; y: number; vx: number; vy: number }[] = [];
  const POINT_COUNT = 15; // Fewer points for larger shapes

  function init() {
    if (!canvas) return;
    resize();
    
    // Create points focused on the right side
    for (let i = 0; i < POINT_COUNT; i++) {
      points.push({
        x: Math.random() * width * 0.6 + (width * 0.4), // Start from 40% width to right edge
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.3, // Very slow movement
        vy: (Math.random() - 0.5) * 0.3
      });
    }
    
    loop();
  }

  function resize() {
    if (!canvas) return;
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)'; // Sharp grey lines
    ctx.lineWidth = 1;

    // Update points
    points.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      // Bounce off edges (virtual box on the right side)
      if (p.x < width * 0.2 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
    });

    // Draw Mesh (Connect every point to every other point if close enough)
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const p1 = points[i];
        const p2 = points[j];
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

        // Connect if distance is large enough to create big shapes, but not across the whole screen
        if (dist < width * 0.4) {
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
        }
      }
    }
    ctx.stroke();
  }

  function loop() {
    draw();
    animationFrame = requestAnimationFrame(loop);
  }

  onMount(() => {
    ctx = canvas.getContext('2d');
    init();
    window.addEventListener('resize', resize);
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
    };
  });
</script>

<canvas 
  bind:this={canvas} 
  class="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
></canvas>