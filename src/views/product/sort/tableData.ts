import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '分类名称',
      dataIndex: 'name',
    },
    {
      title: 'icon',
      dataIndex: 'icon',
      slots: { customRender: 'img' },
    },
    {
      title: '排序',
      dataIndex: 'sort',
    },
  ];
}

export const getAdvanceSchema = (): FormSchema[] => {
  const arr: any = [];
  return arr;
};
export function getFormConfig(): Partial<FormProps> {
  return {
    labelWidth: 100,
    schemas: [...getAdvanceSchema()],
  };
}
