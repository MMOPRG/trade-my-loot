import { Equipment, User } from './equipment';

export type TradeStatus = 'pending' | 'completed' | 'cancelled';
export type TradeType = 'initiated' | 'received';

export interface Trade {
  id: string;
  type: TradeType;
  status: TradeStatus;
  partner: User;
  myItems: Equipment[];
  theirItems: Equipment[];
  createdAt: Date;
  completedAt?: Date;
}
