/**
 * Clean, Token-Safe Syntax Highlighter for CodeViewer
 * Supports Java / C-family keywords, strings, numbers, and single/multi-line comments
 * without corrupting HTML entities or overlapping regex replacements.
 */

export function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

const KEYWORDS = new Set([
  'public',
  'private',
  'protected',
  'static',
  'final',
  'void',
  'class',
  'int',
  'double',
  'float',
  'long',
  'boolean',
  'char',
  'String',
  'for',
  'while',
  'do',
  'if',
  'else',
  'switch',
  'case',
  'break',
  'continue',
  'new',
  'true',
  'false',
  'null',
  'return'
])

export function highlightJavaLine(rawLine) {
  const line = String(rawLine ?? '')
  if (!line.trim()) return '&nbsp;'

  // Check if entire trimmed line is a block comment line (* or /** or */)
  const trimmed = line.trim()
  if (trimmed.startsWith('/*') || trimmed.startsWith('*') || trimmed.startsWith('//')) {
    return `<span class="cm">${esc(line)}</span>`
  }

  // Separate trailing // comment if not inside quotes
  let codePart = line
  let commentPart = ''
  let inSingle = false
  let inDouble = false

  for (let i = 0; i < line.length; i++) {
    const ch = line[i]
    const prev = i > 0 ? line[i - 1] : ''
    if (ch === "'" && !inDouble && prev !== '\\') inSingle = !inSingle
    else if (ch === '"' && !inSingle && prev !== '\\') inDouble = !inDouble
    else if (ch === '/' && line[i + 1] === '/' && !inSingle && !inDouble) {
      codePart = line.slice(0, i)
      commentPart = line.slice(i)
      break
    }
  }

  // Tokenize codePart into strings, identifiers, numbers, and punctuation
  const tokenRegex = /("(?:\\.|[^"\\])*"|'(?:\\.|[^'\\])*'|\b[A-Za-z_]\w*\b|\b\d+(?:\.\d+)?\b)/g
  let result = ''
  let lastIdx = 0
  let match

  while ((match = tokenRegex.exec(codePart)) !== null) {
    // Append escaped text before token
    if (match.index > lastIdx) {
      result += esc(codePart.slice(lastIdx, match.index))
    }
    const token = match[0]
    if (token.startsWith('"') || token.startsWith("'")) {
      result += `<span class="string">${esc(token)}</span>`
    } else if (KEYWORDS.has(token)) {
      result += `<span class="kw">${esc(token)}</span>`
    } else if (/^\d/.test(token)) {
      result += `<span class="nm">${esc(token)}</span>`
    } else {
      result += esc(token)
    }
    lastIdx = tokenRegex.lastIndex
  }

  if (lastIdx < codePart.length) {
    result += esc(codePart.slice(lastIdx))
  }

  if (commentPart) {
    result += `<span class="cm">${esc(commentPart)}</span>`
  }

  return result || '&nbsp;'
}
