
import { FormProps, FormSchema } from '/@/components/Table';
import { BasicColumn } from '/@/components/Table/src/types/table';
  
export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    
    
    
    
    
    
    
    
    
    
    
  {
    title: 'ID',
    dataIndex: 'id',
  },
  {
    title: '用户ID',
    dataIndex: 'user_id',
  },
  {
    title: '用户昵称',
    dataIndex: 'nickname',
  },
  {
    title: '商品ID',
    dataIndex: 'goods_id',
  },
  {
    title: '图片',
    dataIndex: 'list_pic_url',
  },
  {
    title: '商品名称',
    dataIndex: 'goods_name',
  },
  {
    title: '型号',
    dataIndex: 'goods_specifition_name_value',
  },
  {
    title: '数量',
    dataIndex: 'number',
  },
  {
    title: '成交价',
    dataIndex: 'retail_price',
  },
  {
    title: '加入时间',
    dataIndex: 'add_time',
  },
  {
    title: '是否删除',
    dataIndex: 'is_delete',
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
  