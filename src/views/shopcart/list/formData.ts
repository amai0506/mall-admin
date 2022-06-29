
import { FormSchema } from '/@/components/Form/index';
import { DescItem } from '/@/components/Description/index';

export const schemas: FormSchema[] = [
  
    
    
    
    
    
    
    
    
    
    
  {
    field: 'id',
    component: 'Input',
    label: 'ID',
    required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'user_id',
    component: 'Input',
    label: '用户ID',
    required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'nickname',
    component: 'Input',
    label: '用户昵称',
    required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'goods_id',
    component: 'Input',
    label: '商品ID',
    required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'list_pic_url',
    component: 'Input',
    label: '图片',
    required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'goods_name',
    component: 'Input',
    label: '商品名称',
    required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'goods_specifition_name_value',
    component: 'Input',
    label: '型号',
    required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'number',
    component: 'Input',
    label: '数量',
    required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'retail_price',
    component: 'Input',
    label: '成交价',
    required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'add_time',
    component: 'Input',
    label: '加入时间',
    required: true,
    colProps: {
      span: 8,
    },
  },
  {
    field: 'is_delete',
    component: 'Input',
    label: '是否删除',
    required: true,
    colProps: {
      span: 8,
    },
  },
];

export const descSchemas: DescItem[] = [
  
    
    
    
    
    
    
    
    
    
    
  {
    field: 'id',
    label: 'ID',
  },
  {
    field: 'user_id',
    label: '用户ID',
  },
  {
    field: 'nickname',
    label: '用户昵称',
  },
  {
    field: 'goods_id',
    label: '商品ID',
  },
  {
    field: 'list_pic_url',
    label: '图片',
  },
  {
    field: 'goods_name',
    label: '商品名称',
  },
  {
    field: 'goods_specifition_name_value',
    label: '型号',
  },
  {
    field: 'number',
    label: '数量',
  },
  {
    field: 'retail_price',
    label: '成交价',
  },
  {
    field: 'add_time',
    label: '加入时间',
  },
  {
    field: 'is_delete',
    label: '是否删除',
  },
];
  