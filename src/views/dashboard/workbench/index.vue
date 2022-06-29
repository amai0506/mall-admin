<template>
  <PageWrapper>
    <a-card :bordered="false" :bodyStyle="{ 'margin-bottom': '10px' }">
      <a-row :gutter="[16, 16]">
        <a-col :md="6" :sm="24" v-for="(item, index) in growCardList" :key="index">
          <a-card
            :bordered="false"
            size="small"
            :loading="loading"
            :style="{ backgroundColor: item.color }"
          >
            <div class="card_content">
              <p class="card_title">{{ item.total }}</p>
              <p>{{ item.title }}</p>
            </div>
          </a-card>
        </a-col>
      </a-row>
    </a-card>
    <a-card :bordered="false" :bodyStyle="{ 'margin-bottom': '10px' }">
      <a-tabs type="card" v-model:activeKey="activeKey">
        <a-tab-pane :key="item.key" :tab="item.title" v-for="item in TabList">
          <GrowCard :loading="loading" class="enter-y" />
        </a-tab-pane>
      </a-tabs>
    </a-card>
    <a-card :bordered="false"> 流量趋势 </a-card>
  </PageWrapper>
</template>
<script lang="ts">
  import { PageWrapper } from '/@/components/Page';
  import GrowCard from './components/GrowCard.vue';
  import { ref, defineComponent } from 'vue';
  export default defineComponent({
    components: {
      PageWrapper,
      GrowCard,
    },
    setup() {
      const loading = ref<boolean>(true);
      setTimeout(() => {
        loading.value = false;
      }, 1500);
      const activeKey = ref(1);
      return {
        loading,
        activeKey,
        growCardList: [
          {
            title: '待发货订单',
            total: 120000,
            color: 'rgba(255, 0, 0, 0.5)',
          },
          {
            title: '上架中的商品',
            total: 120000,
            color: 'rgba(117, 83, 212, 0.8)',
          },
          {
            title: '近一个月成交数',
            total: 50000,
            color: 'rgba(0, 0, 255, 0.5)',
          },
          {
            title: '总用户数',
            total: 120000,
            color: 'rgba(0, 150, 136, 0.5)',
          },
        ],
        TabList: [
          {
            title: '今天',
            key: 1,
          },
          {
            title: '昨天',
            key: 2,
          },
          {
            title: '最近7天',
            key: 3,
          },
          {
            title: '最近30天',
            key: 4,
          },
        ],
      };
    },
  });
</script>
<style lang="less" scoped>
  .card_content {
    color: #fff;

    .card_title {
      font-weight: 700;
      font-size: 18px;
    }
  }
</style>
