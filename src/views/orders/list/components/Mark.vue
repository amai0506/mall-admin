<template>
  <a-modal v-model:visible="visible" title="备注" @ok="handleOk">
    <form style="padding: 20px">
      <a-form-item v-bind="validateInfos.name">
        <a-textarea :rows="4" v-model:value="modelRef.value" placeholder="请输入" />
      </a-form-item>
    </form>
  </a-modal>
</template>

<script lang="ts">
  import { defineComponent, reactive, ref } from 'vue';
  import { Form } from 'ant-design-vue';
  const useForm = Form.useForm;
  export default defineComponent({
    name: 'Mark',
    emits: ['success'],
    setup(_, { emit }) {
      const modelRef = reactive({
        value: '',
      });
      const rulesRef = reactive({
        value: [
          {
            required: true,
            message: 'Please input value',
          },
        ],
      });
      const { resetFields, validate, validateInfos } = useForm(modelRef, rulesRef);

      const visible = ref(false);
      const handleOk = () => {
        validate().then(() => {
          emit('success', modelRef);
        });
      };
      const open = () => {
        visible.value = true;
      };
      const close = () => {
        visible.value = false;
        resetFields();
      };
      return { handleOk, modelRef, visible, open, close, validateInfos };
    },
  });
</script>
