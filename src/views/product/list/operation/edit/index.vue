<template>
  <a-card title="编辑商品列表数据">
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
            <div>
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
            :maxCount="1"
            @change="handleChange($event)"
          >
            <div>
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
  import { defineComponent, reactive, ref, toRefs } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { schemas } from '../../formData';
  import { getOne, updateOne } from '/@/api/product/list';
  import Icon from '/@/components/Icon/index';
  import { useGo } from '/@/hooks/web/usePage';
  import { useRoute } from 'vue-router';
  import { Tinymce } from '/@/components/Tinymce';
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
    components: { BasicForm, Icon, Tinymce },
    setup() {
      const token = useUserStore().getToken;
      const { createMessage } = useMessage();
      const go = useGo();
      const { params } = useRoute();
      const { id } = params;
      const ImgState = reactive({
        fileList: [],
        previewImg: '',
        previewImgs: '',
        imgsVisible: false,
        imgVisible: false,
      });
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
      const handleCancel = (type: string) => {
        type === 'img' ? (ImgState.imgVisible = false) : (ImgState.imgsVisible = false);
      };
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
      const handlePreview = async () => {};

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
        handleChange,
        token,
        handlePreview,
        handleCancel,
        handlePreviewImgs,
        handlePreviewImg,
        ...toRefs(ImgState),
      };
    },
  });
</script>
