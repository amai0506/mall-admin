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
    field: 'logistics1',
    component: 'Input',
    label: '状态',
    required: true,
    colProps: {
      span: 8,
    },
  },
];

export const descSchemas = {
  orderInfo: {
    id: 1330,
    order_sn: '20191005170626623520',
    user_id: 1048,
    order_status: 300,
    offline_pay: 0,
    shipping_status: 0,
    print_status: 0,
    pay_status: 2,
    consignee: '测试',
    country: 0,
    province: 3,
    city: 38,
    district: 422,
    address: '测试地址',
    print_info: '1、懒人椅【1】 ',
    mobile: '13333232323',
    postscript: '',
    admin_memo: '对对对',
    shipping_fee: 0,
    pay_name: '',
    pay_id: '4200000422201911290938060299',
    change_price: 0.01,
    actual_price: 0.01,
    order_price: 0.01,
    goods_price: 0.01,
    add_time: '2019-11-29 17:06:26',
    pay_time: '2019-11-29 17:06:31',
    shipping_time: 0,
    confirm_time: 0,
    dealdone_time: 0,
    freight_price: 0,
    express_value: 480,
    remark: '需电联客户请优先派送勿放快递柜',
    order_type: 0,
    is_delete: 0,
    goodsList: [
      {
        id: 1478,
        product_id: 246,
        goods_name: '日式和风懒人沙发',
        goods_aka: '懒人椅',
        list_pic_url: 'http://yanxuan.nosdn.127.net/149dfa87a7324e184c5526ead81de9ad.png',
        number: 1,
        goods_specifition_name_value: '棕色',
        retail_price: 0.01,
        goods_id: 1009024,
        goods_sn: '12313',
      },
    ],
    goodsCount: 1,
    user_name: '盛良🐠',
    avatar:
      'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLJ1VBQSSEkJicx0tKYiaibPkBm2AOYoFciaibYS8FX91B3OYxbaGMloFJ4yibnbF1021O4g6ueiaR4qPVPA/132',
    full_region: '天津市天津市和平区',
    order_status_text: '待发货',
    allAddress: '天津市天津市和平区测试地址',
  },
  receiver: {
    name: '测试',
    mobile: '13333232323',
    province: '天津市',
    province_id: 3,
    city: '天津市',
    city_id: 38,
    district: '和平区',
    district_id: 422,
    address: '测试地址',
  },
  sender: {
    name: '海鸥实验室',
    mobile: '13599888877',
    province: '浙江省',
    city: '舟山市',
    district: '普陀区',
    province_id: 12,
    city_id: 123,
    district_id: 1362,
    address: '嘉绿景苑',
  },
};

export const buyerColumns = [
  {
    dataIndex: 'user_id',
    title: '用户ID',
  },
  {
    dataIndex: 'nickname',
    title: '昵称',
  },
  {
    dataIndex: 'avatar',
    title: '头像',
    slots: {
      customRender: 'avatar',
    },
  },
  {
    dataIndex: 'consignee',
    title: '客户名',
  },
  {
    dataIndex: 'mobile',
    title: '客户手机',
  },
  {
    dataIndex: 'address',
    title: '客户地址',
  },
  {
    dataIndex: 'postscript',
    title: '买家备注',
  },
];

export const productColumns = [
  {
    dataIndex: 'goods_sn',
    title: '商品SKU',
  },
  {
    dataIndex: 'list_pic_url',
    title: '商品图',
    slots: {
      customRender: 'list_pic_url',
    },
  },
  {
    dataIndex: 'goods_name',
    title: '商品名',
  },
  {
    dataIndex: 'goods_specifition_name_value',
    title: '型号',
  },
  {
    dataIndex: 'retail_price',
    title: '售价',
  },
  {
    dataIndex: 'number',
    title: '购买数量',
  },
  {
    dataIndex: 'total',
    title: '小计',
    slots: {
      customRender: 'total',
    },
  },
];
