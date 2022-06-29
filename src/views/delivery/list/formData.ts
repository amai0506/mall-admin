import { FormSchema } from '/@/components/Form/index';
import { DescItem } from '/@/components/Description/index';

export const schemas: FormSchema[] = [
  {
    field: 'consignee',
    component: 'Input',
    label: '收货人',
    required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'tel',
    component: 'Input',
    label: '手机号',
    required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'orderNo',
    component: 'Input',
    label: '订单号',
    required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'address',
    component: 'Input',
    label: '收件地址',
    required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'logistics',
    component: 'Input',
    label: '物流号',
    required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'logistics2',
    component: 'Input',
    label: '状态',
    required: true,
    colProps: {
      span: 8,
    },
  },
];

export const descSchemas: DescItem[] = [
  {
    field: 'consignee',
    label: '收货人',
  },
  {
    field: 'tel',
    label: '手机号',
  },
  {
    field: 'orderNo',
    label: '订单号',
  },
  {
    field: 'address',
    label: '收件地址',
  },
  {
    field: 'logistics',
    label: '物流号',
  },
  {
    field: 'logistics2',
    label: '状态',
  },
];
