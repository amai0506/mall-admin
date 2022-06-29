<template>
  <a-card title="编辑商品分类数据">
    <template #extra>
      <a-button type="primary" @click="goBack">返回</a-button>
    </template>
    <BasicForm @register="register">
      <template #img="{ model, field }">
        <div class="clearfix">
          <a-upload
            action="/api/toolkit/file/upload"
            list-type="picture-card"
            :headers="{ Authorization: token }"
            v-model:file-list="model[field]"
            :maxCount="1"
            @change="handleChange($event)"
          >
            <div v-if="model[field].length < 1">
              <Icon icon="ant-design:plus-outlined" :size="14" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <a-modal :visible="false" :footer="null">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>
      </template>
    </BasicForm>
  </a-card>
</template>
<script lang="ts">
  import { defineComponent, reactive, ref, toRefs } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { schemas } from '../../formData';
  import { updateOne, getOne } from '/@/api/product/sort';
  import { useGo } from '/@/hooks/web/usePage';
  import { useRoute } from 'vue-router';
  import Icon from '/@/components/Icon';
  import { useUserStore } from '/@/store/modules/user';

  interface ApiResponse extends Response {
    readonly data: string;
  }

  interface FileInfo {
    file: FileItem;
    fileList: FileItem[];
  }

  function getBase64(file: File) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }

  interface FileItem {
    uid: string;
    name?: string;
    status?: string;
    response?: ApiResponse;
    percent?: number;
    url?: string;
    preview?: string;
    originFileObj?: any;
  }

  export default defineComponent({
    components: { BasicForm, Icon },
    setup() {
      const token = useUserStore().getToken;
      const { createMessage } = useMessage();
      const go = useGo();
      const { params } = useRoute();
      const previewImage = ref('');
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

      const ImgState = reactive({
        previewVisible: false,
        previewImage: '',
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
          console.log('data===', data);
          const res = await updateOne({ ...data, id: id });
          console.log('res====', res);
          createMessage.success('提交成功！');
          goBack();
        } catch (error) {
        } finally {
          setProps({
            submitButtonOptions: {
              loading: false,
            },
          });
        }
      }

      function goBack() {
        go(-1);
      }

      const handleChange = (info: FileInfo) => {
        info.fileList.forEach((file) => {
          if (file.response) {
            file.url = `/api/toolkit/file/${file.response.data}/view`;
          }
        });
      };

      const handleCancel = () => {};
      return {
        register,
        handleCancel,
        previewImage,
        goBack,
        handleChange,
        token,
        ...toRefs(ImgState),
      };
    },
  });
</script>
