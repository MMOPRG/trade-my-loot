import { Trade } from '@/types/trade';
import { currentUser, tradePartner } from './mockData';

const partner2 = {
  id: 'user3',
  name: '暗夜刺客',
  avatar: '🗡️',
  level: 76,
  inventory: [],
};

const partner3 = {
  id: 'user4',
  name: '圣光守护',
  avatar: '🌟',
  level: 95,
  inventory: [],
};

export const mockTrades: Trade[] = [
  {
    id: 'trade1',
    type: 'initiated',
    status: 'completed',
    partner: tradePartner,
    myItems: [
      {
        id: '1',
        name: '暗影之刃',
        type: '武器',
        rarity: 'legendary',
        level: 85,
        stats: { attack: 450, speed: 25 },
        icon: '⚔️',
        description: '传说中的暗影之刃',
      },
    ],
    theirItems: [
      {
        id: '101',
        name: '凤凰之翼',
        type: '披风',
        rarity: 'legendary',
        level: 90,
        stats: { magic: 400, speed: 80 },
        icon: '🔥',
        description: '凤凰羽毛编织而成的神圣披风',
      },
    ],
    createdAt: new Date('2024-01-15T10:30:00'),
    completedAt: new Date('2024-01-15T10:35:00'),
  },
  {
    id: 'trade2',
    type: 'received',
    status: 'pending',
    partner: partner2,
    myItems: [],
    theirItems: [
      {
        id: '201',
        name: '毒蛇匕首',
        type: '武器',
        rarity: 'epic',
        level: 72,
        stats: { attack: 280, speed: 45 },
        icon: '🗡️',
        description: '涂抹剧毒的匕首',
      },
      {
        id: '202',
        name: '隐身斗篷',
        type: '披风',
        rarity: 'rare',
        level: 65,
        stats: { speed: 90, defense: 50 },
        icon: '🧥',
        description: '可短暂隐身的斗篷',
      },
    ],
    createdAt: new Date('2024-01-16T08:20:00'),
  },
  {
    id: 'trade3',
    type: 'initiated',
    status: 'pending',
    partner: partner3,
    myItems: [
      {
        id: '2',
        name: '龙鳞胸甲',
        type: '护甲',
        rarity: 'epic',
        level: 78,
        stats: { defense: 380, magic: 50 },
        icon: '🛡️',
        description: '由远古巨龙的鳞片锻造而成',
      },
    ],
    theirItems: [
      {
        id: '301',
        name: '光明圣盾',
        type: '盾牌',
        rarity: 'legendary',
        level: 88,
        stats: { defense: 500, magic: 120 },
        icon: '✨',
        description: '圣光加持的神圣盾牌',
      },
    ],
    createdAt: new Date('2024-01-16T14:00:00'),
  },
  {
    id: 'trade4',
    type: 'received',
    status: 'completed',
    partner: tradePartner,
    myItems: [
      {
        id: '5',
        name: '铁护腕',
        type: '饰品',
        rarity: 'uncommon',
        level: 45,
        stats: { defense: 60, attack: 30 },
        icon: '⚙️',
        description: '普通但实用的护腕',
      },
    ],
    theirItems: [
      {
        id: '105',
        name: '生命之戒',
        type: '饰品',
        rarity: 'uncommon',
        level: 50,
        stats: { defense: 100 },
        icon: '💍',
        description: '缓慢恢复生命值的戒指',
      },
    ],
    createdAt: new Date('2024-01-14T16:45:00'),
    completedAt: new Date('2024-01-14T16:50:00'),
  },
  {
    id: 'trade5',
    type: 'initiated',
    status: 'cancelled',
    partner: partner2,
    myItems: [
      {
        id: '3',
        name: '迅捷之靴',
        type: '鞋子',
        rarity: 'rare',
        level: 65,
        stats: { speed: 120, defense: 80 },
        icon: '👢',
        description: '让穿戴者如风般迅捷',
      },
    ],
    theirItems: [
      {
        id: '203',
        name: '暗影护腿',
        type: '护腿',
        rarity: 'rare',
        level: 68,
        stats: { defense: 150, speed: 40 },
        icon: '🦿',
        description: '暗影力量护腿',
      },
    ],
    createdAt: new Date('2024-01-13T09:00:00'),
  },
];
