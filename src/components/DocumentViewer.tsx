import React, { useState, useEffect, useRef, useMemo } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import * as Diff from 'diff';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { TableOfContents } from './TableOfContents';
import { DocumentSearch } from './DocumentSearch';

interface Document {
  id: string;
  name: string;
  content: string;
}

interface DocumentViewerProps {
  documents: Document[];
}

interface Heading {
  id: string;
  level: number;
  text: string;
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ documents }) => {
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [showDiff, setShowDiff] = useState(false);
  const [diffLines, setDiffLines] = useState<Array<{content: string, type: 'added' | 'removed' | 'unchanged'}>>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentSearchMatch, setCurrentSearchMatch] = useState(0);
  const [totalSearchMatches, setTotalSearchMatches] = useState(0);
  
  const contentRef = useRef<HTMLDivElement>(null);

  const currentDoc = documents[currentDocIndex];
  const previousDoc = currentDocIndex > 0 ? documents[currentDocIndex - 1] : null;

  // Extract headings from markdown content
  const headings = useMemo(() => {
    if (!currentDoc) return [];
    
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const matches = [];
    let match;
    
    while ((match = headingRegex.exec(currentDoc.content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');
      
      matches.push({
        id,
        level,
        text
      });
    }
    
    return matches;
  }, [currentDoc]);

  useEffect(() => {
    if (showDiff && currentDoc && previousDoc) {
      const previousLines = previousDoc.content.split('\n');
      const currentLines = currentDoc.content.split('\n');
      const changes = Diff.diffArrays(previousLines, currentLines);
      
      const processedLines: Array<{content: string, type: 'added' | 'removed' | 'unchanged'}> = [];
      
      changes.forEach(change => {
        if (change.added) {
          change.value.forEach(line => {
            processedLines.push({ content: line, type: 'added' });
          });
        } else if (change.removed) {
          change.value.forEach(line => {
            processedLines.push({ content: line, type: 'removed' });
          });
        } else {
          change.value.forEach(line => {
            processedLines.push({ content: line, type: 'unchanged' });
          });
        }
      });
      
      setDiffLines(processedLines);
    }
  }, [currentDoc, previousDoc, showDiff]);

  const handleHeadingClick = (id: string) => {
    const element = document.getElementById(id);
    if (element && contentRef.current) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const handleSearchHighlight = (term: string, currentMatch: number, totalMatches: number) => {
    setSearchTerm(term);
    setCurrentSearchMatch(currentMatch);
    setTotalSearchMatches(totalMatches);
    
    if (term && currentMatch > 0 && contentRef.current) {
      // Find and scroll to the current match
      const searchElements = contentRef.current.querySelectorAll('[data-search-highlight]');
      const targetElement = searchElements[currentMatch - 1];
      if (targetElement) {
        targetElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  const highlightSearchTerm = (text: string) => {
    if (!searchTerm || !text) return text;
    
    const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    
    return parts.map((part, index) => {
      if (regex.test(part)) {
        return `<mark data-search-highlight style="background-color: hsl(var(--primary) / 0.2); color: hsl(var(--primary-foreground));">${part}</mark>`;
      }
      return part;
    }).join('');
  };

  const renderContent = () => {
    if (showDiff && diffLines.length > 0) {
      return (
        <div className="prose prose-sm max-w-none">
          {diffLines.map((line, index) => (
            <div
              key={index}
              className={cn(
                'rounded my-1',
                line.type === 'added' && 'bg-diff-added border-l-4 border-diff-added-border pl-4',
                line.type === 'removed' && 'bg-diff-removed border-l-4 border-diff-removed-border pl-4 opacity-75',
                line.type === 'unchanged' && 'pl-4'
              )}
            >
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  p: ({ children }) => <span className="block">{children}</span>,
                  h1: ({ children }) => {
                    const id = children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') || '';
                    return <h1 id={id} className="scroll-mt-4">{children}</h1>;
                  },
                  h2: ({ children }) => {
                    const id = children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') || '';
                    return <h2 id={id} className="scroll-mt-4">{children}</h2>;
                  },
                  h3: ({ children }) => {
                    const id = children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') || '';
                    return <h3 id={id} className="scroll-mt-4">{children}</h3>;
                  },
                  h4: ({ children }) => {
                    const id = children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') || '';
                    return <h4 id={id} className="scroll-mt-4">{children}</h4>;
                  },
                  h5: ({ children }) => {
                    const id = children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') || '';
                    return <h5 id={id} className="scroll-mt-4">{children}</h5>;
                  },
                  h6: ({ children }) => {
                    const id = children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') || '';
                    return <h6 id={id} className="scroll-mt-4">{children}</h6>;
                  },
                  code: ({ children, ...props }) => {
                    const isInline = !props.className?.includes('language-');
                    if (isInline) {
                      return (
                        <code className="bg-code-bg border border-code-border rounded px-1 py-0.5 text-sm font-mono">
                          {children}
                        </code>
                      );
                    }
                    return (
                      <pre className="bg-code-bg border border-code-border rounded-lg p-4 overflow-x-auto">
                        <code className="text-sm font-mono">{children}</code>
                      </pre>
                    );
                  },
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-4 border-primary pl-4 my-2 italic text-muted-foreground">
                      {children}
                    </blockquote>
                  ),
                }}
              >
                {line.content || ' '}
              </ReactMarkdown>
            </div>
          ))}
        </div>
      );
    }

    return (
      <div className="prose prose-sm max-w-none">
        <ReactMarkdown
          remarkPlugins={[remarkGfm]}
          components={{
            h1: ({ children }) => {
              const id = children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') || '';
              const highlightedText = highlightSearchTerm(children?.toString() || '');
              return <h1 id={id} className="scroll-mt-4" dangerouslySetInnerHTML={{ __html: highlightedText }} />;
            },
            h2: ({ children }) => {
              const id = children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') || '';
              const highlightedText = highlightSearchTerm(children?.toString() || '');
              return <h2 id={id} className="scroll-mt-4" dangerouslySetInnerHTML={{ __html: highlightedText }} />;
            },
            h3: ({ children }) => {
              const id = children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') || '';
              const highlightedText = highlightSearchTerm(children?.toString() || '');
              return <h3 id={id} className="scroll-mt-4" dangerouslySetInnerHTML={{ __html: highlightedText }} />;
            },
            h4: ({ children }) => {
              const id = children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') || '';
              const highlightedText = highlightSearchTerm(children?.toString() || '');
              return <h4 id={id} className="scroll-mt-4" dangerouslySetInnerHTML={{ __html: highlightedText }} />;
            },
            h5: ({ children }) => {
              const id = children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') || '';
              const highlightedText = highlightSearchTerm(children?.toString() || '');
              return <h5 id={id} className="scroll-mt-4" dangerouslySetInnerHTML={{ __html: highlightedText }} />;
            },
            h6: ({ children }) => {
              const id = children?.toString().toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-') || '';
              const highlightedText = highlightSearchTerm(children?.toString() || '');
              return <h6 id={id} className="scroll-mt-4" dangerouslySetInnerHTML={{ __html: highlightedText }} />;
            },
            p: ({ children }) => {
              const highlightedText = highlightSearchTerm(children?.toString() || '');
              return <p dangerouslySetInnerHTML={{ __html: highlightedText }} />;
            },
            li: ({ children }) => {
              const highlightedText = highlightSearchTerm(children?.toString() || '');
              return <li dangerouslySetInnerHTML={{ __html: highlightedText }} />;
            },
            code: ({ children, ...props }) => {
              const isInline = !props.className?.includes('language-');
              if (isInline) {
                const highlightedText = highlightSearchTerm(children?.toString() || '');
                return (
                  <code 
                    className="bg-code-bg border border-code-border rounded px-1 py-0.5 text-sm font-mono"
                    dangerouslySetInnerHTML={{ __html: highlightedText }}
                  />
                );
              }
              return (
                <pre className="bg-code-bg border border-code-border rounded-lg p-4 overflow-x-auto">
                  <code className="text-sm font-mono">{children}</code>
                </pre>
              );
            },
            blockquote: ({ children }) => (
              <blockquote className="border-l-4 border-primary pl-4 my-4 italic text-muted-foreground">
                {children}
              </blockquote>
            ),
          }}
        >
          {currentDoc.content}
        </ReactMarkdown>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className="w-64 bg-card border-r border-border p-4">
        <h2 className="text-lg font-semibold mb-4">Версии документов</h2>
        <div className="space-y-2">
          {documents.map((doc, index) => (
            <Button
              key={doc.id}
              variant={currentDocIndex === index ? "default" : "ghost"}
              className="w-full justify-start text-left"
              onClick={() => {
                setCurrentDocIndex(index);
                setShowDiff(false);
              }}
            >
              <div className="flex items-center justify-between w-full">
                <span className="truncate">{doc.name}</span>
                {index === currentDocIndex && (
                  <Badge variant="secondary" className="ml-2">
                    Текущий
                  </Badge>
                )}
              </div>
            </Button>
          ))}
        </div>
        
        {currentDocIndex > 0 && (
          <div className="mt-6 pt-4 border-t border-border">
            <Button
              variant={showDiff ? "default" : "outline"}
              className="w-full"
              onClick={() => setShowDiff(!showDiff)}
            >
              {showDiff ? 'Скрыть различия' : 'Показать различия'}
            </Button>
            {showDiff && (
              <p className="text-xs text-muted-foreground mt-2">
                Сравнение с {previousDoc?.name}
              </p>
            )}
          </div>
        )}
      </div>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        <div className="h-full flex flex-col">
          {/* Header */}
          <div className="bg-card border-b border-border p-4">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h1 className="text-xl font-semibold">{currentDoc.name}</h1>
                {showDiff && previousDoc && (
                  <p className="text-sm text-muted-foreground">
                    Показаны изменения по сравнению с {previousDoc.name}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                <Badge variant="outline">
                  Версия {currentDocIndex + 1} из {documents.length}
                </Badge>
                {showDiff && (
                  <Badge variant="secondary">
                    Режим сравнения
                  </Badge>
                )}
              </div>
            </div>
            
            {/* Search */}
            <DocumentSearch
              content={currentDoc.content}
              onHighlight={handleSearchHighlight}
              className="w-full"
            />
          </div>

          {/* Document content */}
          <div className="flex-1 overflow-auto p-6" ref={contentRef}>
            <Card className="p-6">
              {renderContent()}
            </Card>
          </div>
        </div>
      </div>

      {/* Table of Contents */}
      <TableOfContents 
        headings={headings}
        onHeadingClick={handleHeadingClick}
      />
    </div>
  );
};