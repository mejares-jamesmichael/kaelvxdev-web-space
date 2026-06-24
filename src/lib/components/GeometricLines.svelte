<script lang="ts">
  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D | null;
  let width: number;
  let height: number;
  let animationFrame: number;
  let lastFrameTime = 0;
  let mouse = { x: -1000, y: -1000 };

  const points: { x: number; y: number; vx: number; vy: number }[] = [];
  const POINT_COUNT = 12;
  const FRAME_INTERVAL = 33; // ~30fps
  const REPULSION_RADIUS = 300;
  const PUSH_STRENGTH = 2;
  const CONNECTION_DISTANCE_RATIO = 0.3;

  function init() {
    if (!canvas) return;
    resize();

    for (let i = 0; i < POINT_COUNT; i++) {
      points.push({
        x: Math.random() * width * 0.6 + width * 0.4,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5
      });
    }

    loop(0);
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
    const context = ctx;
    context.clearRect(0, 0, width, height);
    context.lineWidth = 1;

    const connectionDist = width * CONNECTION_DISTANCE_RATIO;
    const now = Date.now();

    // Update points
    for (let i = 0; i < points.length; i++) {
      const p = points[i];

      p.x += p.vx;
      p.y += p.vy;

      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const distSq = dx * dx + dy * dy;

      if (distSq < REPULSION_RADIUS * REPULSION_RADIUS) {
        const dist = Math.sqrt(distSq);
        const force = (REPULSION_RADIUS - dist) / REPULSION_RADIUS;
        const angle = Math.atan2(dy, dx);
        p.x += Math.cos(angle) * force * PUSH_STRENGTH;
        p.y += Math.sin(angle) * force * PUSH_STRENGTH;
      }

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      if (p.x < 0) p.x = 0;
      if (p.x > width) p.x = width;
      if (p.y < 0) p.y = 0;
      if (p.y > height) p.y = height;
    }

    // Draw lines — batch by opacity buckets for fewer state changes
    const connectionDistSq = connectionDist * connectionDist;
    const buckets: { p1: typeof points[0]; p2: typeof points[0]; opacity: number }[] = [];

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const p1 = points[i];
        const p2 = points[j];
        const dx = p1.x - p2.x;
        const dy = p1.y - p2.y;
        const distSq = dx * dx + dy * dy;

        if (distSq < connectionDistSq) {
          const dist = Math.sqrt(distSq);
          buckets.push({
            p1,
            p2,
            opacity: (1 - dist / connectionDist) * 0.3
          });
        }
      }
    }

    // Sort by opacity so we batch similar strokes
    buckets.sort((a, b) => a.opacity - b.opacity);

    let lastOpacity = -1;
    for (const line of buckets) {
      const op = Math.round(line.opacity * 100) / 100;
      if (op !== lastOpacity) {
        context.strokeStyle = `rgba(255,255,255,${op})`;
        lastOpacity = op;
      }
      context.beginPath();
      context.moveTo(line.p1.x, line.p1.y);
      context.lineTo(line.p2.x, line.p2.y);
      context.stroke();
    }

    // Draw pulsing nodes
    const pulse = Math.sin(now / 500) * 2 + 3;
    for (const p of points) {
      context.beginPath();
      context.arc(p.x, p.y, pulse, 0, Math.PI * 2);
      context.fillStyle = 'rgba(59, 130, 246, 0.4)';
      context.fill();
    }
  }

  function loop(timestamp: number) {
    if (!document.hidden && timestamp - lastFrameTime >= FRAME_INTERVAL) {
      draw();
      lastFrameTime = timestamp;
    }
    animationFrame = requestAnimationFrame(loop);
  }

  $effect(() => {
    if (!canvas) return;

    ctx = canvas.getContext('2d');
    if (!ctx) return;

    init();

    return () => cancelAnimationFrame(animationFrame);
  });

  $effect(() => {
    if (!canvas) return;

    window.addEventListener('resize', resize);
    window.addEventListener('mousemove', onMouseMove);

    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', onMouseMove);
    };
  });
</script>

<canvas
  bind:this={canvas}
  class="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
  style="will-change: transform"
></canvas>
