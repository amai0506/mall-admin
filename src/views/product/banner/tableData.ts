import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '栏目名称',
      dataIndex: 'name',
    },
    {
      title: '栏目编码',
      dataIndex: 'code',
    },
    {
      title: '是否展示',
      dataIndex: 'displayed',
      format: (v: any) => (v ? '是' : '否'),
    },
    {
      title: '最大展示数量',
      dataIndex: 'max',
    },

    {
      title: '展示类型',
      dataIndex: 'showType',
      slots: { customRender: 'showType' },
    },
    {
      title: '排序',
      dataIndex: 'sort',
    },
  ];
}

export const getAdvanceSchema = (): FormSchema[] => {
  return [
    {
      field: `name`,
      label: `栏目名称`,
      component: 'Input',
      colProps: {
        xl: 8,
        xxl: 8,
      },
    },
    {
      field: `showType`,
      label: `展示类型`,
      component: 'Select',
      colProps: {
        xl: 8,
        xxl: 8,
      },
      componentProps: {
        options: [
          { label: '轮播图', value: 1 },
          { label: '图标', value: 2 },
        ],
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

export const showTypeProps = {
  1: {
    text: '轮播图',
  },
  2: {
    text: '图标',
  },
};
