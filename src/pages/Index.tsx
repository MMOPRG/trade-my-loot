import { useState } from 'react';
import { TradeHeader } from '@/components/TradeHeader';
import { TradePanel } from '@/components/TradePanel';
import { TradeConfirmation } from '@/components/TradeConfirmation';
import { TradeSuccessModal } from '@/components/TradeSuccessModal';
import { currentUser, tradePartner } from '@/data/mockData';
import { Equipment } from '@/types/equipment';
import { ArrowLeftRight } from 'lucide-react';

const Index = () => {
  const [mySelectedItems, setMySelectedItems] = useState<Equipment[]>([]);
  const [theirSelectedItems, setTheirSelectedItems] = useState<Equipment[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);

  const toggleMyItem = (item: Equipment) => {
    setMySelectedItems(prev =>
      prev.some(i => i.id === item.id)
        ? prev.filter(i => i.id !== item.id)
        : [...prev, item]
    );
  };

  const toggleTheirItem = (item: Equipment) => {
    setTheirSelectedItems(prev =>
      prev.some(i => i.id === item.id)
        ? prev.filter(i => i.id !== item.id)
        : [...prev, item]
    );
  };

  const handleConfirm = () => {
    setShowSuccess(true);
  };

  const handleCancel = () => {
    setMySelectedItems([]);
    setTheirSelectedItems([]);
  };

  const handleCloseSuccess = () => {
    setShowSuccess(false);
    setMySelectedItems([]);
    setTheirSelectedItems([]);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <TradeHeader />
      
      <main className="flex-1 container mx-auto px-4 py-6">
        {/* Trade Info Banner */}
        <div className="mb-6 p-4 rounded-xl bg-primary/10 border border-primary/20 flex items-center gap-3">
          <ArrowLeftRight className="h-5 w-5 text-primary flex-shrink-0" />
          <p className="text-sm text-foreground">
            选择双方要交换的装备，确认后完成交易。所有交易都受到系统保护。
          </p>
        </div>

        {/* Trade Grid */}
        <div className="grid lg:grid-cols-[1fr,300px,1fr] gap-6">
          {/* My Panel */}
          <div className="h-[calc(100vh-280px)] min-h-[500px]">
            <TradePanel
              user={currentUser}
              isCurrentUser
              selectedItems={mySelectedItems}
              onToggleItem={toggleMyItem}
            />
          </div>

          {/* Center Confirmation */}
          <div className="flex flex-col justify-center">
            <TradeConfirmation
              myItems={mySelectedItems}
              theirItems={theirSelectedItems}
              onConfirm={handleConfirm}
              onCancel={handleCancel}
            />
          </div>

          {/* Their Panel */}
          <div className="h-[calc(100vh-280px)] min-h-[500px]">
            <TradePanel
              user={tradePartner}
              selectedItems={theirSelectedItems}
              onToggleItem={toggleTheirItem}
            />
          </div>
        </div>
      </main>

      {/* Success Modal */}
      <TradeSuccessModal isOpen={showSuccess} onClose={handleCloseSuccess} />
    </div>
  );
};

export default Index;
