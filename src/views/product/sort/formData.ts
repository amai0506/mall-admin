import { FormSchema } from '/@/components/Form/index';
import { DescItem } from '/@/components/Description/index';

export const schemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '分类名称',
    required: true,
    // colProps: {
    //   span: 8,
    // },
  },
  {
    field: 'introduction',
    component: 'InputTextArea',
    label: '简短介绍',
    // required: true,
    // colProps: {
    //   span: 8,
    // },
  },
  {
    field: 'image',
    component: 'Input',
    label: '分类图片',
    show: false,
  },
  {
    field: 'icon',
    component: 'Input',
    label: '图标',
    show: false,
  },
  {
    field: 'imageFileList',
    component: 'Input',
    label: '分类图片',
    defaultValue: [],
    slot: 'img',
  },
  {
    field: 'iconFileList',
    component: 'Input',
    label: '图标',
    slot: 'img',
    defaultValue: [],
    helpMessage: '图片尺寸：图标250*250, 只能上传jpg/png文件',
  },
  {
    field: 'sort',
    component: 'Input',
    label: '排序',
    required: true,
    componentProps: {
      min: 1,
      max: 1000,
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
