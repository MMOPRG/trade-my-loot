import { cn } from '@/lib/utils';
import { Check, Sparkles } from 'lucide-react';

interface TradeSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TradeSuccessModal({ isOpen, onClose }: TradeSuccessModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className={cn(
        'relative z-10 w-full max-w-sm mx-4 p-6 rounded-2xl',
        'bg-card border border-border',
        'shadow-[0_0_50px_hsl(var(--primary)/0.3)]',
        'animate-in fade-in zoom-in-95 duration-300'
      )}>
        {/* Success Icon */}
        <div className="flex justify-center mb-4">
          <div className={cn(
            'h-20 w-20 rounded-full flex items-center justify-center',
            'bg-primary/20 border-2 border-primary',
            'animate-glow'
          )}>
            <Check className="h-10 w-10 text-primary" />
          </div>
        </div>

        {/* Text */}
        <div className="text-center mb-6">
          <h2 className="font-display font-bold text-2xl text-foreground mb-2 flex items-center justify-center gap-2">
            <Sparkles className="h-5 w-5 text-accent" />
            交易成功
            <Sparkles className="h-5 w-5 text-accent" />
          </h2>
          <p className="text-sm text-muted-foreground">
            装备已成功交换！请查看你的背包确认物品。
          </p>
        </div>

        {/* Button */}
        <button
          onClick={onClose}
          className={cn(
            'w-full py-3 rounded-lg',
            'font-display font-semibold',
            'bg-primary text-primary-foreground',
            'hover:shadow-[0_0_25px_hsl(var(--primary)/0.5)]',
            'transition-all duration-200'
          )}
        >
          确定
        </button>
      </div>
    </div>
  );
}
