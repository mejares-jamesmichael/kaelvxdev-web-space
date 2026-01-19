<script lang="ts">
  import { onMount } from 'svelte';

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let width: number;
  let height: number;
  let animationFrame: number;
  let mouse = { x: -1000, y: -1000 };

  // Define points for the mesh
  // We add 'ox' and 'oy' (original/drift targets) if we wanted to return, 
  // but for free floating we just modify velocity.
  const points: { x: number; y: number; vx: number; vy: number }[] = [];
  const POINT_COUNT = 20; 

  function init() {
    if (!canvas) return;
    resize();
    
    // Create points focused on the right side
    for (let i = 0; i < POINT_COUNT; i++) {
      points.push({
        x: Math.random() * width * 0.6 + (width * 0.4), 
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5, 
        vy: (Math.random() - 0.5) * 0.5
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

  function onMouseMove(e: MouseEvent) {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }

  function draw() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
    ctx.lineWidth = 1;

    // Update points
    points.forEach(p => {
      // 1. Natural Drift
      p.x += p.vx;
      p.y += p.vy;

      // 2. Mouse Interaction (Repulsion)
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      const repulsionRadius = 300;

      if (dist < repulsionRadius) {
        const force = (repulsionRadius - dist) / repulsionRadius; // 0 to 1
        const angle = Math.atan2(dy, dx);
        const pushStrength = 2; 
        
        // Push point away
        p.x += Math.cos(angle) * force * pushStrength;
        p.y += Math.sin(angle) * force * pushStrength;
      }

      // 3. Bounce off edges
      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;
      
      // Keep loosely within bounds to avoid getting lost
      if (p.x < 0) p.x = 0;
      if (p.x > width) p.x = width;
      if (p.y < 0) p.y = 0;
      if (p.y > height) p.y = height;
    });

    // Draw Mesh
    ctx.beginPath();
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const p1 = points[i];
        const p2 = points[j];
        const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y);

        // Dynamic connection distance based on screen width
        if (dist < width * 0.3) {
          // Opacity based on distance (fade out long lines)
          const opacity = 1 - (dist / (width * 0.3));
          ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.3})`;
          
          ctx.beginPath(); // Start new path for individual stroke styles if needed, or optimize batch
          ctx.moveTo(p1.x, p1.y);
          ctx.lineTo(p2.x, p2.y);
          ctx.stroke();
        }
      }
    }
  }

  function loop() {
    draw();
    animationFrame = requestAnimationFrame(loop);
  }

  onMount(() => {
    ctx = canvas.getContext('2d');
    init();
    
    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);
    
    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  });
</script>

<canvas 
  bind:this={canvas} 
  class="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
></canvas>
