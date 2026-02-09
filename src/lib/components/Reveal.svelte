<script lang="ts">
  import { onMount } from 'svelte';
  import { fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

  export let y: number = 20;
  export let duration: number = 600;
  export let delay: number = 0;
  export let threshold: number = 0.1;
  export let className: string = "";

  let visible = false;
  let element: HTMLElement;

  onMount(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          visible = true;
          observer.disconnect();
        }
      },
      { threshold }
    );

    if (element) observer.observe(element);
    return () => observer.disconnect();
  });
</script>

<div bind:this={element} class={className}>
  {#if visible}
    <div in:fly={{ y, duration, delay, easing: cubicOut }}>
      <slot />
    </div>
  {:else}
    <div class="opacity-0 translate-y-4 transition-none">
      <slot />
    </div>
  {/if}
</div>
