<template>
  <a-card title="添加商品列表数据">
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
            @preview="handlePreviewImg"
          >
            <div v-if="model[field].length < 1">
              <Icon icon="ant-design:plus-outlined" :size="14" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <a-modal :visible="imgVisible" :footer="null" @cancel="handleCancel('img')">
            <img alt="example" style="width: 100%" :src="previewImg" />
          </a-modal>
        </div>
      </template>
      <template #imgs="{ model, field }">
        <div class="clearfix">
          <a-upload
            action="/api/toolkit/file/upload"
            list-type="picture-card"
            :headers="{ Authorization: token }"
            v-model:file-list="model[field]"
            :maxCount="8"
            @change="handleChange($event)"
            @preview="handlePreviewImgs"
          >
            <div v-if="model[field].length < 8">
              <Icon icon="ant-design:plus-outlined" :size="14" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <a-modal :visible="imgsVisible" :footer="null" @cancel="handleCancel('imgs')">
            <img alt="example" style="width: 100%" :src="previewImgs" />
          </a-modal>
        </div>
      </template>
      <template #detail="{ model, field }">
        <Tinymce v-model:value="model[field]" />
      </template>
    </BasicForm>
  </a-card>
</template>
<script lang="ts">
  import { defineComponent, reactive, toRefs } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { schemas } from '../../formData';
  import { addOne } from '/@/api/product/list';
  import { useGo } from '/@/hooks/web/usePage';
  import Icon from '/@/components/Icon/index';
  import { Tinymce } from '/@/components/Tinymce';
  import { useUserStore } from '/@/store/modules/user';

  interface ApiResponse extends Response {
    readonly data: string;
  }
  interface FileItem {
    uid: string;
    name?: string;
    status?: string;
    response?: ApiResponse;
    url: string;
  }
  interface FileInfo {
    file: FileItem;
    fileList: FileItem[];
  }

  export default defineComponent({
    components: { BasicForm, Tinymce, Icon },
    setup() {
      const token = useUserStore().getToken;
      const { createMessage } = useMessage();
      const ImgState = reactive({
        fileList: [],
        previewImg: '',
        previewImgs: '',
        imgsVisible: false,
        imgVisible: false,
      });
      function getBase64(file) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);

          reader.onload = () => resolve(reader.result);

          reader.onerror = (error) => reject(error);
        });
      }
      const go = useGo();
      const [register, { validate, setProps, getFieldsValue }] = useForm({
        autoFocusFirstItem: true,
        schemas: schemas,
        labelWidth: 200,
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 14,
        },
        actionColOptions: {
          span: 24,
          // offset: 9,
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
      const handleCancel = (type: string) => {
        type === 'img' ? (ImgState.imgVisible = false) : (ImgState.imgsVisible = false);
      };
      const handlePreview = () => {};
      function goBack() {
        go(-1);
      }

      const handlePreviewImgs = async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        ImgState.previewImgs = file.url || file.preview;
        ImgState.imgsVisible = true;
      };

      const handlePreviewImg = async (file) => {
        if (!file.url && !file.preview) {
          file.preview = await getBase64(file.originFileObj);
        }
        ImgState.previewImg = file.url || file.preview;
        ImgState.imgVisible = true;
      };

      const handleChange = (info: FileInfo) => {
        info.fileList.forEach((file) => {
          if (file.response) {
            file.url = `/api/toolkit/file/${file.response.data}/view`;
          }
        });
      };

      return {
        register,
        goBack,
        handleCancel,
        handlePreview,
        ...toRefs(ImgState),
        token,
        handlePreviewImg,
        handlePreviewImgs,
        handleChange,
      };
    },
  });
</script>
<style lang="less" scoped>
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
</style>
