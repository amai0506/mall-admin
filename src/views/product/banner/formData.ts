import { FormSchema } from '/@/components/Form/index';
import { DescItem } from '/@/components/Description/index';
import { getList } from '/@/api/product/type';

// @ts-ignore
// @ts-ignore
export const schemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '栏目名称',
    required: true,
    colProps: {
      md: 24,
    },
  },
  {
    field: 'code',
    component: 'Input',
    required: true,
    label: '栏目编码',
    colProps: {
      md: 24,
    },
  },

  {
    field: 'showType',
    component: 'Select',
    label: '展示类型',
    required: true,
    colProps: {
      md: 24,
    },
    componentProps: {
      options: [
        { label: '轮播图', value: 1 },
        { label: '图标', value: 2 },
      ],
    },
  },
  {
    field: 'displayed',
    component: 'RadioGroup',
    label: '是否展示',
    required: true,
    colProps: {
      md: 24,
    },
    componentProps: {
      options: [
        { label: '是', value: 1 },
        { label: '否', value: 0 },
      ],
    },
  },
  {
    field: 'max',
    component: 'InputNumber',
    label: '最大展示数量',
    colProps: {
      md: 24,
    },
    componentProps: {
      min: 0,
    },
  },
  {
    field: 'sort',
    component: 'InputNumber',
    colProps: {
      md: 24,
    },
    label: '排序',
    componentProps: {
      min: 0,
    },
  },
];

export const descSchemas: DescItem[] = [
  {
    field: 'consignee',
    label: '商品名称',
  },
  {
    field: 'tel',
    label: '商品图片',
  },
  {
    field: 'orderNo',
    label: '排序',
  },
  {
    field: 'address',
    label: '销量',
  },
  {
    field: 'logistics',
    label: '库存',
  },
  {
    field: 'logistics1',
    label: '显示首页',
  },
  {
    field: 'logistics2',
    label: '状态',
  },
];
