import { describe, it } from 'node:test';
import assert from 'node:assert';
import { renderMarkdown } from './markdown.ts';

describe('renderMarkdown', () => {
  it('should convert newlines to <br/>', () => {
    const input = 'Hello\nWorld';
    const output = renderMarkdown(input);
    assert.strictEqual(output, 'Hello<br/>World');
  });

  it('should render headers', () => {
    const input = '### Technical Header';
    const output = renderMarkdown(input);
    assert.ok(output.includes('<strong class="block text-[var(--color-primary)]'));
    assert.ok(output.includes('Technical Header'));
  });

  it('should render bold text', () => {
    const input = 'This is **bold** text';
    const output = renderMarkdown(input);
    assert.ok(output.includes('<strong class="text-white font-semibold">bold</strong>'));
  });

  it('should render inline code', () => {
    const input = 'Use `const x = 1` here';
    const output = renderMarkdown(input);
    assert.ok(output.includes('<code class="bg-[var(--bg-card)] px-1.5 py-0.5 rounded-sm text-xs font-mono text-[var(--color-primary)] border border-[var(--border-default)]">const x = 1</code>'));
  });

  it('should render code blocks', () => {
    const input = '```typescript\nconst x = 1;\n```';
    const output = renderMarkdown(input);
    assert.ok(output.includes('<pre class="bg-[var(--bg-card)] border border-[var(--border-default)] rounded-sm p-4 my-3 overflow-x-auto text-xs font-mono text-[var(--color-success)] shadow-inner"><code>const x = 1;'));
  });

  it('should render links', () => {
    const input = '[Google](https://google.com)';
    const output = renderMarkdown(input);
    assert.ok(output.includes('<a href="https://google.com" target="_blank"'));
    assert.ok(output.includes('Google</a>'));
  });

  it('should render lists', () => {
    const input = '- Item 1\n* Item 2';
    const output = renderMarkdown(input);
    assert.ok(output.includes('<li class="ml-4 list-none relative pl-4 text-[var(--color-secondary)] mb-1 before:content-[\'-\'] before:absolute before:left-0 before:text-[var(--color-secondary)]">Item 1</li>'));
    assert.ok(output.includes('<li class="ml-4 list-none relative pl-4 text-[var(--color-secondary)] mb-1 before:content-[\'-\'] before:absolute before:left-0 before:text-[var(--color-secondary)]">Item 2</li>'));
  });

  it('should handle complex mixed markdown', () => {
    const input = '### Header\n- List **bold**\n`code`';
    const output = renderMarkdown(input);
    assert.ok(output.includes('<strong class="block text-[var(--color-primary)]'));
    assert.ok(output.includes('<li'));
    assert.ok(output.includes('<strong class="text-white font-semibold">bold</strong>'));
    assert.ok(output.includes('<code'));
  });
});
