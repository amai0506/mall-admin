import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '商品名称',
      dataIndex: 'name',
    },
    {
      title: '商品图片',
      dataIndex: 'coverImage',
      slots: { customRender: 'img' },
    },
    {
      title: '排序',
      dataIndex: 'sort',
    },
    {
      title: '销量',
      dataIndex: 'saleQuantity',
    },
    {
      title: '库存',
      dataIndex: 'inventoryQuantity',
    },
    {
      title: '状态',
      dataIndex: 'sale',
      format: (v: any) => (v ? '在售' : '下架'),
    },
  ];
}

export const getAdvanceSchema = (): FormSchema[] => {
  return [
    {
      field: `name`,
      label: `商品名称`,
      component: 'Input',
      colProps: {
        xl: 8,
        xxl: 8,
      },
    },
  ];
};

export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [...getAdvanceSchema()],
  };
}
