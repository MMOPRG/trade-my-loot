import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { TradeHeader } from '@/components/TradeHeader';
import { TradeCard } from '@/components/TradeCard';
import { TradeDetailModal } from '@/components/TradeDetailModal';
import { mockTrades } from '@/data/mockTrades';
import { Trade } from '@/types/trade';
import { ArrowLeft, Package, Send, Inbox, Clock, CheckCircle, XCircle, Filter } from 'lucide-react';
import { toast } from 'sonner';

type TabType = 'all' | 'initiated' | 'received';
type StatusFilter = 'all' | 'pending' | 'completed' | 'cancelled';

const tabs: { id: TabType; label: string; icon: React.ElementType }[] = [
  { id: 'all', label: '全部', icon: Package },
  { id: 'initiated', label: '我发起的', icon: Send },
  { id: 'received', label: '我收到的', icon: Inbox },
];

const statusFilters: { id: StatusFilter; label: string; icon: React.ElementType; color: string }[] = [
  { id: 'all', label: '全部状态', icon: Filter, color: 'text-foreground' },
  { id: 'pending', label: '进行中', icon: Clock, color: 'text-accent' },
  { id: 'completed', label: '已完成', icon: CheckCircle, color: 'text-rarity-uncommon' },
  { id: 'cancelled', label: '已取消', icon: XCircle, color: 'text-destructive' },
];

const MyTrades = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<TabType>('all');
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [selectedTrade, setSelectedTrade] = useState<Trade | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const filteredTrades = mockTrades.filter(trade => {
    const matchesTab = activeTab === 'all' || trade.type === activeTab;
    const matchesStatus = statusFilter === 'all' || trade.status === statusFilter;
    return matchesTab && matchesStatus;
  });

  const handleTradeClick = (trade: Trade) => {
    setSelectedTrade(trade);
    setModalOpen(true);
  };

  const handleAccept = (trade: Trade) => {
    toast.success(`已接受与 ${trade.partner.name} 的交易`);
    setModalOpen(false);
  };

  const handleReject = (trade: Trade) => {
    toast.error(`已拒绝与 ${trade.partner.name} 的交易`);
    setModalOpen(false);
  };

  const handleCancel = (trade: Trade) => {
    toast.info(`已取消与 ${trade.partner.name} 的交易`);
    setModalOpen(false);
  };

  const counts = {
    all: mockTrades.length,
    initiated: mockTrades.filter(t => t.type === 'initiated').length,
    received: mockTrades.filter(t => t.type === 'received').length,
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TradeHeader />
      
      <main className="flex-1 container mx-auto px-4 py-6 max-w-4xl">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className={cn(
            'flex items-center gap-2 mb-4 px-3 py-1.5 rounded-lg',
            'text-sm text-muted-foreground hover:text-foreground',
            'hover:bg-secondary/50 transition-all duration-200'
          )}
        >
          <ArrowLeft className="h-4 w-4" />
          返回交易大厅
        </button>

        {/* Page Title */}
        <div className="mb-6">
          <h1 className="font-display font-bold text-2xl mb-1">我的交易</h1>
          <p className="text-sm text-muted-foreground">查看和管理你的所有交易记录</p>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-6 p-1 rounded-xl bg-secondary/30 border border-border/30">
          {tabs.map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  'flex-1 flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg',
                  'font-medium text-sm transition-all duration-200',
                  isActive
                    ? 'bg-primary text-primary-foreground shadow-lg shadow-primary/30'
                    : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                )}
              >
                <Icon className="h-4 w-4" />
                {tab.label}
                <span className={cn(
                  'ml-1 px-1.5 py-0.5 rounded-full text-xs',
                  isActive
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                )}>
                  {counts[tab.id]}
                </span>
              </button>
            );
          })}
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-2 mb-6 flex-wrap">
          <span className="text-sm text-muted-foreground mr-1">状态筛选:</span>
          {statusFilters.map(filter => {
            const Icon = filter.icon;
            const isActive = statusFilter === filter.id;
            const count = filter.id === 'all' 
              ? mockTrades.length 
              : mockTrades.filter(t => t.status === filter.id).length;
            return (
              <button
                key={filter.id}
                onClick={() => setStatusFilter(filter.id)}
                className={cn(
                  'flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium',
                  'border transition-all duration-200',
                  isActive
                    ? cn('bg-secondary border-border', filter.color)
                    : 'bg-transparent border-border/50 text-muted-foreground hover:border-border hover:text-foreground'
                )}
              >
                <Icon className="h-3 w-3" />
                {filter.label}
                <span className={cn(
                  'ml-0.5 px-1.5 py-0.5 rounded-full text-[10px]',
                  isActive ? 'bg-background/50' : 'bg-muted'
                )}>
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className={cn(
            'p-4 rounded-xl text-center cursor-pointer transition-all',
            'bg-card/50 border border-border/50',
            'hover:bg-card/70 hover:border-primary/30',
            statusFilter === 'all' && 'ring-2 ring-primary/50'
          )}
          onClick={() => setStatusFilter('all')}
          >
            <p className="text-2xl font-display font-bold text-primary">{counts.all}</p>
            <p className="text-xs text-muted-foreground">总交易</p>
          </div>
          <div className={cn(
            'p-4 rounded-xl text-center cursor-pointer transition-all',
            'bg-card/50 border border-border/50',
            'hover:bg-card/70 hover:border-rarity-uncommon/30',
            statusFilter === 'completed' && 'ring-2 ring-rarity-uncommon/50'
          )}
          onClick={() => setStatusFilter('completed')}
          >
            <p className="text-2xl font-display font-bold text-rarity-uncommon">
              {mockTrades.filter(t => t.status === 'completed').length}
            </p>
            <p className="text-xs text-muted-foreground">已完成</p>
          </div>
          <div className={cn(
            'p-4 rounded-xl text-center cursor-pointer transition-all',
            'bg-card/50 border border-border/50',
            'hover:bg-card/70 hover:border-accent/30',
            statusFilter === 'pending' && 'ring-2 ring-accent/50'
          )}
          onClick={() => setStatusFilter('pending')}
          >
            <p className="text-2xl font-display font-bold text-accent">
              {mockTrades.filter(t => t.status === 'pending').length}
            </p>
            <p className="text-xs text-muted-foreground">进行中</p>
          </div>
        </div>

        {/* Trade List */}
        <div className="space-y-4">
          {filteredTrades.length > 0 ? (
            filteredTrades.map(trade => (
              <TradeCard 
                key={trade.id} 
                trade={trade} 
                onClick={() => handleTradeClick(trade)}
              />
            ))
          ) : (
            <div className={cn(
              'flex flex-col items-center justify-center py-16 rounded-xl',
              'bg-card/30 border border-border/30'
            )}>
              <span className="text-5xl mb-4">📭</span>
              <p className="text-muted-foreground">暂无交易记录</p>
            </div>
          )}
        </div>

        {/* Trade Detail Modal */}
        <TradeDetailModal
          trade={selectedTrade}
          open={modalOpen}
          onOpenChange={setModalOpen}
          onAccept={handleAccept}
          onReject={handleReject}
          onCancel={handleCancel}
        />
      </main>
    </div>
  );
};

export default MyTrades;
