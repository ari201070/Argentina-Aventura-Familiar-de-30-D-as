
import React from 'react';
import { Language } from '../types'; 

// Parses simple Markdown links like [text](url)
export const parseMarkdownLinks = (text: string): React.ReactNode[] => {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const parts: React.ReactNode[] = [];
  let lastIndex = 0;
  let match;
  let keyIndex = 0; // For unique keys

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.substring(lastIndex, match.index));
    }
    parts.push(
      React.createElement('a', {
        key: `md-link-${keyIndex++}`,
        href: match[2],
        target: '_blank',
        rel: 'noopener noreferrer',
        className: 'text-indigo-600 hover:text-indigo-800 underline transition-colors duration-150'
      }, match[1])
    );
    lastIndex = linkRegex.lastIndex;
  }

  if (lastIndex < text.length) {
    parts.push(text.substring(lastIndex));
  }
  return parts;
};

// Parses simple Markdown pipe tables
export const parseMarkdownTable = (
  markdownTable: string,
  t: (key: string) => string, 
  lang: Language
): React.ReactNode => {
  const lines = markdownTable.trim().split('\n');
  if (lines.length < 2) return React.createElement('p', { key: 'md-table-fallback' }, markdownTable); 

  const sanitizeCell = (cellText: string) => cellText.trim();

  let headers: string[];
  const headerKeys = ['table_header_restaurant', 'table_header_cafe', 'table_header_type', 'table_header_gluten_free', 'table_header_sugar_free'];
  const translatedHeaders = headerKeys.map(key => t(key)).filter(translated => !headerKeys.includes(translated)); 


  if (translatedHeaders.length >= 2) { 
      const markdownHeaderLine = lines[0].toLowerCase();
      headers = translatedHeaders.filter(th => th && markdownHeaderLine.includes(th.split(' ')[0].toLowerCase()));
      if(headers.length < 2) { 
        headers = lines[0].split('|').map(sanitizeCell).filter(Boolean);
      }
  } else {
      headers = lines[0].split('|').map(sanitizeCell).filter(Boolean);
  }


  let headerSeparatorIndex = -1;
  for (let i = 1; i < lines.length; i++) {
    if (lines[i].includes('---')) {
      headerSeparatorIndex = i;
      break;
    }
  }

  if (headerSeparatorIndex === -1) return React.createElement('p', { key: 'md-table-fallback-no-sep' }, markdownTable); 

  const bodyRows = lines.slice(headerSeparatorIndex + 1)
    .map(line => line.split('|').map(sanitizeCell).filter(Boolean))
    .filter(row => row.length > 0);

  const headerActualKeys = lines[0].split('|').map(h => h.trim().toLowerCase()).filter(Boolean);
  
  const columnAlignments: string[] = headerActualKeys.map(hKey => {
      if (hKey === t('table_header_gluten_free').toLowerCase() || hKey === t('table_header_sugar_free').toLowerCase() || hKey === 'sin gluten' || hKey === 'sin azúcar' || hKey === 'ללא גלוטן' || hKey === 'ללא סוכר') {
          return lang === Language.HE ? 'text-right' : 'text-center'; 
      }
      return lang === Language.HE ? 'text-right' : 'text-left';
  });


  return (
    React.createElement('div', { className: "overflow-x-auto my-4", key: 'md-table-wrapper' },
      React.createElement('table', { className: "min-w-full divide-y divide-gray-300 border border-gray-300 rounded-lg shadow-sm" },
        React.createElement('thead', { className: "bg-indigo-50" },
          React.createElement('tr', null,
            headers.map((header, index) => (
              React.createElement('th', {
                key: `th-${index}`,
                scope: "col",
                className: `px-4 py-3 ${(columnAlignments[index] || (lang === Language.HE ? 'text-right' : 'text-left'))} text-sm font-semibold text-indigo-700`
              }, header)
            ))
          )
        ),
        React.createElement('tbody', { className: "divide-y divide-gray-200 bg-white" },
          bodyRows.map((row, rowIndex) => (
            React.createElement('tr', { key: `tr-${rowIndex}`, className: (rowIndex % 2 === 0 ? undefined : 'bg-gray-50') },
              row.map((cell, cellIndex) => {
                const cellContent = parseMarkdownLinks(cell);
                return (
                  React.createElement('td', {
                    key: `td-${rowIndex}-${cellIndex}`,
                    className: `px-4 py-3 whitespace-nowrap text-sm text-gray-600 ${(columnAlignments[cellIndex] || (lang === Language.HE ? 'text-right' : 'text-left'))}`
                  }, ...cellContent) // Spread children
                );
              })
            )
          ))
        )
      )
    )
  );
};


// General Markdown Parser
// This is a simplified parser. It won't handle all Markdown complexities or nested structures perfectly.
export const parseGeneralMarkdown = (
    markdown: string, 
    t: (key: string) => string, 
    lang: Language
  ): React.ReactNode[] => {
  if (!markdown || typeof markdown !== 'string') {
    return [React.createElement('p', { key: 'empty-md' }, '')];
  }
  const blocks = markdown.split(/\n{2,}/); // Split by double newlines for paragraphs/blocks

  return blocks.map((block, index) => {
    block = block.trim();

    // Headers
    if (block.startsWith('#')) {
      let level = 0;
      while (block[level] === '#') {
        level++;
      }
      const headerText = block.substring(level).trim();
      const Tag = `h${level > 6 ? 6 : level}` as keyof JSX.IntrinsicElements;
      const classNames: Record<string, string> = {
        h1: 'text-3xl font-bold my-4 text-gray-900',
        h2: 'text-2xl font-semibold my-3 text-gray-800',
        h3: 'text-xl font-semibold my-2 text-gray-700',
        h4: 'text-lg font-medium my-1 text-gray-700',
        h5: 'text-base font-medium text-gray-600',
        h6: 'text-sm font-medium text-gray-600',
      };
      return React.createElement(Tag, { key: `h-${index}`, className: classNames[Tag] || classNames.h4 }, ...parseInlineMarkdown(headerText));
    }

    // Tables (check if block looks like a table)
    if (block.includes('|') && block.includes('---') && block.split('\n').length > 1) {
        return parseMarkdownTable(block, t, lang);
    }
    
    // Unordered Lists
    if (block.startsWith('- ') || block.startsWith('* ')) {
      const items = block.split('\n').map(item => item.replace(/^(\*|-)\s+/, '').trim());
      return React.createElement('ul', { key: `ul-${index}`, className: 'list-disc list-inside space-y-1 my-2 pl-5 text-gray-700' },
        ...items.map((item, i) => React.createElement('li', { key: `li-ul-${index}-${i}` }, ...parseInlineMarkdown(item)))
      );
    }

    // Ordered Lists
    if (block.match(/^\d+\.\s/)) {
      const items = block.split('\n').map(item => item.replace(/^\d+\.\s/, '').trim());
      return React.createElement('ol', { key: `ol-${index}`, className: 'list-decimal list-inside space-y-1 my-2 pl-5 text-gray-700' },
        ...items.map((item, i) => React.createElement('li', { key: `li-ol-${index}-${i}` }, ...parseInlineMarkdown(item)))
      );
    }
    
    // Default to paragraph
    const paragraphLines = block.split('\n').map((line, lineIdx) => {
      const lineContentNodes = parseInlineMarkdown(line); // Returns React.ReactNode[]
      const addBreak = lineIdx < block.split('\n').length - 1;
      
      const fragmentChildren: React.ReactNode[] = [...lineContentNodes];
      if (addBreak) {
        // Using a unique key for the <br /> element when it's part of a list of children
        fragmentChildren.push(React.createElement('br', { key: `br-in-frag-${index}-${lineIdx}` }));
      }
      
      return React.createElement(
        React.Fragment,
        { key: `para-line-frag-${index}-${lineIdx}` },
        ...fragmentChildren
      );
    });

    return React.createElement('p', { key: `p-${index}`, className: 'my-2 text-gray-700 leading-relaxed' }, ...paragraphLines);
  });
};

// Parses inline markdown (bold, italic, links)
const parseInlineMarkdown = (text: string): React.ReactNode[] => {
  let remainingText = text;
  const elements: React.ReactNode[] = [];
  let keyIndex = 0;

  // Regex for bold, italic, and links. Prioritize links.
  const inlineRegex = /(\*\*(.*?)\*\*|__(.*?)__|\*(.*?)\*|_(.*?)_|\[([^\]]+)\]\(([^)]+)\))/g;
  
  let match;
  let lastIndex = 0;

  while ((match = inlineRegex.exec(remainingText)) !== null) {
    // Text before match
    if (match.index > lastIndex) {
      elements.push(remainingText.substring(lastIndex, match.index));
    }

    const boldTextDoubleStar = match[2];
    const boldTextUnderscore = match[3];
    const italicTextStar = match[4];
    const italicTextUnderscore = match[5];
    const linkText = match[6]; // Corrected: Group 6 for link text
    const linkUrl = match[7];  // Corrected: Group 7 for link URL

    if (linkText !== undefined && linkUrl !== undefined) {
      elements.push(
        React.createElement('a', {
          key: `inline-link-${keyIndex++}`,
          href: linkUrl,
          target: '_blank',
          rel: 'noopener noreferrer',
          className: 'text-indigo-600 hover:text-indigo-800 underline'
        }, linkText)
      );
    } else if (boldTextDoubleStar !== undefined) {
      elements.push(React.createElement('strong', { key: `strong-ds-${keyIndex++}` }, boldTextDoubleStar));
    } else if (boldTextUnderscore !== undefined) {
      elements.push(React.createElement('strong', { key: `strong-us-${keyIndex++}` }, boldTextUnderscore));
    } else if (italicTextStar !== undefined) {
      elements.push(React.createElement('em', { key: `em-s-${keyIndex++}` }, italicTextStar));
    } else if (italicTextUnderscore !== undefined) {
      elements.push(React.createElement('em', { key: `em-us-${keyIndex++}` }, italicTextUnderscore));
    }
    lastIndex = inlineRegex.lastIndex;
  }

  // Remaining text after all matches
  if (lastIndex < remainingText.length) {
    elements.push(remainingText.substring(lastIndex));
  }
  
  // If no markdown was found, and elements is empty, it means plain text (but could still have links if regex didn't catch specific format)
  // The initial parseMarkdownLinks call handles simple [text](url) cases if no other inline markdown is present.
  if (elements.length === 0 && text.length > 0 && !text.match(inlineRegex) && text.includes("](")) { // more specific check for links
      return parseMarkdownLinks(text);
  }
  
  if (elements.length === 0 && text.length > 0) {
    return [text]; // Return plain text if no markdown elements were parsed
  }

  return elements;
};

