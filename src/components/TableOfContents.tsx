import React from 'react';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { List } from 'lucide-react';

interface Heading {
  id: string;
  level: number;
  text: string;
}

interface TableOfContentsProps {
  headings: Heading[];
  onHeadingClick: (id: string) => void;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ 
  headings, 
  onHeadingClick 
}) => {
  const handleHeadingClick = (id: string) => {
    onHeadingClick(id);
    // Close the sheet after clicking (for mobile)
    const closeButton = document.querySelector('[data-state="open"] button[aria-label="Close"]') as HTMLButtonElement;
    closeButton?.click();
  };

  const renderHeadings = () => (
    <div className="space-y-1">
      {headings.map((heading) => (
        <Button
          key={heading.id}
          variant="ghost"
          className={`
            w-full justify-start text-left h-auto py-2 px-2
            ${heading.level === 1 ? 'font-semibold text-sm' : ''}
            ${heading.level === 2 ? 'font-medium text-sm pl-4' : ''}
            ${heading.level === 3 ? 'text-sm pl-6' : ''}
            ${heading.level === 4 ? 'text-xs pl-8 text-muted-foreground' : ''}
            ${heading.level === 5 ? 'text-xs pl-10 text-muted-foreground' : ''}
            ${heading.level === 6 ? 'text-xs pl-12 text-muted-foreground' : ''}
          `}
          onClick={() => handleHeadingClick(heading.id)}
        >
          <span className="truncate text-left whitespace-normal leading-relaxed">
            {heading.text}
          </span>
        </Button>
      ))}
    </div>
  );

  if (headings.length === 0) {
    return null;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm" className="fixed top-4 right-4 z-50">
          <List className="h-4 w-4" />
          <span className="hidden sm:inline ml-2">Оглавление</span>
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-80">
        <div className="py-4">
          <h3 className="font-semibold text-lg mb-4">Оглавление</h3>
          <div className="max-h-[calc(100vh-8rem)] overflow-auto">
            {renderHeadings()}
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};