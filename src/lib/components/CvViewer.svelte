<script lang="ts">
  import { onMount } from "svelte";
  import cvPages from "$lib/cv-pages.json";

  let { open = $bindable(false) }: { open: boolean } = $props();

  let currentPage = $state(0);
  let zoom = $state(1);
  let watermarkTime = $state("");
  let prevButton: HTMLButtonElement | undefined = $state(undefined);

  const totalPages = cvPages.pages.length;
  const ZOOM_MIN = 0.5;
  const ZOOM_MAX = 3;
  const ZOOM_STEP = 0.25;

  function formatTimestamp() {
    const now = new Date();
    const y = now.getFullYear();
    const m = String(now.getMonth() + 1).padStart(2, "0");
    const d = String(now.getDate()).padStart(2, "0");
    const h = String(now.getHours()).padStart(2, "0");
    const min = String(now.getMinutes()).padStart(2, "0");
    const s = String(now.getSeconds()).padStart(2, "0");
    return `${y}-${m}-${d} ${h}:${min}:${s}`;
  }

  function updateWatermark() {
    watermarkTime = formatTimestamp();
  }

  function nextPage() {
    if (currentPage < totalPages - 1) currentPage++;
  }

  function prevPage() {
    if (currentPage > 0) currentPage--;
  }

  function zoomIn() {
    if (zoom < ZOOM_MAX) zoom = Math.min(ZOOM_MAX, zoom + ZOOM_STEP);
  }

  function zoomOut() {
    if (zoom > ZOOM_MIN) zoom = Math.max(ZOOM_MIN, zoom - ZOOM_STEP);
  }

  function closeModal() {
    open = false;
    currentPage = 0;
    zoom = 1;
  }

  function handleKeydown(e: KeyboardEvent) {
    if (!open) return;

    if (e.key === "Escape") {
      closeModal();
      return;
    }
    if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      nextPage();
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      prevPage();
    }
    if (e.key === "+" || e.key === "=") {
      e.preventDefault();
      zoomIn();
    }
    if (e.key === "-") {
      e.preventDefault();
      zoomOut();
    }

    if ((e.ctrlKey || e.metaKey) && "spujca".includes(e.key.toLowerCase())) {
      e.preventDefault();
    }
    if (e.key === "F12") {
      e.preventDefault();
    }
  }

  onMount(() => {
    document.addEventListener("keydown", handleKeydown);
    return () => {
      document.removeEventListener("keydown", handleKeydown);
    };
  });

  $effect(() => {
    if (open) {
      updateWatermark();
      const interval = setInterval(updateWatermark, 1000);
      setTimeout(() => prevButton?.focus(), 50);
      return () => clearInterval(interval);
    }
  });
</script>

{#if open}
  <div class="cv-modal" role="dialog" aria-modal="true" aria-label="CV Viewer">
    <!-- svelte-ignore a11y_click_events_have_key_events a11y_no_static_element_interactions -->
    <div class="cv-backdrop" onclick={closeModal} role="button" tabindex="-1"></div>

    <div class="cv-content">
      <div class="cv-header">
        <span class="cv-title">CV Viewer</span>
        <button class="cv-close" onclick={closeModal} aria-label="Close viewer">
          &times;
        </button>
      </div>

      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
      <div class="cv-page-wrapper" oncontextmenu={(e) => e.preventDefault()}>
        <div class="cv-watermark" aria-hidden="true">
          {#each Array(8) as _, i}
            <span
              class="cv-watermark-text"
              style="top: {10 + i * 15}%; left: {(i % 2) * 35 + 5}%; transform: rotate({-25 + (i % 3) * 5}deg)"
            >
              kaelvxdev.space &bull; {watermarkTime}
            </span>
          {/each}
        </div>
        <!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
        <img
          src={cvPages.pages[currentPage]}
          alt="CV page {currentPage + 1}"
          draggable="false"
          class="cv-page-img"
          style="transform: scale({zoom})"
          oncontextmenu={(e) => e.preventDefault()}
        />
      </div>

      <div class="cv-footer">
        <div class="cv-controls-left">
          <button
            bind:this={prevButton}
            onclick={prevPage}
            disabled={currentPage === 0}
            class="cv-btn"
            aria-label="Previous page"
          >
            &#8592;
          </button>
          <span class="cv-page-info">
            {currentPage + 1} / {totalPages}
          </span>
          <button
            onclick={nextPage}
            disabled={currentPage === totalPages - 1}
            class="cv-btn"
            aria-label="Next page"
          >
            &#8594;
          </button>
        </div>

        <div class="cv-controls-right">
          <button
            onclick={zoomOut}
            disabled={zoom <= ZOOM_MIN}
            class="cv-btn"
            aria-label="Zoom out"
          >
            &minus;
          </button>
          <span class="cv-zoom-info">{Math.round(zoom * 100)}%</span>
          <button
            onclick={zoomIn}
            disabled={zoom >= ZOOM_MAX}
            class="cv-btn"
            aria-label="Zoom in"
          >
            +
          </button>
        </div>
      </div>
    </div>
  </div>
{/if}

<style>
  .cv-modal {
    position: fixed;
    inset: 0;
    z-index: 50;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
  }

  .cv-backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.85);
    backdrop-filter: blur(4px);
  }

  .cv-content {
    position: relative;
    z-index: 1;
    width: 100%;
    max-width: 900px;
    max-height: 90vh;
    display: flex;
    flex-direction: column;
    background: #0a0a0a;
    border: 1px solid #333;
    font-family: "JetBrains Mono", monospace;
    color: #fff;
  }

  .cv-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-bottom: 1px solid #333;
    font-size: 0.75rem;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    color: #9ca3af;
  }

  .cv-title {
    font-weight: 600;
  }

  .cv-close {
    background: none;
    border: none;
    color: #fff;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0 0.5rem;
    line-height: 1;
    transition: color 0.15s;
  }

  .cv-close:hover,
  .cv-close:focus-visible {
    color: #9ca3af;
    outline: 2px solid #fff;
    outline-offset: 2px;
  }

  .cv-page-wrapper {
    position: relative;
    flex: 1;
    overflow: auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background: #111;
    min-height: 0;
  }

  .cv-page-img {
    display: block;
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    user-select: none;
    pointer-events: none;
    transform-origin: center center;
    transition: transform 0.15s ease;
  }

  .cv-watermark {
    position: absolute;
    inset: 0;
    pointer-events: none;
    overflow: hidden;
    z-index: 2;
  }

  .cv-watermark-text {
    position: absolute;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.7rem;
    color: rgba(255, 255, 255, 0.15);
    white-space: nowrap;
    letter-spacing: 0.05em;
    pointer-events: none;
    user-select: none;
  }

  .cv-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0.75rem 1rem;
    border-top: 1px solid #333;
    font-size: 0.75rem;
    color: #9ca3af;
  }

  .cv-controls-left,
  .cv-controls-right {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .cv-btn {
    background: none;
    border: 1px solid #444;
    color: #fff;
    padding: 0.25rem 0.625rem;
    font-family: "JetBrains Mono", monospace;
    font-size: 0.75rem;
    cursor: pointer;
    transition: border-color 0.15s, color 0.15s;
  }

  .cv-btn:hover:not(:disabled),
  .cv-btn:focus-visible:not(:disabled) {
    border-color: #fff;
    outline: none;
  }

  .cv-btn:disabled {
    opacity: 0.3;
    cursor: not-allowed;
  }

  .cv-page-info,
  .cv-zoom-info {
    font-variant-numeric: tabular-nums;
    min-width: 3.5rem;
    text-align: center;
  }

  @media print {
    .cv-modal {
      display: none !important;
    }
  }
</style>
