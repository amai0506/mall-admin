<template>
  <a-card title="订单管理详情">
    <template #extra>
      <a-button type="primary" @click="goBack">返回</a-button>
    </template>
    <div class="order-status-text">
      <div>{{ descSchemas.orderInfo.order_status_text }}</div>
      <a-button type="primary" danger @click="changeStatus">变更状态</a-button>
    </div>

    <BasicTable @register="buyerTable">
      <template #avatar="{ record }">
        <img :src="record.avatar" style="width: 60px; height: 60px" />
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              label: '编辑',
              icon: 'clarity:note-edit-line',
              onClick: handleOptinos.bind(null, record),
            },
          ]"
        />
      </template>
    </BasicTable>
    <a-divider />
    <BasicTable @register="goodsTable">
      <template #list_pic_url="{ record }">
        <img :src="record.list_pic_url" style="width: 60px; height: 60px" />
      </template>
      <template #total="{ record }">
        {{ record.retail_price * record.number }}
      </template>
      <template #action="{ record }">
        <TableAction
          :actions="[
            {
              icon: 'clarity:note-edit-line',
              label: '编辑',
              onClick: handleEdit.bind(null, record),
            },
            {
              icon: 'ant-design:delete-outlined',
              label: '删除',
              color: 'error',
              popConfirm: {
                title: '是否确认删除',
                confirm: handleDelete.bind(null, record),
              },
            },
          ]"
        />
      </template>
    </BasicTable>
    <a-divider />
    <a-row>
      <a-col :span="12">
        <div class="detail-wrap">
          <div class="total-price">
            优惠：
            <span v-if="!!descSchemas.orderInfo.promotions_price">
              {{ descSchemas.orderInfo.promotions_price }}
            </span>
            <span v-else>0 </span>
            &nbsp;&nbsp; ¥
          </div>
          <div class="total-price">
            合计：{{ descSchemas.orderInfo.actual_price }}&nbsp;&nbsp;¥（含运费：¥{{
              descSchemas.orderInfo.freight_price
            }}）</div
          >
          <div class="total-price">
            改价前：{{ descSchemas.orderInfo.change_price }}&nbsp;&nbsp;¥（含运费：¥{{
              descSchemas.orderInfo.freight_price
            }}）</div
          >
          <div class="total-price">
            {{
              descSchemas.orderInfo.change_price - descSchemas.orderInfo.actual_price > 0
                ? '优惠金额：' +
                  (descSchemas.orderInfo.change_price - descSchemas.orderInfo.actual_price).toFixed(
                    2
                  )
                : '涨价金额：' +
                  (descSchemas.orderInfo.actual_price - descSchemas.orderInfo.change_price).toFixed(
                    2
                  )
            }}</div
          >
        </div>
      </a-col>
      <a-col :span="12">
        <div class="footer">
          <div class="item">
            <div class="t">订单ID：</div>
            <div class="c">{{ descSchemas.orderInfo.id }}</div>
          </div>
          <div class="item">
            <div class="t">订单号：</div>
            <div class="c">{{ descSchemas.orderInfo.order_sn }}</div>
          </div>
          <div class="item">
            <div class="t">加入时间：</div>
            <div class="c">{{ descSchemas.orderInfo.add_time }}</div>
          </div>
          <div class="item" v-if="descSchemas.orderInfo.pay_time">
            <div class="t">付款时间：</div>
            <div class="c">{{ descSchemas.orderInfo.pay_time }}</div>
          </div>
          <div class="item" v-if="descSchemas.orderInfo.shipping_time">
            <div class="t">发货时间：</div>
            <div class="c">{{ descSchemas.orderInfo.shipping_time }}</div>
          </div>
          <div class="item" v-if="descSchemas.orderInfo.confirm_time">
            <div class="t">确认时间：</div>
            <div class="c">{{ descSchemas.orderInfo.confirm_time }}</div>
          </div>
          <div class="item" v-if="descSchemas.orderInfo.dealdone_time">
            <div class="t">完成时间：</div>
            <div class="c">{{ descSchemas.orderInfo.dealdone_time }}</div>
          </div>
        </div>
      </a-col>
    </a-row>
    <a-divider />
    <div class="memo-wrap">
      <div class="content-title">卖家备注：</div>

      <a-textarea
        class="memo-input"
        v-model:value="merchantNotes"
        placeholder="请输入备注"
        :auto-size="{ minRows: 2, maxRows: 5 }"
      />

      <a-button size="small" type="primary" @click="savemerchantNotes">保存 </a-button>
    </div>

    <DetailUser @register="registerModal" @success="handleSuccess" />
    <UpdataProduct @register="registerEditModal" @success="EditSuccess" />
  </a-card>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { descSchemas, buyerColumns, productColumns } from '../formData';
  import { getOne } from '/@/api/orders/list';
  import { useGo } from '/@/hooks/web/usePage';
  import { useRoute } from 'vue-router';
  import { BasicTable, useTable, TableAction } from '/@/components/Table';
  import DetailUser from '../components/DetailUser.vue';
  import { useModal } from '/@/components/Modal';
  import UpdataProduct from '../components/updataProduct.vue';

  export default defineComponent({
    components: { BasicTable, TableAction, DetailUser, UpdataProduct },
    setup() {
      const go = useGo();
      const merchantNotes = ref('');
      const { params } = useRoute();
      const { id } = params;
      const data = {};
      const [registerModal, { openModal }] = useModal();
      const [registerEditModal, { openModal: open }] = useModal();

      const userData = [
        {
          user_id: descSchemas.orderInfo?.user_id,
          nickname: descSchemas.orderInfo.user_name,
          avatar: descSchemas.orderInfo.avatar,
          consignee: descSchemas.orderInfo.consignee,
          mobile: descSchemas.orderInfo.mobile,
          address: descSchemas.orderInfo.full_region + descSchemas.orderInfo.address,
          postscript: descSchemas.orderInfo.postscript,
          cAddress: descSchemas.orderInfo.address,
          addOptions: [
            descSchemas.receiver.province_id,
            descSchemas.receiver.city_id,
            descSchemas.receiver.district_id,
          ],
        },
      ];
      const [buyerTable] = useTable({
        title: '买家信息',
        dataSource: userData,
        columns: buyerColumns,
        pagination: false,
        showIndexColumn: false,
        scroll: { y: 300 },
        // showSummary: true,
        actionColumn: {
          width: 120,
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
          slots: { customRender: 'action' },
        },
        // summaryFunc: handleSummary,
      });

      const [goodsTable] = useTable({
        title: '货物信息',
        dataSource: descSchemas.orderInfo.goodsList,
        columns: productColumns,
        pagination: false,
        showIndexColumn: false,
        scroll: { y: 300 },
        actionColumn: {
          width: 200,
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
          slots: { customRender: 'action' },
        },
      });

      function goBack() {
        go(-1);
      }

      const changeStatus = () => {};

      const handleSuccess = () => {};
      // getOne(String(id)).then((res) => {
      //   // setDescProps({
      //   //   data: res,
      //   // });
      // });
      const handleOptinos = (record) => {
        openModal(true, {
          record,
        });
      };

      const handleEdit = (record) => {
        open(true, {
          record,
        });
      };
      const savemerchantNotes = () => {};
      const EditSuccess = () => {};
      const handleDelete = () => {};
      return {
        goBack,
        buyerTable,
        goodsTable,
        handleOptinos,
        descSchemas,
        changeStatus,
        handleSuccess,
        registerModal,
        handleDelete,
        handleEdit,
        registerEditModal,
        EditSuccess,
        merchantNotes,
        savemerchantNotes,
      };
    },
  });
</script>
<style lang="less" scoped>
  .order-status-text {
    width: 100%;
    height: 100px;
    line-height: 100px;
    background: #ececee;
    padding: 0 30px;
    box-sizing: border-box;
    margin-bottom: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .detail-wrap {
    display: flex;
    flex-direction: column;
    padding: 20px;
    border-right: 1px solid #f1f1f1;
  }

  .total-price {
    width: 100%;
    font-size: 14px;
    margin: 6px 0;
  }

  .content-title {
    margin-bottom: 8px;
    font-size: 14px;
    width: 80px;
  }

  .memo-wrap {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    box-sizing: border-box;
  }

  .memo-input {
    margin-right: 30px;
    flex: 1;
  }
  .footer {
    width: 100%;
    padding: 20px;

    .item {
      font-size: 14px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-bottom: 10px;
    }
  }
</style>
