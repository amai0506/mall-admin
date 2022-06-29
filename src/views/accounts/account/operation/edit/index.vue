
<template>
  <a-card title="编辑用户管理数据">
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
  import { updateOne, getOne } from '/@/api/accounts/account';
  import { useGo } from '/@/hooks/web/usePage';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    components: { BasicForm },
    setup() {
      const { createMessage } = useMessage();
      const go = useGo();
      const { params } = useRoute();
      const { id } = params;
      const [register, { validate, setProps, getFieldsValue, setFieldsValue }] = useForm({
        autoFocusFirstItem: true,
        schemas: schemas,
        labelWidth: 200,
        actionColOptions: {
          span: 24,
        },
        submitButtonOptions: {
          text: '提交',
        },
        submitFunc: customSubmitFunc,
      });

      getOne(String(id)).then((res) => {
        setFieldsValue(res);
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
          await updateOne({ ...data, id: id });
          setProps({
            submitButtonOptions: {
              loading: false,
            },
          });
          createMessage.success('提交成功！');
          goBack();
        } catch (error) {};
      };

      function goBack() {
        go(-1);
      };

      return { register, goBack };
    },
  });
</script>
  