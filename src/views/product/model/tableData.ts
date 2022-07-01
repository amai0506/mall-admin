import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: '型号名',
      dataIndex: 'specName',
    },
    {
      title: '排序',
      dataIndex: 'sort',
      sorter: true,
    },
  ];
}

export const getAdvanceSchema = (): FormSchema[] => {
  const arr: any = [
    {
      field: `specName`,
      label: `型号`,
      component: 'Input',
      colProps: {
        xl: 8,
        xxl: 8,
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
