function escapeHtml(text: string): string {
  const map: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;'
  };
  return text.replace(/[&<>"']/g, (m) => map[m]);
}

function sanitizeUrl(url: string): string {
  const lowercaseUrl = url.trim().toLowerCase();
  if (lowercaseUrl.startsWith('javascript:') || lowercaseUrl.startsWith('data:') || lowercaseUrl.startsWith('vbscript:')) {
    return 'about:blank';
  }
  return url;
}

export function renderMarkdown(text: string): string {
  // 1. Escape HTML to prevent XSS from raw HTML
  let escapedText = escapeHtml(text);

  // 2. Apply markdown transformations
  return escapedText
    // Code blocks
    .replace(/```(\w*)\n?([\s\S]*?)```/g, (_, lang, code) => {
        return `<pre class="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-sm p-4 my-3 overflow-x-auto text-xs font-mono text-[var(--color-success)] shadow-inner"><code>${code}</code></pre>`;
    })
    // Inline code
    .replace(/`([^`]+)`/g, '<code class="bg-[var(--bg-card)] px-1.5 py-0.5 rounded-sm text-xs font-mono text-[var(--color-primary)] border border-[var(--border-default)]">$1</code>')
    // Headers
    .replace(/^### (.+)$/gm, '<strong class="block text-[var(--color-primary)] mt-6 mb-2 font-mono text-xs tracking-widest uppercase border-b border-[var(--border-default)] pb-1">$1</strong>')
    // Bold
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="text-white font-semibold">$1</strong>')
    // Links: Sanitize URL
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_, label, url) => {
        const safeUrl = sanitizeUrl(url);
        return `<a href="${safeUrl}" target="_blank" class="text-[var(--color-primary)] hover:text-[var(--color-secondary)] hover:underline transition-colors">${label}</a>`;
    })
    // Lists
    .replace(/^[-*] (.+)$/gm, '<li class="ml-4 list-none relative pl-4 text-[var(--color-secondary)] mb-1 before:content-[\'-\'] before:absolute before:left-0 before:text-[var(--color-secondary)]">$1</li>')
    .replace(/\n/g, '<br/>');
}
