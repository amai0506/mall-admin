<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="修改商品"
    @ok="handleSubmit"
    :canFullscreen="false"
  >
    <BasicForm @register="registerForm">
      <template #pic="{ model, field }">
        <img :src="model[field]" alt="" style="width: 60px; height: 60px" />
      </template>
    </BasicForm>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref, watch, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { schemas, Updateschemas } from './data';
  export default defineComponent({
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const [registerForm, { setFieldsValue, resetFields, validate, setProps }] = useForm({
        labelWidth: 100,
        schemas: Updateschemas,
        showActionButtonGroup: false,
        actionColOptions: {
          span: 23,
        },
      });
      const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
        resetFields();
        console.log('data', data);
        setModalProps({ confirmLoading: false });
        setFieldsValue({
          ...data.record,
        });
      });

      const handleSubmit = () => {
        closeModal();
      };
      return { registerModal, registerForm, handleSubmit };
    },
  });
</script>

<style></style>
