import { FormSchema } from '/@/components/Form/index';
import { DescItem } from '/@/components/Description/index';

export const schemas: FormSchema[] = [
  {
    field: 'specName',
    component: 'Input',
    label: '规格名称',
    required: true,
    colProps: {
      md: 24,
    },
  },
  {
    field: 'sort',
    component: 'InputNumber',
    label: '排序',

    colProps: {
      md: 24,
    },
    componentProps: {
      min: 1,
      max: 1000,
    },
  },
];

export const descSchemas: DescItem[] = [
  {
    field: 'consignee',
    label: 'ID',
  },
  {
    field: 'tel',
    label: '型号名',
  },
  {
    field: 'orderNo',
    label: '排序',
  },
];
