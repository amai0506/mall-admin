<template>
  <a-card title="添加用户管理数据">
    <template #extra>
      <a-button type="primary" @click="goBack">返回</a-button>
    </template>
    <BasicForm @register="register"> </BasicForm>
  </a-card>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { schemas } from '../../formData';
  import { addOne } from '/@/api/accounts/account';
  import { useGo } from '/@/hooks/web/usePage';

  export default defineComponent({
    components: { BasicForm },
    setup() {
      const { createMessage } = useMessage();
      const go = useGo();
      const [register, { validate, setProps, getFieldsValue }] = useForm({
        autoFocusFirstItem: true,
        schemas: schemas,
        labelWidth: 200,
        labelCol: {
          span: 7,
        },
        wrapperCol: {
          span: 14,
        },
        actionColOptions: {
          span: 24,
          offset: 9,
        },
        submitButtonOptions: {
          text: '提交',
        },
        submitFunc: customSubmitFunc,
      });

      async function customSubmitFunc() {
        try {
          await validate();
          setProps({
            submitButtonOptions: {
              loading: true,
            },
          });
          const data: any = getFieldsValue();
          await addOne(data);
          setProps({
            submitButtonOptions: {
              loading: false,
            },
          });
          createMessage.success('提交成功！');
          goBack();
        } catch (error) {}
      }

      function goBack() {
        go(-1);
      }

      return { register, goBack };
    },
  });
</script>
