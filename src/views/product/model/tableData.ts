import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '型号名',
      dataIndex: 'tel',
    },
    {
      title: '排序',
      dataIndex: 'orderNo',
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
