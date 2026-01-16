import { RefreshCw, History, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';

export function TradeHeader() {
  return (
    <header className="border-b border-border/30 bg-card/30 backdrop-blur-md">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className={cn(
              'h-10 w-10 rounded-lg flex items-center justify-center',
              'bg-primary/20 border border-primary/30'
            )}>
              <span className="text-xl">⚔️</span>
            </div>
            <div>
              <h1 className="font-display font-bold text-lg text-foreground">
                装备交易所
              </h1>
              <p className="text-xs text-muted-foreground">安全 · 快速 · 公平</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            <button className={cn(
              'p-2 rounded-lg transition-all duration-200',
              'hover:bg-secondary text-muted-foreground hover:text-foreground'
            )}>
              <RefreshCw className="h-5 w-5" />
            </button>
            <button className={cn(
              'p-2 rounded-lg transition-all duration-200',
              'hover:bg-secondary text-muted-foreground hover:text-foreground'
            )}>
              <History className="h-5 w-5" />
            </button>
            <button className={cn(
              'p-2 rounded-lg transition-all duration-200',
              'hover:bg-secondary text-muted-foreground hover:text-foreground'
            )}>
              <Settings className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
