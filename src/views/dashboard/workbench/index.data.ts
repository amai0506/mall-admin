export interface GrowCardItem {
  title: string;
  total: number;
  color: string;
}

export const growCardList: GrowCardItem[] = [
  {
    title: '待发货订单',
    total: 120000,
    color: 'rgba(255, 0, 0, 0.5)',
  },
  {
    title: '上架中的商品',
    total: 120000,
    color: 'rgba(117, 83, 212, 0.8)',
  },
  {
    title: '近一个月成交数',
    total: 50000,
    color: 'rgba(0, 0, 255, 0.5)',
  },
  {
    title: '总用户数',
    total: 120000,
    color: 'rgba(0, 150, 136, 0.5)',
  },
];

export const growCardList: GrowCardItem[] = [
  {
    title: '访问数',
    icon: 'visit-count|svg',
    value: 2000,
    total: 120000,
    color: 'green',
    action: '月',
  },
  {
    title: '成交额',
    icon: 'total-sales|svg',
    value: 20000,
    total: 500000,
    color: 'blue',
    action: '月',
  },
  {
    title: '下载数',
    icon: 'download-count|svg',
    value: 8000,
    total: 120000,
    color: 'orange',
    action: '周',
  },
  {
    title: '成交数',
    icon: 'transaction|svg',
    value: 5000,
    total: 50000,
    color: 'purple',
    action: '年',
  },
];
