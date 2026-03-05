import { test } from 'node:test';
import assert from 'node:assert';
import { renderMarkdown } from './markdown.ts';

test('renderMarkdown handles basic markdown', () => {
  const input = '### Header\n**bold** `code`';
  const output = renderMarkdown(input);
  assert.ok(output.includes('<strong'));
  assert.ok(output.includes('bold'));
  assert.ok(output.includes('code'));
});

test('renderMarkdown escapes plain text HTML', () => {
  const input = '<script>alert("xss")</script>';
  const output = renderMarkdown(input);
  assert.strictEqual(output.includes('<script>'), false);
  assert.ok(output.includes('&lt;script&gt;'));
});

test('renderMarkdown sanitizes javascript: links', () => {
  const input = '[click me](javascript:alert("xss"))';
  const output = renderMarkdown(input);
  assert.strictEqual(output.includes('javascript:'), false);
  assert.ok(output.includes('href="about:blank"'));
});

test('renderMarkdown escapes HTML in code blocks', () => {
    const input = '```\n<script>alert(1)</script>\n```';
    const output = renderMarkdown(input);
    assert.ok(output.includes('&lt;script&gt;'));
    assert.strictEqual(output.includes('<script>'), false);
});

test('renderMarkdown handles normal links', () => {
    const input = '[Google](https://google.com)';
    const output = renderMarkdown(input);
    assert.ok(output.includes('href="https://google.com"'));
});
