<script lang="ts">
  interface Props {
    text: string;
    hoverTrigger?: boolean;
    speed?: number;
    autoPlay?: boolean;
  }
  
  let { text, hoverTrigger = true, speed = 30, autoPlay = false }: Props = $props();
  
  let displayText = $state('');
  let interval: ReturnType<typeof setInterval>;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  // Sync displayText with text prop changes
  $effect(() => {
    displayText = text;
  });
  
  $effect(() => {
    if (autoPlay) scramble();
  });

  function scramble() {
    let iteration = 0;
    
    clearInterval(interval);
    
    interval = setInterval(() => {
      displayText = text
        .split('')
        .map((letter, index) => {
          if (index < iteration) {
            return text[index];
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      
      if (iteration >= text.length) {
        clearInterval(interval);
      }
      
      iteration += 1 / 2;
    }, speed);
  }

  function handleMouseOver() {
    if (hoverTrigger) scramble();
  }
</script>

<span 
  class="inline-block cursor-default font-mono transition-colors hover:text-white"
  onmouseenter={handleMouseOver}
  role="presentation"
>
  {displayText}
</span>
