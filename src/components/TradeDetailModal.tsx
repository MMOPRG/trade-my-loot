import { Trade } from '@/types/trade';
import { Equipment, Rarity } from '@/types/equipment';
import { cn } from '@/lib/utils';
import { X, Check, Ban, ArrowRightLeft, Clock, CheckCircle, XCircle } from 'lucide-react';
import { format } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';

interface TradeDetailModalProps {
  trade: Trade | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAccept?: (trade: Trade) => void;
  onReject?: (trade: Trade) => void;
  onCancel?: (trade: Trade) => void;
}

const rarityConfig: Record<Rarity, { border: string; bg: string; glow: string }> = {
  common: {
    border: 'border-rarity-common',
    bg: 'bg-rarity-common/10',
    glow: 'shadow-[0_0_10px_hsl(var(--rarity-common)/0.3)]',
  },
  uncommon: {
    border: 'border-rarity-uncommon',
    bg: 'bg-rarity-uncommon/10',
    glow: 'shadow-[0_0_10px_hsl(var(--rarity-uncommon)/0.3)]',
  },
  rare: {
    border: 'border-rarity-rare',
    bg: 'bg-rarity-rare/10',
    glow: 'shadow-[0_0_10px_hsl(var(--rarity-rare)/0.3)]',
  },
  epic: {
    border: 'border-rarity-epic',
    bg: 'bg-rarity-epic/10',
    glow: 'shadow-[0_0_10px_hsl(var(--rarity-epic)/0.3)]',
  },
  legendary: {
    border: 'border-rarity-legendary',
    bg: 'bg-rarity-legendary/10',
    glow: 'shadow-[0_0_10px_hsl(var(--rarity-legendary)/0.3)]',
  },
};

const rarityLabel: Record<Rarity, string> = {
  common: '普通',
  uncommon: '优秀',
  rare: '稀有',
  epic: '史诗',
  legendary: '传说',
};

const statusConfig = {
  pending: {
    label: '进行中',
    color: 'text-accent',
    icon: Clock,
  },
  completed: {
    label: '已完成',
    color: 'text-rarity-uncommon',
    icon: CheckCircle,
  },
  cancelled: {
    label: '已取消',
    color: 'text-destructive',
    icon: XCircle,
  },
};

function ItemCard({ item }: { item: Equipment }) {
  const config = rarityConfig[item.rarity];
  
  return (
    <div className={cn(
      'flex items-center gap-3 p-3 rounded-lg border',
      'bg-secondary/30 backdrop-blur-sm',
      config.border,
      config.glow
    )}>
      <div className={cn(
        'h-12 w-12 rounded-lg flex items-center justify-center text-2xl',
        config.bg,
        config.border,
        'border'
      )}>
        {item.icon}
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-display font-semibold text-sm truncate">{item.name}</p>
        <p className={cn('text-xs', `text-rarity-${item.rarity}`)}>
          {rarityLabel[item.rarity]} · Lv.{item.level}
        </p>
      </div>
    </div>
  );
}

export function TradeDetailModal({
  trade,
  open,
  onOpenChange,
  onAccept,
  onReject,
  onCancel,
}: TradeDetailModalProps) {
  if (!trade) return null;

  const status = statusConfig[trade.status];
  const StatusIcon = status.icon;
  const isPending = trade.status === 'pending';
  const isReceived = trade.type === 'received';
  const isInitiated = trade.type === 'initiated';

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl bg-card/95 backdrop-blur-xl border-border/50">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <ArrowRightLeft className="h-5 w-5 text-primary" />
              <span className="font-display">交易详情</span>
            </div>
            <div className={cn(
              'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium',
              'bg-secondary/50 border border-border/50',
              status.color
            )}>
              <StatusIcon className="h-4 w-4" />
              {status.label}
            </div>
          </DialogTitle>
        </DialogHeader>

        {/* Partner Info */}
        <div className="flex items-center gap-4 p-4 rounded-xl bg-secondary/30 border border-border/30">
          <div className="h-14 w-14 rounded-full flex items-center justify-center text-2xl bg-secondary border border-border/50">
            {trade.partner.avatar}
          </div>
          <div className="flex-1">
            <p className="font-display font-semibold text-lg">{trade.partner.name}</p>
            <p className="text-sm text-muted-foreground">
              等级 {trade.partner.level} · {isInitiated ? '你发起的交易' : '对方发起的交易'}
            </p>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <p>创建时间</p>
            <p className="text-foreground">
              {format(trade.createdAt, 'yyyy年MM月dd日 HH:mm', { locale: zhCN })}
            </p>
          </div>
        </div>

        {/* Items Exchange */}
        <div className="grid grid-cols-2 gap-4">
          {/* My Items (Give) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold text-destructive">
                交出的物品
              </h3>
              <span className="text-xs text-muted-foreground">
                {trade.myItems.length} 件
              </span>
            </div>
            <ScrollArea className="h-[200px] pr-2">
              <div className="space-y-2">
                {trade.myItems.length > 0 ? (
                  trade.myItems.map(item => (
                    <ItemCard key={item.id} item={item} />
                  ))
                ) : (
                  <div className="h-full flex items-center justify-center text-muted-foreground text-sm italic py-8">
                    无物品
                  </div>
                )}
              </div>
            </ScrollArea>
          </div>

          {/* Their Items (Receive) */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="font-display font-semibold text-rarity-uncommon">
                获得的物品
              </h3>
              <span className="text-xs text-muted-foreground">
                {trade.theirItems.length} 件
              </span>
            </div>
            <ScrollArea className="h-[200px] pr-2">
              <div className="space-y-2">
                {trade.theirItems.map(item => (
                  <ItemCard key={item.id} item={item} />
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Action Buttons */}
        {isPending && (
          <div className="flex gap-3 pt-2">
            {isReceived && (
              <>
                <Button
                  variant="outline"
                  className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/10"
                  onClick={() => onReject?.(trade)}
                >
                  <Ban className="h-4 w-4 mr-2" />
                  拒绝交易
                </Button>
                <Button
                  className="flex-1 bg-rarity-uncommon hover:bg-rarity-uncommon/90 text-primary-foreground"
                  onClick={() => onAccept?.(trade)}
                >
                  <Check className="h-4 w-4 mr-2" />
                  接受交易
                </Button>
              </>
            )}
            {isInitiated && (
              <Button
                variant="outline"
                className="flex-1 border-destructive/50 text-destructive hover:bg-destructive/10"
                onClick={() => onCancel?.(trade)}
              >
                <X className="h-4 w-4 mr-2" />
                取消交易
              </Button>
            )}
          </div>
        )}

        {/* Completed/Cancelled Message */}
        {!isPending && (
          <div className={cn(
            'text-center py-3 rounded-lg text-sm',
            trade.status === 'completed' 
              ? 'bg-rarity-uncommon/10 text-rarity-uncommon' 
              : 'bg-destructive/10 text-destructive'
          )}>
            {trade.status === 'completed' 
              ? '🎉 交易已成功完成' 
              : '交易已取消'}
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
