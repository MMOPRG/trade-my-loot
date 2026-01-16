import { Equipment } from '@/types/equipment';
import { cn } from '@/lib/utils';
import { ArrowLeftRight, Check, X } from 'lucide-react';

interface TradeConfirmationProps {
  myItems: Equipment[];
  theirItems: Equipment[];
  onConfirm: () => void;
  onCancel: () => void;
}

function MiniItemCard({ item }: { item: Equipment }) {
  return (
    <div className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50 border border-border/30">
      <span className="text-lg">{item.icon}</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium truncate">{item.name}</p>
        <p className="text-[10px] text-muted-foreground">Lv.{item.level}</p>
      </div>
    </div>
  );
}

export function TradeConfirmation({ myItems, theirItems, onConfirm, onCancel }: TradeConfirmationProps) {
  const hasItems = myItems.length > 0 || theirItems.length > 0;
  const isValidTrade = myItems.length > 0 && theirItems.length > 0;

  return (
    <div className={cn(
      'rounded-2xl p-4',
      'bg-card/50 border border-border/50 backdrop-blur-md'
    )}>
      <h3 className="font-display font-bold text-lg text-center mb-4 flex items-center justify-center gap-2">
        <ArrowLeftRight className="h-5 w-5 text-primary" />
        交易确认
      </h3>

      <div className="grid grid-cols-[1fr,auto,1fr] gap-4 items-start">
        {/* My Items */}
        <div>
          <p className="text-xs text-muted-foreground mb-2 text-center">
            你将交出 <span className="text-primary font-medium">{myItems.length}</span> 件
          </p>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {myItems.map(item => (
              <MiniItemCard key={item.id} item={item} />
            ))}
            {myItems.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-4">
                选择你的物品
              </p>
            )}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex items-center justify-center h-full pt-6">
          <div className="flex flex-col items-center gap-1">
            <ArrowLeftRight className="h-6 w-6 text-accent animate-pulse" />
          </div>
        </div>

        {/* Their Items */}
        <div>
          <p className="text-xs text-muted-foreground mb-2 text-center">
            你将获得 <span className="text-accent font-medium">{theirItems.length}</span> 件
          </p>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {theirItems.map(item => (
              <MiniItemCard key={item.id} item={item} />
            ))}
            {theirItems.length === 0 && (
              <p className="text-xs text-muted-foreground text-center py-4">
                选择对方物品
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mt-4">
        <button
          onClick={onCancel}
          disabled={!hasItems}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg',
            'font-display font-semibold text-sm',
            'bg-destructive/20 border border-destructive/30 text-destructive',
            'hover:bg-destructive/30 transition-all duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed'
          )}
        >
          <X className="h-4 w-4" />
          取消
        </button>
        <button
          onClick={onConfirm}
          disabled={!isValidTrade}
          className={cn(
            'flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg',
            'font-display font-semibold text-sm',
            'bg-primary text-primary-foreground',
            'hover:shadow-[0_0_25px_hsl(var(--primary)/0.5)] transition-all duration-200',
            'disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none'
          )}
        >
          <Check className="h-4 w-4" />
          确认交易
        </button>
      </div>
    </div>
  );
}
