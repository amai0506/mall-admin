import { FormSchema } from '/@/components/Form/index';
import { DescItem } from '/@/components/Description/index';
import { getList } from '/@/api/product/type';

// @ts-ignore
// @ts-ignore
export const schemas: FormSchema[] = [
  {
    field: 'name',
    component: 'Input',
    label: '商品名称',
    required: true,
  },
  {
    field: 'typeId',
    component: 'ApiSelect',
    label: '商品分类',
    componentProps: {
      api: getList,
      labelField: 'name',
      valueField: 'id',
    },
  },
  {
    field: 'introduction',
    component: 'Input',
    label: '商品简介',
    required: true,
  },
  // {
  //   field: 'coverImage',
  //   component: 'Input',
  //   label: '商品封面图片',
  //   show: false,
  // },
  {
    field: 'coverImageFileList',
    component: 'Input',
    label: '商品封面图片',
    defaultValue: [],
    slot: 'img',
  },
  // {
  //   field: 'detailImages',
  //   component: 'Input',
  //   label: '商品详细图片',
  //   defaultValue: '',
  //   show: false,
  // },
  {
    field: 'detailImagesFileList',
    component: 'Input',
    label: '商品详细图片',
    defaultValue: [],
    slot: 'imgs',
  },
  // {
  //   field: 'detailImages',
  //   component: 'Input',
  //   label: '商品详细图片',
  //   defaultValue: '',
  // },
  {
    field: 'unitPrice',
    component: 'Input',
    label: '商品单价',
    required: true,
    componentProps: {
      addonAfter: '元',
    },
  },
  {
    field: 'saleQuantity',
    component: 'InputNumber',
    label: '销量',
    componentProps: {
      min: 0,
    },
  },
  {
    field: 'inventoryQuantity',
    component: 'InputNumber',
    label: '库存',
    componentProps: {
      min: 0,
    },
  },
  {
    field: 'description',
    component: 'Input',
    label: '商品详情',
    slot: 'detail',
  },
  {
    field: 'logistics1',
    component: 'Input',
    label: '型号和价格',
  },
  {
    field: 'newProduct',
    component: 'Switch',
    label: '是否新品抢鲜',
  },
  {
    field: 'expressTemplateId',
    component: 'Select',
    label: '选择快递模板',
    componentProps: {
      options: [
        { label: '模板1', value: 1 },
        { label: '模板2', value: 2 },
      ],
    },
  },
  {
    field: 'sort',
    component: 'InputNumber',
    label: '排序',
    componentProps: {
      min: 0,
    },
  },
  {
    field: 'sale',
    component: 'RadioButtonGroup',
    label: '状态',
    componentProps: {
      options: [
        {
          label: '上架',
          value: true,
        },
        {
          label: '下架',
          value: false,
        },
      ],
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
