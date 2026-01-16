export type Rarity = 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';

export interface Equipment {
  id: string;
  name: string;
  type: string;
  rarity: Rarity;
  level: number;
  stats: {
    attack?: number;
    defense?: number;
    magic?: number;
    speed?: number;
  };
  icon: string;
  description: string;
}

export interface User {
  id: string;
  name: string;
  avatar: string;
  level: number;
  inventory: Equipment[];
}

export interface TradeOffer {
  myItems: Equipment[];
  theirItems: Equipment[];
}
