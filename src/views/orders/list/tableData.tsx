import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '商品信息',
      dataIndex: 'goodsList',
      width: 200,
      slots: {
        customRender: 'goodsList',
      },
      align: 'left',
    },

    {
      title: '收货人',
      dataIndex: 'userInfo',
      width: 200,
      slots: {
        customRender: 'userInfo',
      },
      align: 'left',
    },
    {
      title: '状态',
      dataIndex: 'order_status_text',
      customRender: ({ text }) => {
        return <a-tag color="#f0797f">{text}</a-tag>;
      },
      width: 100,
      align: 'left',
    },
    {
      title: '下单时间',
      dataIndex: 'add_time',
      align: 'left',
      width: 150,
    },
    {
      title: '付款时间',
      align: 'left',
      dataIndex: 'pay_time',
      width: 150,
    },

    {
      align: 'left',
      title: '订单号',
      dataIndex: 'order_sn',
      width: 200,
    },
    {
      align: 'left',
      title: '寄件信息',
      dataIndex: 'expressInfo',
      slots: {
        customRender: 'expressInfo',
      },
      width: 200,
    },
    {
      title: '合计',
      dataIndex: 'actual_price',
      width: 400,
      children: [
        {
          align: 'left',
          title: '商品总计',
          dataIndex: 'goodsCount',
          width: 150,
          slots: {
            customRender: 'goodsCount',
          },
        },
        {
          align: 'left',
          title: '价格',
          dataIndex: 'actual_price',
          width: 250,
          slots: {
            customRender: 'actual_price',
          },
        },
      ],
    },
  ];
}

export const getAdvanceSchema = (): FormSchema[] => {
  const arr: any = [
    {
      field: `order_sn`,
      label: '订单号',
      component: 'Input',
      colProps: {
        span: 8,
      },
    },
    {
      field: `consignee`,
      label: '收货人',
      component: 'Input',
      colProps: {
        span: 8,
      },
    },
    {
      field: `logistic_code`,
      label: '快递号',
      component: 'Input',
      colProps: {
        span: 8,
      },
    },
  ];
  return arr;
};
export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [...getAdvanceSchema()],
  };
}

export const data = [
  {
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
        goods_name: '日式和风懒人沙发',
        goods_aka: '懒人椅',
        list_pic_url: 'http://yanxuan.nosdn.127.net/149dfa87a7324e184c5526ead81de9ad.png',
        number: 1,
        goods_specifition_name_value: '棕色',
        retail_price: 0.01,
      },
    ],
    goodsCount: 1,
    userInfo: {
      nickname: '盛良🐠',
      name: '',
      mobile: '',
      avatar:
        'https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLJ1VBQSSEkJicx0tKYiaibPkBm2AOYoFciaibYS8FX91B3OYxbaGMloFJ4yibnbF1021O4g6ueiaR4qPVPA/132',
    },
    full_region: '天津市天津市和平区',
    order_status_text: '待发货',
    expressInfo: '圆通速递YT2880409397161',
  },
];
