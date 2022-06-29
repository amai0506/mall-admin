<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    :title="getTitle"
    @ok="handleSubmit"
    :canFullscreen="false"
  >
    <BasicForm @register="registerForm" />
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { schemas } from '../formData';
  import { useMessage } from '/@/hooks/web/useMessage';

  import { isArray } from '/@/utils/is';

  export default defineComponent({
    name: 'AddModal',
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const isUpdate = ref(true);
      const rowId = ref('');
      const [registerForm, { setFieldsValue, resetFields, validate, setProps }] = useForm({
        labelWidth: 100,
        schemas: schemas,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        isUpdate.value = !!data?.isUpdate;
        // if (unref(isUpdate)) {
        //   rowId.value = data.record.id;
        //   setFieldsValue({
        //     ...data.record,
        //   });
        // }
      });
      const { createMessage } = useMessage();
      const getTitle = computed(() => (!unref(isUpdate) ? '新增数据源' : '编辑数据源'));

      const handleSubmit = async () => {
        try {
          const values = await validate();
          setModalProps({ confirmLoading: true });
          // if (!unref(isUpdate)) {
          //   await addOne({ ...values });

          //   createMessage.success('操作成功');
          // } else {
          //   await updateOne({ id: rowId.value, ...values });

          //   createMessage.success('操作成功');
          // }
          closeModal();
          emit('success', { isUpdate: unref(isUpdate), values: { ...values, id: rowId.value } });
        } finally {
          setModalProps({ confirmLoading: false });
        }
      };

      return { registerModal, registerForm, getTitle, handleSubmit };
    },
  });
</script>
