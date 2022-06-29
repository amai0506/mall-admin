<template>
  <PageWrapper title="快递设置">
    <div style="background: #fff; padding: 20px">
      <a-card style="margin-bottom: 20px">
        <BasicForm @register="register"> </BasicForm>
      </a-card>
      <a-card title="使用中的快递">
        <BasicTable @register="registerTable">
          <template #action="{ record }">
            <TableAction
              :actions="[
                {
                  label: '编辑',
                  icon: 'clarity:note-edit-line',
                  onClick: handleEdit.bind(null, record, 'edit'),
                },
              ]"
            />
          </template>
        </BasicTable>
      </a-card>
    </div>
    <editModalVue @register="registerModal" @success="handleSuccess" />
  </PageWrapper>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { schemas, getBasicColumns, data } from './formData';
  import { PageWrapper } from '/@/components/Page';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import editModalVue from './components/editModal.vue';
  import { useModal } from '/@/components/Modal';

  export default defineComponent({
    name: '',
    components: { BasicForm, PageWrapper, BasicTable, TableAction, editModalVue },
    setup() {
      const [register, { validate, setProps, getFieldsValue }] = useForm({
        autoFocusFirstItem: true,
        schemas: schemas,
        labelWidth: 200,
        actionColOptions: {
          span: 24,
        },
        labelCol: { span: 6 },
        wrapperCol: { span: 14 },
        submitButtonOptions: {
          text: '保存',
        },
        submitFunc: customSubmitFunc,
      });
      const [registerModal, { openModal }] = useModal();

      const [registerTable] = useTable({
        canResize: true,
        title: '使用中快递',
        size: 'small',
        bordered: false,
        useSearchForm: false,
        // formConfig: getFormConfig(),
        // api: getList,
        dataSource: data,
        columns: getBasicColumns(),
        rowKey: 'id',
        showTableSetting: false,
        actionColumn: {
          width: 100,
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
          slots: { customRender: 'action' },
        },
      });
      function handleEdit(record: Recordable, types) {
        // go(`/delivery/list/edit/${record.id}`);
        openModal(true, {
          record,
          isUpdate: types == 'add' ? false : true,
        });
      }

      const handleSuccess = () => {};
      async function customSubmitFunc() {
        try {
          await validate();
          setProps({
            submitButtonOptions: {
              loading: true,
            },
          });
          const data: any = getFieldsValue();

          setProps({
            submitButtonOptions: {
              loading: false,
            },
          });
        } catch (error) {}
      }
      return { register, handleEdit, registerTable, registerModal, handleSuccess };
    },
  });
</script>
