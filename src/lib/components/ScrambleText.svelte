<script lang="ts">
  export let text: string;
  export let hoverTrigger = true;
  export let speed = 30;
  export let autoPlay = false;
  
  let displayText = text;
  let interval: ReturnType<typeof setInterval>;
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';
  
  $: if (autoPlay) scramble();

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
  on:mouseenter={handleMouseOver}
  role="presentation"
>
  {displayText}
</span>
