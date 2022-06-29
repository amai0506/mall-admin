<template>
  <div>
    <a-row :gutter="[8, 8]">
      <a-col :span="8" v-for="item in growCardList" :key="item.title">
        <a-card
          size="small"
          :loading="loading"
          :title="item.title"
          :headStyle="{ color: item.color }"
        >
          <template #extra>
            <!-- <Tag :color="item.color">{{ item.action }}</Tag> -->
            <a-button v-if="item.title == '顾客'" size="small">查看</a-button>
          </template>

          <div class="flex justify-between p-2 px-4" style="padding: 20px 0">
            <span>{{ item.name1 }}</span>
            <CountTo :startVal="1" :endVal="item.value" style="font-weight: 700" />
          </div>
          <div class="flex justify-between p-2 px-4" style="padding: 20px 0">
            <span>{{ item.name2 }}</span>
            <CountTo :startVal="1" :endVal="item.total" style="font-weight: 700" />
          </div>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
<script lang="ts" setup>
  import { CountTo } from '/@/components/CountTo/index';
  import { Icon } from '/@/components/Icon';
  import { growCardList } from './data';
  defineProps({
    loading: {
      type: Boolean,
    },
  });
</script>
