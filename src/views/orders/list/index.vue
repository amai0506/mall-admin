<template>
  <div>
    <BasicTable @register="registerTable">
      <template #toolbar>
        <a-button type="primary" @click="handleCreate">添加</a-button>
      </template>
      <template #goodsList="{ record }">
        <div
          v-for="(item, index) in record.goodsList"
          :key="item.id"
          class="goods-list"
          :style="[
            {
              borderBottom:
                record.goodsList.length > 1 &&
                index != record.goodsList.length - 1 &&
                '1px solid #f1f1f1',
            },
          ]"
        >
          <div class="good-left">
            <img :src="item.list_pic_url" alt="" class="goods-img" />
            <div>{{ item.goods_aka }}</div>
          </div>
          <div>
            <span>数量:</span>
            <span style="color: red">{{ item.number }}</span>
          </div>
        </div>
      </template>
      <template #userInfo="{ record }">
        <div class="user-wrap">
          <div class="user">昵称：{{ record.userInfo.nickname }}</div>
          <div class="user">姓名：{{ record.userInfo.name }}</div>
          <div class="user">手机：{{ record.userInfo.mobile }}</div>
        </div>
      </template>
      <template #expressInfo="{ record }">
        <div style="text-align: left">
          <div v-if="!!record.expressInfo" class="express-info">{{ record.expressInfo }}</div>
          <div class="user">
            {{ record.consignee }}
            {{ record.mobile }}
          </div>
          <div class="user">{{ record.full_region }}{{ record.address }}</div>
          <div v-if="!!record.postscript" class="user">留言：{{ record.postscript }}</div>
          <div class="user"
            ><span style="color: red; margin-right: 10px">备注 :</span>{{ record.admin_memo }}</div
          >
        </div>
      </template>

      <template #goodsCount="{ record }"> 共{{ record.goodsCount }}件商品 </template>
      <template #actual_price="{ record }">
        <div v-if="record.change_price != record.actual_price" class="user">
          改价前{{ record.change_price }}元
        </div>
        <div class="user">
          当前合计{{ record.actual_price }}元（含运费{{ record.freight_price }}元）
        </div>
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '详情',
              icon: 'clarity:info-standard-line',
              onClick: handleView.bind(null, record),
            },
            {
              label: '备注',
              icon: 'clarity:note-edit-line',
              onClick: handleMark.bind(null, record),
            },
            {
              label: '打印快递单',
              icon: 'clarity:note-edit-line',
              onClick: handleEdit.bind(null, record),
            },
          ]"
        />
        <!-- {
            label: '删除',
            icon: 'ant-design:delete-outlined',
            color: 'error',
            popConfirm: {
              title: '是否确认删除',
              confirm: handleDelete.bind(null, record),
            },
          }, -->
      </template>
    </BasicTable>
    <Mark ref="markRef" @success="markSuccess" />
  </div>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import { getBasicColumns, getFormConfig, data } from './tableData';
  import { getList, deleteOne } from '/@/api/orders/list';
  import { useGo } from '/@/hooks/web/usePage';
  import Mark from './components/Mark.vue';

  export default defineComponent({
    components: { BasicTable, TableAction, Mark },
    setup() {
      const go = useGo();
      const [registerTable, { setLoading, reload }] = useTable({
        canResize: true,
        title: '订单管理',
        size: 'small',
        bordered: false,
        scroll: { x: 1900 },
        useSearchForm: true,
        formConfig: getFormConfig(),
        // api: getList,
        dataSource: data,
        columns: getBasicColumns(),
        rowKey: 'id',
        showTableSetting: false,
        actionColumn: {
          width: 250,
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
          slots: { customRender: 'action' },
        },
      });
      const markRef = ref();
      function handleCreate() {
        go('/orders/list/add');
      }

      function handleEdit(record: Recordable) {
        go(`/orders/list/edit/${record.id}`);
      }

      async function handleDelete(record: Recordable) {
        setLoading(true);
        await deleteOne(record.id);
        reload();
      }

      function handleView(record: Recordable) {
        go(`/orders/list/details/${record.id}`);
      }

      const handleMark = () => {
        markRef.value.open();
      };

      const markSuccess = (values) => {
        console.log(values);
      };

      return {
        registerTable,
        markRef,
        handleCreate,
        handleEdit,
        handleDelete,
        handleView,
        handleMark,
        markSuccess,
      };
    },
  });
</script>
<style lang="less" scoped>
  .goods-list {
    display: flex;
    justify-content: space-between;

    padding: 6px 0;
    align-items: center;
    .good-left {
      display: flex;
      align-items: center;
    }
    .goods-img {
      width: 40px;
      height: 40px;
    }
  }

  .user-wrap {
    padding: 10px;
    text-align: left;
  }
  .express-info {
    padding: 10px;
    color: #ff3456;
    font-size: 14px;
    line-height: 20px;
    margin-bottom: 10px;
    background: #f0f0f0;
  }
  .user {
    padding: 5px 0;
  }
</style>
