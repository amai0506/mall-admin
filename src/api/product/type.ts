import {defHttp} from '/@/utils/http/axios';
import {BasicPageParams, BasicFetchResult} from '/@/api/model/baseModel';

/**
 * @description: Request list interface parameters
 */
export interface ListItem {
  id?: number;
  consignee: string,
  tel: string,
  orderNo: string,
  address: string,
  logistics: string,
  logistics1: string,
  logistics2: string,
}

/**
 * @description: Request list return value
 */
export type ListGetResultModel = BasicFetchResult<ListItem>;

enum Api {
  GET_LIST = '/product/type/list',
  ADD_ONE = '/list/addOne',
  UPDATE_ONE = '/list/updateOne',
  DELETE_ONE = '/list/deleteOne',
  GET_ONE = '/list/getOne',
}

/**
 * @description: Get sample list value
 */

export const getList = (params: BasicPageParams) =>
  defHttp.get<ListGetResultModel>({
    url: Api.GET_LIST,
    params,
    headers: {
      ignoreCancelToken: true,
    },
  });

export const addOne = (params: ListItem) =>
  defHttp.post<any>({
    url: Api.ADD_ONE,
    params,
    headers: {
      ignoreCancelToken: true,
    },
  });

export const updateOne = (params: ListItem) =>
  defHttp.put<any>({
    url: Api.UPDATE_ONE,
    params,
    headers: {
      ignoreCancelToken: true,
    },
  });

export const deleteOne = (id: number) =>
  defHttp.delete<any>({
    url: `${Api.DELETE_ONE}/${id}`,
    headers: {
      ignoreCancelToken: true,
    },
  });

export const getOne = (id: string) =>
  defHttp.get<any>({
    url: `${Api.GET_ONE}/${id}`,
    headers: {
      ignoreCancelToken: true,
    },
  });
