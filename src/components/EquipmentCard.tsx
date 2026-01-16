import { Equipment, Rarity } from '@/types/equipment';
import { cn } from '@/lib/utils';

interface EquipmentCardProps {
  equipment: Equipment;
  isSelected?: boolean;
  onClick?: () => void;
}

const rarityStyles: Record<Rarity, string> = {
  common: 'border-rarity-common bg-rarity-common/5 hover:bg-rarity-common/10',
  uncommon: 'border-rarity-uncommon bg-rarity-uncommon/5 hover:bg-rarity-uncommon/10',
  rare: 'border-rarity-rare bg-rarity-rare/5 hover:bg-rarity-rare/10',
  epic: 'border-rarity-epic bg-rarity-epic/5 hover:bg-rarity-epic/10',
  legendary: 'border-rarity-legendary bg-rarity-legendary/5 hover:bg-rarity-legendary/10',
};

const rarityGlow: Record<Rarity, string> = {
  common: '',
  uncommon: 'hover:shadow-[0_0_15px_hsl(var(--rarity-uncommon)/0.4)]',
  rare: 'hover:shadow-[0_0_20px_hsl(var(--rarity-rare)/0.5)]',
  epic: 'hover:shadow-[0_0_25px_hsl(var(--rarity-epic)/0.5)]',
  legendary: 'shadow-[0_0_20px_hsl(var(--rarity-legendary)/0.4)] hover:shadow-[0_0_30px_hsl(var(--rarity-legendary)/0.6)]',
};

const rarityNames: Record<Rarity, string> = {
  common: '普通',
  uncommon: '优秀',
  rare: '稀有',
  epic: '史诗',
  legendary: '传说',
};

const rarityTextColor: Record<Rarity, string> = {
  common: 'text-rarity-common',
  uncommon: 'text-rarity-uncommon',
  rare: 'text-rarity-rare',
  epic: 'text-rarity-epic',
  legendary: 'text-rarity-legendary',
};

export function EquipmentCard({ equipment, isSelected, onClick }: EquipmentCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'relative cursor-pointer rounded-lg border-2 p-3 transition-all duration-300',
        'backdrop-blur-sm',
        rarityStyles[equipment.rarity],
        rarityGlow[equipment.rarity],
        isSelected && 'ring-2 ring-primary ring-offset-2 ring-offset-background scale-[1.02]',
        equipment.rarity === 'legendary' && 'animate-pulse-glow'
      )}
    >
      {/* Icon and Name */}
      <div className="flex items-start gap-3">
        <div className={cn(
          'flex h-12 w-12 items-center justify-center rounded-lg text-2xl',
          'bg-secondary/50 border border-border/50',
          equipment.rarity === 'legendary' && 'animate-float'
        )}>
          {equipment.icon}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className={cn(
            'font-display font-semibold text-sm truncate',
            rarityTextColor[equipment.rarity]
          )}>
            {equipment.name}
          </h3>
          <div className="flex items-center gap-2 mt-0.5">
            <span className="text-xs text-muted-foreground">{equipment.type}</span>
            <span className={cn('text-xs font-medium', rarityTextColor[equipment.rarity])}>
              {rarityNames[equipment.rarity]}
            </span>
          </div>
        </div>
        <div className="text-right">
          <span className="text-xs text-muted-foreground">Lv.</span>
          <span className="text-sm font-display font-bold text-primary ml-1">
            {equipment.level}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="mt-3 grid grid-cols-2 gap-1.5">
        {equipment.stats.attack && (
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-destructive">⚔</span>
            <span className="text-muted-foreground">攻击</span>
            <span className="font-semibold text-foreground">+{equipment.stats.attack}</span>
          </div>
        )}
        {equipment.stats.defense && (
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-primary">🛡</span>
            <span className="text-muted-foreground">防御</span>
            <span className="font-semibold text-foreground">+{equipment.stats.defense}</span>
          </div>
        )}
        {equipment.stats.magic && (
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-rarity-epic">✨</span>
            <span className="text-muted-foreground">魔力</span>
            <span className="font-semibold text-foreground">+{equipment.stats.magic}</span>
          </div>
        )}
        {equipment.stats.speed && (
          <div className="flex items-center gap-1.5 text-xs">
            <span className="text-rarity-uncommon">⚡</span>
            <span className="text-muted-foreground">速度</span>
            <span className="font-semibold text-foreground">+{equipment.stats.speed}</span>
          </div>
        )}
      </div>

      {/* Selection indicator */}
      {isSelected && (
        <div className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-primary flex items-center justify-center">
          <span className="text-xs text-primary-foreground">✓</span>
        </div>
      )}
    </div>
  );
}
