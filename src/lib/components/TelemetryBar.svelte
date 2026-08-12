<script lang="ts">
  import { onMount } from 'svelte';
  
  let scrollBytes = $state(0);
  let loadAvg = $state("0.00, 0.00, 0.00");
  
  onMount(() => {
    // Scroll listener translates scroll position to simulated bytes
    const handleScroll = () => {
      scrollBytes = Math.floor(window.scrollY * 2.5) * 1024; 
    };
    window.addEventListener('scroll', handleScroll);
    
    // Simulate server load average updating randomly
    const loadInterval = setInterval(() => {
       const load1 = (Math.random() * 0.5).toFixed(2);
       const load5 = (Math.random() * 0.3).toFixed(2);
       const load15 = (Math.random() * 0.1).toFixed(2);
       loadAvg = `${load1}, ${load5}, ${load15}`;
    }, 2500);
    
    // Initial call
    handleScroll();
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearInterval(loadInterval);
    };
  });
</script>

<div class="fixed bottom-0 left-0 w-full bg-black/90 border-t border-gray-800 text-[10px] font-mono text-gray-500 py-1.5 px-4 flex flex-wrap justify-between z-50 pointer-events-none backdrop-blur-sm">
  <div>[SYS: OK] // LOAD_AVG: {loadAvg}</div>
  <div>SCROLL_OFFSET_BYTES: <span class="text-white">{scrollBytes.toLocaleString()}</span></div>
</div>
