import { FormSchema } from '/@/components/Form/index';
import { BasicColumn } from '/@/components/Table/src/types/table';

export const schemas: FormSchema[] = [
  {
    field: 'autoDelivery',
    component: 'Switch',
    label: '打印后自动发货',
    colProps: {
      md: 24,
    },
  },
  {
    field: 'Name',
    component: 'Input',
    label: '寄件人',
    required: true,
    colProps: {
      md: 24,
    },
    componentProps: {
      placeholder: '请输入非代理发货时的寄件人',
    },
  },
  {
    field: 'Tel',
    component: 'Input',
    label: '电话',
    required: true,
    colProps: {
      md: 24,
    },
    componentProps: {
      placeholder: '请输入电话',
    },
  },
  {
    field: 'ProvinceName',
    component: 'Input',
    label: '省份',
    required: true,
    colProps: {
      md: 24,
    },
  },
  {
    field: 'Address',
    component: 'Input',
    label: '地址',
    required: true,
    colProps: {
      md: 24,
    },
    componentProps: {
      placeholder: '请输入具体地址',
    },
  },
];
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '名字',
      dataIndex: 'name',
    },

    {
      title: '代号',
      dataIndex: 'code',
    },
    {
      title: '客户编号',
      dataIndex: 'CustomerName',
    },
    {
      title: '月结账号',
      dataIndex: 'MonthCode',
    },
  ];
}

export const data = [
  {
    id: 1,
    name: '顺丰速运',
    code: 'SF',
    sort_order: 1,
    MonthCode: '5800278123',
    CustomerName: null,
    enabled: 1,
  },
  {
    id: 5,
    name: '圆通速递',
    code: 'YTO',
    sort_order: 5,
    MonthCode: null,
    CustomerName: null,
    enabled: 1,
  },
  {
    id: 15,
    name: '顺丰特惠',
    code: 'SF',
    sort_order: 15,
    MonthCode: '5800279123',
    CustomerName: null,
    enabled: 1,
  },
];

export const EditSchemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '名字',
    colProps: {
      md: 24,
    },
  },
  {
    field: 'code',
    component: 'Input',
    label: '代号',
    required: true,
    colProps: {
      md: 24,
    },
  },
  {
    field: 'CustomerName',
    component: 'Input',
    label: '客户编号',
    colProps: {
      md: 24,
    },
  },
  {
    field: 'MonthCode',
    component: 'Input',
    label: '月结账号',
    colProps: {
      md: 24,
    },
  },
  {
    field: 'sort_order',
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
