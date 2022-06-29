<template>
  <a-card title="商品列表详情">
    <template #extra>
      <a-button type="primary" @click="goBack">返回</a-button>
    </template>
    <Description @register="register" />
  </a-card>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { Description, useDescription, buyerColumns } from '/@/components/Description/index';
  import { descSchemas } from '../formData';
  import { getOne } from '/@/api/product/list';
  import { useGo } from '/@/hooks/web/usePage';
  import { useRoute } from 'vue-router';

  export default defineComponent({
    components: { Description },
    setup() {
      const go = useGo();
      const { params } = useRoute();
      const { id } = params;
      const data = {};
      const [register, { setDescProps }] = useDescription({
        size: 'small',
        bordered: false,
        column: 3,
        data: data,
        schema: descSchemas,
      });

      function goBack() {
        go(-1);
      }

      getOne(String(id)).then((res) => {
        setDescProps({
          data: res,
        });
      });

      return {
        goBack,
        register,
      };
    },
  });
</script>
