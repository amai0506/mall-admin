import { defHttp } from '/@/utils/http/axios';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
/**
 * @description: Request list interface parameters
 */
export interface ListItem {
  id?: number;

  consignee: string;
  tel: string;
  orderNo: string;
  address: string;
  logistics: string;
  logistics1: string;
  logistics2: string;
}

/**
 * @description: Request list return value
 */
export type ListGetResultModel = BasicFetchResult<ListItem>;

enum Api {
  GET_LIST = '/product/product/search',
  ADD_ONE = '/product/product/create',
  UPDATE_ONE = '/product/product/update',
  DELETE_ONE = '/product/product/deleteById',
  GET_ONE = '/product/product/detailById',
}
/**
 * @description: Get sample list value
 */

export const getList = (params: BasicPageParams) =>
  defHttp.get<ListGetResultModel>({
    url: Api.GET_LIST,
    params,
  });

function handle(params: any) {
  params.coverImage = params.coverImageFileList.map((v) => v.url).join(',');
  params.detailImages = params.detailImagesFileList.map((v) => v.url).join(',');
  params.coverImageFileList = [];
  params.detailImagesFileList = [];
}

export const addOne = (params: any) => {
  handle(params);
  return defHttp.post<any>({
    url: Api.ADD_ONE,
    params,
  });
};

export const updateOne = (params: any) => {
  handle(params);
  return defHttp.put<any>({
    url: Api.UPDATE_ONE,
    params,
  });
};

export const deleteOne = (id: number) =>
  defHttp.delete<any>({
    url: `${Api.DELETE_ONE}/${id}`,
  });

export const getOne = (id: string) =>
  defHttp
    .get<any>({
      url: `${Api.GET_ONE}/${id}`,
    })
    .then((res) => {
      res.coverImageFileList =
        res.coverImage == null
          ? []
          : res.coverImage
              .split(',')
              .filter((v) => v)
              .map((v) => {
                return {
                  uid: '-1',
                  name: 'image.png',
                  status: 'done',
                  url: v,
                };
              });
      res.detailImagesFileList =
        res.detailImages == null
          ? []
          : res.detailImages
              .split(',')
              .filter((v) => v)
              .map((v) => {
                return {
                  uid: '-1',
                  name: 'image.png',
                  status: 'done',
                  url: v,
                };
              });
      console.log('res', res);
      return res;
    });
