
<template>
  <BasicTable @register="registerTable">
    <template #toolbar>
      <a-button type="primary" @click="handleCreate">添加</a-button>
    </template>
    <template #action="{ record }">
      <TableAction
        :actions="[
          {
            label: '详情',
            icon: 'clarity:info-standard-line',
            onClick: handleView.bind(null, record),
          },
          {
            label: '编辑',
            icon: 'clarity:note-edit-line',
            onClick: handleEdit.bind(null, record),
          },
          {
            label: '删除',
            icon: 'ant-design:delete-outlined',
            color: 'error',
            popConfirm: {
              title: '是否确认删除',
              confirm: handleDelete.bind(null, record),
            },
          },
        ]"
      />
    </template>
  </BasicTable>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns, getFormConfig } from './tableData';
  import { getList, deleteOne } from '/@/api/delivery/fares';
  import { useGo } from '/@/hooks/web/usePage';

  export default defineComponent({
    components: { BasicTable, TableAction },
    setup() {
      const go = useGo();
      const [
        registerTable,
        {
          setLoading,
          reload,
        },
      ] = useTable({
        canResize: true,
        title: '运费模板',
        size: 'small',
        bordered: true,
        useSearchForm: true,
        formConfig: getFormConfig(),
        api: getList,
        columns: getBasicColumns(),
        rowKey: 'id',
        showTableSetting: true,
        actionColumn: {
          width: 220,
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
          slots: { customRender: 'action' },
        },
      });

      function handleCreate() {
        go('/delivery/fares/add');
      }

      function handleEdit(record: Recordable) {
        go(`/delivery/fares/edit/${record.id}`);
      }

      async function handleDelete(record: Recordable) {
        setLoading(true);
        await deleteOne(record.id);
        reload()
      }

      function handleView(record: Recordable) {
        go(`/delivery/fares/details/${record.id}`);
      }

      return {
        registerTable,
        handleCreate,
        handleEdit,
        handleDelete,
        handleView,
      };
    },
  });
</script>
  