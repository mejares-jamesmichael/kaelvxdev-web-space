import { writable } from 'svelte/store';

// Tracks the title of the currently hovered project card
export const hoveredProject = writable<string | null>(null);
