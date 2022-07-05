<template>
  <BasicModal
    v-bind="$attrs"
    @register="registerModal"
    title="型号配置"
    :canFullscreen="false"
    class="form-self"
    width="70%"
    :footer="null"
  >
    <a-card>
      <a-table :columns="columns" :data-source="data" :pagination="false" :loading="loading">
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
          <div style="margin: -5px 0">
            <template v-if="editableData[record.key]">
              <a-input
                v-if="col !== 'inventoryQuantity'"
                v-model:value="editableData[record.key][col]"
                style="margin: -5px 0"
                :placeholder="columns[i].title"
              />

              <a-input-number
                v-else
                v-model:value="editableData[record.key][col]"
                style="margin: -5px 0"
                :placeholder="columns[i].title"
                :min="0"
              />
            </template>

            <template v-else>
              {{ text }}
            </template>
          </div>
        </template>
        <template #operation="{ record }">
          <div class="editable-row-operations">
            <span v-if="editableData[record.key]">
              <span v-if="record.isNew">
                <a @click="save(record)">添加</a>
                <a-divider type="vertical" />
                <a-popconfirm title="是否要删除此行？" @confirm="del(record)">
                  <a style="color: red">删除</a>
                </a-popconfirm>
              </span>
              <span v-else>
                <a @click="save(record)">保存</a>
                <a-divider type="vertical" />
                <a @click="cancel(record)">取消</a>
              </span>
            </span>
            <span v-else>
              <a @click="edit(record.key)">编辑</a>
              <a-divider type="vertical" />
              <a-popconfirm title="是否要删除此行？" @confirm="del(record)">
                <a style="color: red">删除</a>
              </a-popconfirm>
            </span>
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
  import { defineComponent, ref, reactive, watch } from 'vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { getSpecOne, deleteOne, updateOne } from '/@/api/product/model';
  import { cloneDeep } from 'lodash-es';
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
      width: 150,
    },
  ];
  export default defineComponent({
    name: 'AddModal',
    components: { BasicModal, Icon },
    setup() {
      const rowId = ref('');
      const loading = ref<boolean>(false);
      const editableData = reactive({});
      const data = ref<any[]>([]);
      const [registerModal] = useModalInner((data) => {
        rowId.value = data.record.id;
      });

      watch(
        () => rowId.value,
        async (id) => {
          await getData(id);
        }
      );

      const getData = async (id) => {
        const res = await getSpecOne(id);
        data.value = (isArray(res) && res.map((item) => ({ ...item, key: item.id }))) || [];
      };

      const { createMessage } = useMessage();

      const edit = (key) => {
        editableData[key] = cloneDeep(data.value.filter((item) => key === item.key)[0]);
      };

      const save = async (record: Recordable) => {
        const { key } = record;
        Object.assign(data.value.filter((item) => key === item.key)[0], editableData[key]);
        const { sku, shortName, specName, costPrice, unitPrice, weight, inventoryQuantity } =
          editableData[key];
        if (
          !sku ||
          !shortName ||
          !specName ||
          !costPrice ||
          !unitPrice ||
          !weight ||
          !inventoryQuantity
        ) {
          createMessage.error('请填写完整信息');
          return;
        }
        const target = data.value.find((item) => item.key === key);
        target.isNew = false;
        loading.value = true;
        await updateOne({ ...editableData[key], productId: rowId.value });
        createMessage.success('操作成功');
        getData(rowId.value);
        delete editableData[key];
        loading.value = false;
      };

      const cancel = (key) => {
        delete editableData[key];
      };
      const del = async (record: Recordable) => {
        const { key, id } = record;
        if (id) {
          await deleteOne(id);
          createMessage.success('操作成功');
        }
        const newData = data.value.filter((item) => item.key !== key);
        data.value = newData;
        delete editableData[key];
      };

      const newMember = () => {
        const key = new Date().getTime();
        data.value.push({
          key,
          sku: '',
          shortName: '',
          specName: '',
          costPrice: '',
          unitPrice: '',
          weight: '',
          inventoryQuantity: undefined,
          isNew: true,
        });
        edit(key);
      };

      return {
        registerModal,

        newMember,
        cancel,
        edit,
        save,
        columns,
        data,
        editableData,
        del,
        loading,
      };
    },
  });
</script>

<style lang="less" scoped>
  .editable-row-operations a {
    margin-right: 8px;
  }
</style>
