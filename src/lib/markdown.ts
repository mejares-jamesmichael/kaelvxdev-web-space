export function renderMarkdown(text: string): string {
  return text
    // Code blocks: sharper corners, darker bg, slate border
    .replace(/```(\w*)\n?([\s\S]*?)```/g, '<pre class="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-sm p-4 my-3 overflow-x-auto text-xs font-mono text-[var(--color-success)] shadow-inner"><code>$2</code></pre>')
    // Inline code: sharper corners, subtle bg
    .replace(/`([^`]+)`/g, '<code class="bg-[var(--bg-card)] px-1.5 py-0.5 rounded-sm text-xs font-mono text-[var(--color-primary)] border border-[var(--border-default)]">$1</code>')
    // Headers: Technical, uppercase, mono
    .replace(/^### (.+)$/gm, '<strong class="block text-[var(--color-primary)] mt-6 mb-2 font-mono text-xs tracking-widest uppercase border-b border-[var(--border-default)] pb-1">$1</strong>')
    // Bold: White contrast
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    // Links: Blue, underline on hover
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" class="text-[var(--color-primary)] hover:text-[var(--color-secondary)] hover:underline transition-colors">$1</a>')
    // Lists: Custom marker
    .replace(/^[-*] (.+)$/gm, '<li class="ml-4 list-none relative pl-4 text-[var(--color-secondary)] mb-1 before:content-[\'-\'] before:absolute before:left-0 before:text-[var(--color-secondary)]">$1</li>')
    .replace(/\n/g, '<br/>');
}
