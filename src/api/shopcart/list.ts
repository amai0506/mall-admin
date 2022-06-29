import { defHttp } from '/@/utils/http/axios';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
/**
 * @description: Request list interface parameters
 */
export interface ListItem {
  id?: number;

  user_id: string;
  nickname: string;
  goods_id: string;
  list_pic_url: string;
  goods_name: string;
  goods_specifition_name_value: string;
  number: string;
  retail_price: string;
  add_time: string;
  is_delete: string;
}

/**
 * @description: Request list return value
 */
export type ListGetResultModel = BasicFetchResult<ListItem>;

enum Api {
  GET_LIST = '/list/getList',
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
