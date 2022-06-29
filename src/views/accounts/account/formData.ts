
import { FormSchema } from '/@/components/Form/index';
import { DescItem } from '/@/components/Description/index';

export const schemas: FormSchema[] = [
  
    
    
    
    
  {
    field: 'consignee',
    component: 'Input',
    label: '昵称',
    required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'tel',
    component: 'Input',
    label: '注册时间',
    required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'orderNo',
    component: 'Input',
    label: '手机号码',
    required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'address',
    component: 'Input',
    label: '是否新用户',
    required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'logistics',
    component: 'Input',
    label: '订单',
    required: true,
    colProps: {
      span: 8,
    },
  },
];

export const descSchemas: DescItem[] = [
  
    
    
    
    
  {
    field: 'consignee',
    label: '昵称',
  },
  {
    field: 'tel',
    label: '注册时间',
  },
  {
    field: 'orderNo',
    label: '手机号码',
  },
  {
    field: 'address',
    label: '是否新用户',
  },
  {
    field: 'logistics',
    label: '订单',
  },
];
  