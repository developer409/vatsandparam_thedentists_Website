const fs = require('fs');

const content = fs.readFileSync('index.html', 'utf8');

// A simple stack-based tag balancer
function checkBalancing(html) {
  const tagRegex = /<\/?([a-z0-9:-]+)(?:\s+[^>]*)?>/gi;
  const stack = [];
  const ignoredTags = new Set(['area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input', 'link', 'meta', 'param', 'source', 'track', 'wbr', 'path', 'svg', 'circle', 'rect', 'line', 'use', 'video']);
  
  let match;
  let line = 1;
  let lastIndex = 0;

  // Track line numbers
  function getLineNumber(index) {
    const textUpTo = html.substring(0, index);
    return textUpTo.split('\n').length;
  }

  while ((match = tagRegex.exec(html)) !== null) {
    const fullTag = match[0];
    const tagName = match[1].toLowerCase();
    const isClosing = fullTag.startsWith('</');

    if (ignoredTags.has(tagName)) {
      continue;
    }

    const currentLine = getLineNumber(match.index);

    if (isClosing) {
      if (stack.length === 0) {
        console.log(`Unmatched closing tag </${tagName}> at line ${currentLine}`);
      } else {
        const last = stack.pop();
        if (last.name !== tagName) {
          console.log(`Mismatched tag: opened <${last.name}> at line ${last.line}, but closed </${tagName}> at line ${currentLine}`);
          // Put it back to try to recover
          stack.push(last);
        }
      }
    } else {
      // Don't push self-closing tags like <div />
      if (!fullTag.endsWith('/>')) {
        stack.push({ name: tagName, line: currentLine });
      }
    }
  }

  while (stack.length > 0) {
    const unclosed = stack.pop();
    console.log(`Unclosed tag <${unclosed.name}> opened at line ${unclosed.line}`);
  }
}

checkBalancing(content);
