<template>
  <a-card title="添加商品分类数据">
    <template #extra>
      <a-button type="primary" @click="goBack">返回</a-button>
    </template>
    <BasicForm @register="register">
      <template #img_url>
        <a-upload
          v-model:file-list="fileList"
          listType="picture-card"
          name="file"
          :multiple="false"
          :show-upload-list="false"
          list-type="picture-card"
          class="avatar-uploader"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
            <Icon v-if="loading" icon="ant-design:loading-3-quarters-outlined" />
            <Icon v-else icon="ant-design:plus-outlined" />
            <div class="ant-upload-text">上传</div>
          </div>
        </a-upload>
        <div class="imgBox" v-if="imageUrl">
          <div class="mode">
            <img :src="imageUrl" alt="" />
            <Icon icon="ant-design:delete-outlined" @click="deleteImage" />
          </div>
        </div>
      </template>
      <template #icon_url>
        <a-upload
          v-model:file-list="fileList"
          listType="picture-card"
          name="file"
          :multiple="false"
          :show-upload-list="false"
          list-type="picture-card"
          class="avatar-uploader"
          action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          :before-upload="beforeUpload"
          @change="handleChange"
        >
          <img v-if="imageUrl" :src="imageUrl" alt="avatar" />
          <div v-else>
            <Icon v-if="loading" icon="ant-design:loading-3-quarters-outlined" />
            <Icon v-else icon="ant-design:plus-outlined" />
            <div class="ant-upload-text">上传</div>
          </div>
        </a-upload>
        <div class="imgBox" v-if="imageUrl">
          <div class="mode">
            <img :src="imageUrl" alt="" />
            <Icon icon="ant-design:delete-outlined" @click="deleteImage" />
          </div>
        </div>
      </template>
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
            <div v-if="true">
              <Icon icon="ant-design:plus-outlined" :size="14" />
              <div class="ant-upload-text">Upload</div>
            </div>
          </a-upload>
          <a-modal :visible="false" :footer="null" @cancel="handleCancel">
            <img alt="example" style="width: 100%" :src="previewImage" />
          </a-modal>
        </div>
      </template>
    </BasicForm>
  </a-card>
</template>
<script lang="ts">
  import { defineComponent, ref } from 'vue';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { schemas } from '../../formData';
  import { addOne } from '/@/api/product/sort';
  import { useGo } from '/@/hooks/web/usePage';
  import { Icon } from '/@/components/Icon';
  import { useUserStore } from '/@/store/modules/user';

  export default defineComponent({
    components: { BasicForm, Icon },
    setup() {
      const token = useUserStore().getToken;
      const { createMessage } = useMessage();
      const go = useGo();
      const [register, { validate, setProps, getFieldsValue }] = useForm({
        autoFocusFirstItem: true,
        schemas: schemas,
        labelWidth: 200,
        actionColOptions: {
          span: 24,
        },
        labelCol: {
          span: 6,
        },
        wrapperCol: {
          span: 12,
        },
        submitButtonOptions: {
          text: '提交',
        },
        submitFunc: customSubmitFunc,
      });

      const fileList = ref([]);
      const loading = ref(false);
      const imageUrl = ref('');
      const previewImage = ref('');
      function getBase64(file: File) {
        return new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = (error) => reject(error);
        });
      }
      const handleChange = (info) => {
        if (info.file.status === 'uploading') {
          loading.value = true;
          return;
        }

        if (info.file.status === 'done') {
          // Get this url from response in real world.
          getBase64(info.file.originFileObj, (base64Url) => {
            imageUrl.value = base64Url;
            loading.value = false;
          });
        }

        if (info.file.status === 'error') {
          loading.value = false;
          createMessage.error('upload error');
        }
      };

      const beforeUpload = (file) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';

        if (!isJpgOrPng) {
          createMessage.error('You can only upload JPG file!');
        }

        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isLt2M) {
          createMessage.error('Image must smaller than 2MB!');
        }

        return isJpgOrPng && isLt2M;
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

      function goBack() {
        go(-1);
      }
      const handleCancel = () => {};
      const deleteImage = () => {};

      return {
        token,
        register,
        goBack,
        fileList,
        imageUrl,
        loading,
        handleChange,
        beforeUpload,
        deleteImage,
        handleCancel,
        previewImage,
      };
    },
  });
</script>
<style lang="less" scoped>
  .ant-radio-wrapper {
    margin-right: 5px;
  }
  .imgBox {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
    .mode {
      position: relative;

      img {
        display: block;
        width: 100%;
      }
      .anticon {
        display: none;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        cursor: pointer;
      }
    }
    &:hover {
      opacity: 0.5;
      .anticon {
        display: block;
      }
    }
  }
</style>
