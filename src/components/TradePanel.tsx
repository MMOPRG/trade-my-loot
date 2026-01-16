import { Equipment, User } from '@/types/equipment';
import { EquipmentCard } from './EquipmentCard';
import { UserPanel } from './UserPanel';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';
import { useState } from 'react';

interface TradePanelProps {
  user: User;
  isCurrentUser?: boolean;
  selectedItems: Equipment[];
  onToggleItem: (item: Equipment) => void;
}

export function TradePanel({ user, isCurrentUser, selectedItems, onToggleItem }: TradePanelProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredInventory = user.inventory.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className={cn(
      'flex flex-col h-full rounded-2xl overflow-hidden',
      'bg-card/30 border border-border/50 backdrop-blur-md'
    )}>
      {/* User Header */}
      <div className="p-4 border-b border-border/30">
        <UserPanel user={user} isCurrentUser={isCurrentUser} />
      </div>

      {/* Search */}
      <div className="px-4 py-3 border-b border-border/30">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input
            type="text"
            placeholder="搜索装备..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={cn(
              'w-full pl-9 pr-4 py-2 rounded-lg text-sm',
              'bg-secondary/50 border border-border/50',
              'placeholder:text-muted-foreground',
              'focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50',
              'transition-all duration-200'
            )}
          />
        </div>
      </div>

      {/* Items Count */}
      <div className="px-4 py-2 flex items-center justify-between border-b border-border/30">
        <span className="text-xs text-muted-foreground">
          可交易物品: <span className="text-foreground font-medium">{filteredInventory.length}</span>
        </span>
        <span className={cn(
          'text-xs font-medium',
          isCurrentUser ? 'text-primary' : 'text-accent'
        )}>
          已选择: {selectedItems.length}
        </span>
      </div>

      {/* Items Grid */}
      <div className="flex-1 overflow-y-auto p-4 bg-grid-pattern">
        <div className="grid gap-3">
          {filteredInventory.map(item => (
            <EquipmentCard
              key={item.id}
              equipment={item}
              isSelected={selectedItems.some(i => i.id === item.id)}
              onClick={() => onToggleItem(item)}
            />
          ))}
        </div>
        {filteredInventory.length === 0 && (
          <div className="flex flex-col items-center justify-center h-40 text-muted-foreground">
            <span className="text-4xl mb-2">📦</span>
            <span className="text-sm">没有找到装备</span>
          </div>
        )}
      </div>
    </div>
  );
}
