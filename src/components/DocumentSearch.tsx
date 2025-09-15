import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Search, X, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DocumentSearchProps {
  content: string;
  onHighlight: (searchTerm: string, currentMatch: number, totalMatches: number) => void;
  className?: string;
}

export const DocumentSearch: React.FC<DocumentSearchProps> = ({ 
  content, 
  onHighlight, 
  className 
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentMatch, setCurrentMatch] = useState(0);
  const [totalMatches, setTotalMatches] = useState(0);
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (searchTerm.trim() === '') {
      setTotalMatches(0);
      setCurrentMatch(0);
      onHighlight('', 0, 0);
      return;
    }

    // Count matches in content
    const regex = new RegExp(searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
    const matches = content.match(regex);
    const count = matches ? matches.length : 0;
    
    setTotalMatches(count);
    if (count > 0) {
      setCurrentMatch(1);
      onHighlight(searchTerm, 1, count);
    } else {
      setCurrentMatch(0);
      onHighlight(searchTerm, 0, count);
    }
  }, [searchTerm, content, onHighlight]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
  };

  const handleClear = () => {
    setSearchTerm('');
    setIsSearching(false);
  };

  const handlePrevious = () => {
    if (totalMatches > 0) {
      const newMatch = currentMatch > 1 ? currentMatch - 1 : totalMatches;
      setCurrentMatch(newMatch);
      onHighlight(searchTerm, newMatch, totalMatches);
    }
  };

  const handleNext = () => {
    if (totalMatches > 0) {
      const newMatch = currentMatch < totalMatches ? currentMatch + 1 : 1;
      setCurrentMatch(newMatch);
      onHighlight(searchTerm, newMatch, totalMatches);
    }
  };

  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <form onSubmit={handleSearch} className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Поиск по документу..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-9 pr-8"
        />
        {searchTerm && (
          <Button
            type="button"
            variant="ghost"
            size="sm"
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            onClick={handleClear}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </form>

      {searchTerm && (
        <>
          <Badge variant="outline" className="text-xs whitespace-nowrap">
            {totalMatches > 0 ? `${currentMatch} из ${totalMatches}` : 'Не найдено'}
          </Badge>
          
          {totalMatches > 0 && (
            <div className="flex items-center space-x-1">
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={handlePrevious}
                disabled={totalMatches === 0}
              >
                <ChevronUp className="h-3 w-3" />
              </Button>
              <Button
                variant="outline"
                size="sm"
                className="h-8 w-8 p-0"
                onClick={handleNext}
                disabled={totalMatches === 0}
              >
                <ChevronDown className="h-3 w-3" />
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};