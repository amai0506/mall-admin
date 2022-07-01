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
}

/**
 * @description: Request list return value
 */
export type ListGetResultModel = BasicFetchResult<ListItem>;

enum Api {
  GET_LIST = '/product/spec/list',
  ADD_ONE = '/product/spec/create',
  UPDATE_ONE = '/product/spec/update',
  DELETE_ONE = '/product/spec/deleteById',
  GET_ONE = '/product/spec/detailById',
}
/**
 * @description: Get sample list value
 */

export const getList = (params: BasicPageParams) =>
  defHttp.get<ListGetResultModel>({
    url: Api.GET_LIST,
    params,
  });

export const addOne = (params: ListItem) =>
  defHttp.post<any>({
    url: Api.ADD_ONE,
    params,
  });

export const updateOne = (params: ListItem) =>
  defHttp.put<any>({
    url: Api.UPDATE_ONE,
    params,
  });

export const deleteOne = (id: number) =>
  defHttp.delete<any>({
    url: `${Api.DELETE_ONE}/${id}`,
  });

export const getOne = (id: string) =>
  defHttp.get<any>({
    url: `${Api.GET_ONE}/${id}`,
  });
