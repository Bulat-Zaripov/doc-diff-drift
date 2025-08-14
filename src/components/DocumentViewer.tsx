import React, { useState, useEffect } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import * as Diff from 'diff';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface Document {
  id: string;
  name: string;
  content: string;
}

interface DocumentViewerProps {
  documents: Document[];
}

export const DocumentViewer: React.FC<DocumentViewerProps> = ({ documents }) => {
  const [currentDocIndex, setCurrentDocIndex] = useState(0);
  const [showDiff, setShowDiff] = useState(false);
  const [diffLines, setDiffLines] = useState<Array<{content: string, type: 'added' | 'removed' | 'unchanged'}>>([]);

  const currentDoc = documents[currentDocIndex];
  const previousDoc = currentDocIndex > 0 ? documents[currentDocIndex - 1] : null;

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
            <div className="flex items-center justify-between">
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
          </div>

          {/* Document content */}
          <div className="flex-1 overflow-auto p-6">
            <Card className="p-6">
              {renderContent()}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};