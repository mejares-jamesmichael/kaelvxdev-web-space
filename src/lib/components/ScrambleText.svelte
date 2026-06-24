<script lang="ts">
  import { onMount } from 'svelte';

  const MAX_CONCURRENT_SCRAMBLES = 2;
  let activeScrambleCount = 0;

  interface Props {
    text: string;
    hoverTrigger?: boolean;
    speed?: number;
    autoPlay?: boolean;
  }

  let { text, hoverTrigger = true, speed = 50, autoPlay = false }: Props = $props();

  let displayText = $state('');
  let frameId: number;
  let lastTime = 0;
  let isVisible = $state(false);
  let isScrambling = $state(false);
  let element: HTMLElement;

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

  $effect(() => {
    displayText = text;
  });

  $effect(() => {
    if (autoPlay && isVisible && !isScrambling) scramble();
  });

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
      },
      { threshold: 0.1 }
    );

    if (element) observer.observe(element);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(frameId);
      if (isScrambling) activeScrambleCount = Math.max(0, activeScrambleCount - 1);
    };
  });

  function scramble() {
    if (isScrambling || activeScrambleCount >= MAX_CONCURRENT_SCRAMBLES) return;

    isScrambling = true;
    activeScrambleCount++;
    let iteration = 0;
    cancelAnimationFrame(frameId);

    const animate = (time: number) => {
      if (!lastTime) lastTime = time;
      const delta = time - lastTime;

      if (delta >= speed) {
        displayText = text
          .split('')
          .map((letter, index) => {
            if (index < iteration) {
              return text[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');

        iteration += 1 / 2;
        lastTime = time;
      }

      if (iteration < text.length) {
        frameId = requestAnimationFrame(animate);
      } else {
        displayText = text;
        isScrambling = false;
        activeScrambleCount = Math.max(0, activeScrambleCount - 1);
      }
    };

    frameId = requestAnimationFrame(animate);
  }

  function handleMouseOver() {
    if (hoverTrigger && isVisible) scramble();
  }
</script>

<span 
  bind:this={element}
  class="inline-block cursor-default font-mono transition-colors hover:text-white"
  onmouseenter={handleMouseOver}
  role="presentation"
>
  {displayText}
</span>

