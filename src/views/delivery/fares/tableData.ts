
import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
  
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    
    
    
    
    
    
  {
    title: '收货人',
    dataIndex: 'consignee',
  },
  {
    title: '手机号',
    dataIndex: 'tel',
  },
  {
    title: '订单号',
    dataIndex: 'orderNo',
  },
  {
    title: '收件地址',
    dataIndex: 'address',
  },
  {
    title: '物流号',
    dataIndex: 'logistics',
  },
  {
    title: '状态',
    dataIndex: 'logistics2',
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
  