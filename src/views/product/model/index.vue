<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleEdit('add', record)">添加</a-button>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '编辑',
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, 'edit', record),
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
    <addModalVue @register="registerModal" @success="handleSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns, getFormConfig } from './tableData';
  import { getList, deleteOne } from '/@/api/product/model';
  import { useGo } from '/@/hooks/web/usePage';
  import addModalVue from './components/addModal.vue';
  import { useModal } from '/@/components/Modal';

  export default defineComponent({
    components: { BasicTable, TableAction, addModalVue },
    setup() {
      const go = useGo();
      const [registerModal, { openModal }] = useModal();

      const [registerTable, { setLoading, reload }] = useTable({
        canResize: true,
        title: '商品型号',
        size: 'small',
        bordered: false,
        useSearchForm: true,
        formConfig: getFormConfig(),
        api: getList,
        columns: getBasicColumns(),
        rowKey: 'id',
        showTableSetting: false,
        actionColumn: {
          width: 220,
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
          slots: { customRender: 'action' },
        },
      });

      function handleEdit(type, record: Recordable) {
        openModal(true, {
          record,
          isUpdate: type == 'add' ? false : true,
        });
      }

      async function handleDelete(record: Recordable) {
        setLoading(true);
        await deleteOne(record.id);
        reload();
      }

      function handleView(record: Recordable) {
        console.log(record);
        // go(`/product/model/details/${record.id}`);
      }

      const handleSuccess = () => {};

      return {
        registerTable,
        handleEdit,
        handleDelete,
        handleView,
        registerModal,
        handleSuccess,
      };
    },
  });
</script>
