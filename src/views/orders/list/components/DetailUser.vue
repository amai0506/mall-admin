<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="修改地址"
    @ok="handleSubmit"
    :canFullscreen="false"
  >
    <BasicForm @register="registerForm">
      <template #sourceName="{ model, field }">
        <a-cascader
          v-model:value="model[field]"
          :options="treeData"
          :display-render="displayRender"
          expand-trigger="hover"
          placeholder="请选择"
        />
      </template>
      <template #postscript="{ model, field }">
        <a-textarea disabled v-model:value="model[field]" :auto-size="{ minRows: 2, maxRows: 5 }" />
      </template>
    </BasicForm>
  </BasicModal>
</template>

<script lang="ts">
  import { defineComponent, ref, watch, unref } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { schemas, treeData } from './data.tsx';
  export default defineComponent({
    components: { BasicModal, BasicForm },
    emits: ['success', 'register'],
    setup(_, { emit }) {
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
        console.log('data', data);
        setModalProps({ confirmLoading: false });
        setFieldsValue({
          ...data.record,
        });
      });
      const displayRender = ({ labels }: { labels: string[] }) => {
        console.log('labels', labels);
        console.log('labels[labels.length - 1]', labels[labels.length - 1]);
        let arr = labels.map((item, index) => (index != labels.length - 1 ? item + '/' : item));
        return arr;
      };

      const handleSubmit = () => {
        closeModal();
      };
      return { registerModal, registerForm, handleSubmit, treeData, displayRender };
    },
  });
</script>

<style></style>
