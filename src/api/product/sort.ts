import { realHttp } from '/@/utils/http/axios';
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
  logistics2: string;
}

/**
 * @description: Request list return value
 */
export type ListGetResultModel = BasicFetchResult<ListItem>;

enum Api {
  GET_LIST = '/product/type/search',
  ADD_ONE = '/product/type/create',
  UPDATE_ONE = '/product/type/update',
  DELETE_ONE = '/product/type/deleteById',
  GET_ONE = '/product/type/detailById',
}
/**
 * @description: Get sample list value
 */

function handle(params: any) {
  console.log('params', params);
  params.image = params.imageFileList.map((v) => v.url).join(',');
  params.icon = params.iconFileList.map((v) => v.url).join(',');
  params.imageFileList = [];
  params.iconFileList = [];
  console.log('params', params);
}
export const getList = (params: BasicPageParams) =>
  realHttp.get<ListGetResultModel>({
    url: Api.GET_LIST,
    params,
  });

export const addOne = (params: ListItem) => {
  handle(params);
  return realHttp.post<any>({
    url: Api.ADD_ONE,
    params,
  });
};

export const updateOne = async (params: ListItem) => {
  // handle(params);

  params['image'] = params['imageFileList']?.map((v) => v.url).join(',') || '';
  params['icon'] = params['iconFileList']?.map((v) => v.url).join(',') || '';
  params['imageFileList'] = [];
  params['iconFileList'] = [];
  const response = await realHttp.put<any>({
    url: Api.UPDATE_ONE,
    params,
  });
  return response;
};

export const deleteOne = (id: number) =>
  realHttp.delete<any>({
    url: `${Api.DELETE_ONE}/${id}`,
  });

export const getOne = (id: string) =>
  realHttp
    .get<any>({
      url: `${Api.GET_ONE}/${id}`,
      headers: {
        ignoreCancelToken: true,
      },
    })
    .then((res) => {
      res.imageFileList =
        res.image == null
          ? []
          : res.image
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
      res.iconFileList =
        res.icon == null
          ? []
          : res.icon
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
