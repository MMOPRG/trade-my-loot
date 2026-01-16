import { Trade } from '@/types/trade';
import { Equipment, Rarity } from '@/types/equipment';
import { cn } from '@/lib/utils';
import { ArrowRight, Clock, Check, X } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';

interface TradeCardProps {
  trade: Trade;
  onClick?: () => void;
}

const statusConfig = {
  pending: {
    label: '进行中',
    color: 'text-accent bg-accent/20 border-accent/30',
    icon: Clock,
  },
  completed: {
    label: '已完成',
    color: 'text-rarity-uncommon bg-rarity-uncommon/20 border-rarity-uncommon/30',
    icon: Check,
  },
  cancelled: {
    label: '已取消',
    color: 'text-destructive bg-destructive/20 border-destructive/30',
    icon: X,
  },
};

const rarityBorderColor: Record<Rarity, string> = {
  common: 'border-l-rarity-common',
  uncommon: 'border-l-rarity-uncommon',
  rare: 'border-l-rarity-rare',
  epic: 'border-l-rarity-epic',
  legendary: 'border-l-rarity-legendary',
};

function MiniItem({ item }: { item: Equipment }) {
  return (
    <div className={cn(
      'flex items-center gap-2 px-2 py-1.5 rounded-lg',
      'bg-secondary/50 border-l-2',
      rarityBorderColor[item.rarity]
    )}>
      <span className="text-base">{item.icon}</span>
      <span className="text-xs font-medium truncate max-w-[80px]">{item.name}</span>
    </div>
  );
}

export function TradeCard({ trade, onClick }: TradeCardProps) {
  const status = statusConfig[trade.status];
  const StatusIcon = status.icon;

  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-xl p-4 cursor-pointer transition-all duration-300',
        'bg-card/50 border border-border/50 backdrop-blur-sm',
        'hover:bg-card/70 hover:border-border',
        'hover:shadow-[0_0_20px_hsl(var(--primary)/0.2)]'
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={cn(
            'h-10 w-10 rounded-full flex items-center justify-center text-lg',
            'bg-secondary border border-border/50'
          )}>
            {trade.partner.avatar}
          </div>
          <div>
            <p className="font-display font-semibold text-sm">{trade.partner.name}</p>
            <p className="text-xs text-muted-foreground">
              Lv.{trade.partner.level} · {trade.type === 'initiated' ? '你发起' : '对方发起'}
            </p>
          </div>
        </div>
        <div className={cn(
          'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
          status.color
        )}>
          <StatusIcon className="h-3 w-3" />
          {status.label}
        </div>
      </div>

      {/* Items Exchange */}
      <div className="flex items-center gap-3 mb-3">
        {/* My Items */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-muted-foreground mb-1.5">交出</p>
          <div className="flex flex-wrap gap-1.5">
            {trade.myItems.length > 0 ? (
              trade.myItems.slice(0, 2).map(item => (
                <MiniItem key={item.id} item={item} />
              ))
            ) : (
              <span className="text-xs text-muted-foreground italic">待确认</span>
            )}
            {trade.myItems.length > 2 && (
              <span className="text-xs text-muted-foreground self-center">
                +{trade.myItems.length - 2}
              </span>
            )}
          </div>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0">
          <ArrowRight className="h-5 w-5 text-primary" />
        </div>

        {/* Their Items */}
        <div className="flex-1 min-w-0">
          <p className="text-[10px] text-muted-foreground mb-1.5">获得</p>
          <div className="flex flex-wrap gap-1.5">
            {trade.theirItems.slice(0, 2).map(item => (
              <MiniItem key={item.id} item={item} />
            ))}
            {trade.theirItems.length > 2 && (
              <span className="text-xs text-muted-foreground self-center">
                +{trade.theirItems.length - 2}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between pt-2 border-t border-border/30">
        <span className="text-xs text-muted-foreground">
          {format(trade.createdAt, 'MM月dd日 HH:mm', { locale: zhCN })}
        </span>
        <span className="text-xs text-primary font-medium">
          查看详情 →
        </span>
      </div>
    </div>
  );
}
