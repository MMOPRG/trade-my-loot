import { User } from '@/types/equipment';
import { cn } from '@/lib/utils';

interface UserPanelProps {
  user: User;
  isCurrentUser?: boolean;
}

export function UserPanel({ user, isCurrentUser }: UserPanelProps) {
  return (
    <div className={cn(
      'flex items-center gap-3 rounded-xl p-3',
      'bg-card/50 border border-border/50 backdrop-blur-sm'
    )}>
      <div className={cn(
        'flex h-12 w-12 items-center justify-center rounded-full text-2xl',
        'bg-secondary border-2',
        isCurrentUser ? 'border-primary glow-primary' : 'border-accent glow-accent'
      )}>
        {user.avatar}
      </div>
      <div className="flex-1">
        <h2 className={cn(
          'font-display font-bold text-lg',
          isCurrentUser ? 'text-primary' : 'text-accent'
        )}>
          {user.name}
        </h2>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted-foreground">等级</span>
          <span className="font-display font-bold text-foreground">{user.level}</span>
        </div>
      </div>
      {isCurrentUser && (
        <div className="px-3 py-1 rounded-full bg-primary/20 border border-primary/30">
          <span className="text-xs font-medium text-primary">你</span>
        </div>
      )}
    </div>
  );
}
