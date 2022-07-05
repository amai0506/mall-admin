<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="型号配置"
    @ok="handleSubmit"
    :canFullscreen="false"
    class="form-self"
    width="70%"
    ok-text="保存"
  >
    <a-card>
      <a-table
        :rowKey="(record) => record.key"
        :columns="columns"
        :data-source="data"
        :pagination="false"
      >
        <template
          v-for="(col, i) in [
            'sku',
            'shortName',
            'specName',
            'costPrice',
            'unitPrice',
            'weight',
            'inventoryQuantity',
          ]"
          #[col]="{ text, record }"
          :key="col"
        >
          <div>
            <a-input
              v-if="col !== 'inventoryQuantity'"
              v-model:value="record[col]"
              style="margin: -5px 0"
              :placeholder="columns[i].title"
            />

            <a-input-number
              v-else
              v-model:value="record[col]"
              style="margin: -5px 0"
              :placeholder="columns[i].title"
              :min="0"
            />
          </div>
        </template>
        <template #operation="{ record }">
          <div class="editable-row-operations">
            <a-popconfirm title="是否要删除此行？" @confirm="del(record.key)">
              <a>
                <Icon icon="ant-design:delete-outlined" />
                删除
              </a>
            </a-popconfirm>
          </div>
        </template>
      </a-table>
      <a-button
        style="width: 100%; margin-top: 16px; margin-bottom: 8px"
        type="dashed"
        @click="newMember"
      >
        <template #icon>
          <Icon icon="ant-design:plus-outlined" />
        </template>
        新增型号</a-button
      >
    </a-card>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, watch } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getSpecOne } from '/@/api/product/model';
  import Icon from '/@/components/Icon';
  import { isArray } from '/@/utils/is';

  const columns = [
    {
      title: '商品SKU',
      dataIndex: 'sku',
      slots: {
        customRender: 'sku',
      },
    },
    {
      title: '快递单显示名称',
      dataIndex: 'shortName',
      slots: {
        customRender: 'shortName',
      },
    },
    {
      title: '型号/规格',
      dataIndex: 'specName',
      slots: {
        customRender: 'specName',
      },
    },
    {
      title: '成本(元)',
      dataIndex: 'costPrice',
      slots: {
        customRender: 'costPrice',
      },
    },
    {
      title: '零售(元)',
      dataIndex: 'unitPrice',
      slots: {
        customRender: 'unitPrice',
      },
    },
    {
      title: '重量(KG)',
      dataIndex: 'weight',
      slots: {
        customRender: 'weight',
      },
    },
    {
      title: '库存',
      dataIndex: 'inventoryQuantity',
      slots: {
        customRender: 'inventoryQuantity',
      },
    },
    {
      title: '操作',
      dataIndex: 'operation',
      slots: {
        customRender: 'operation',
      },
      width: '10%',
    },
  ];
  export default defineComponent({
    name: 'AddModal',
    components: { BasicModal, Icon },
    emits: ['success', 'register'],
    setup(_, { emit }) {
      const rowId = ref('');
      const data = ref<any[]>([
        // {
        //   key: '1',
        //   sku: '1086015',
        //   shortName: '发夹',
        //   specName: '黑色',
        //   costPrice: 100,
        //   unitPrice: '128',
        //   weight: '0.2',
        //   inventoryQuantity: 100,
        // },
        // {
        //   key: '2',
        //   sku: '1086016',
        //   shortName: '牵引绳',
        //   specName: '荧光绿',
        //   costPrice: 15,
        //   unitPrice: 35,
        //   weight: 0.5,
        //   inventoryQuantity: 50,
        // },
        // {
        //   key: '3',
        //   sku: '1086017',
        //   shortName: '骨头',
        //   specName: '无色',
        //   costPrice: '15',
        //   unitPrice: '18.6',
        //   weight: '1.0',
        //   inventoryQuantity: 150,
        // },
      ]);
      const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
        rowId.value = data.record.id;
      });
      watch(
        () => rowId.value,
        async (id) => {
          const res = await getSpecOne(id);
          data.value = (isArray(res) && res.map((item) => ({ ...item, key: item.id }))) || [];
        }
      );

      const { createMessage } = useMessage();

      const del = (key) => {
        const newData = data.value.filter((item) => item.key !== key);
        data.value = newData;
      };

      const newMember = () => {
        // 判断数据是否为空
        const index = isEmpty(data.value);
        if (index !== -1) return createMessage.error('请输入完整信息后再创建新数据');
        const key = new Date().getTime();
        data.value.push({
          key,
          name: '',
          workId: '',
          department: '',
          isNew: true,
        });
      };

      const isEmpty = (data) => {
        return data.findIndex(
          (item) =>
            !item.sku ||
            !item.shortName ||
            !item.specName ||
            !item.costPrice ||
            !item.unitPrice ||
            !item.weight ||
            !item.inventoryQuantity
        );
      };
      const handleSubmit = async () => {
        try {
          closeModal();
          emit('success');
        } finally {
          setModalProps({ confirmLoading: false });
        }
      };

      return {
        registerModal,
        handleSubmit,
        newMember,
        del,
        columns,
        data,
      };
    },
  });
</script>

<style lang="less" scoped>
  .editable-row-operations a {
    margin-right: 8px;
    color: red;
  }
</style>
