import {FormProps, FormSchema} from '/@/components/Table';
import {BasicColumn} from '/@/components/Table/src/types/table';

export function getBasicColumns(): BasicColumn[] {
  return [
    {
      title: 'ID',
      dataIndex: 'id',
    },
    {
      title: '用户名',
      dataIndex: 'username',
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
    },
    {
      title: '注册时间',
      dataIndex: 'createTime',
    },
    {
      title: '手机号码',
      dataIndex: 'phone',
    },
    {
      title: '邮箱',
      dataIndex: 'email',
    },
    {
      title: '锁定',
      dataIndex: 'locked',
      format: (v) => (v ? '是' : '否'),
    },
    {
      title: '启用',
      dataIndex: 'enabled',
      format: (v) => (v ? '是' : '否'),
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
