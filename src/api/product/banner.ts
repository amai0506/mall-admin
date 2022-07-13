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
  GET_LIST = '/system/recommend/list',
  UPDATE_ONE = '/system/recommend/saveOrUpdate',
  DELETE_ONE = '/system/recommend/deleteById',
  GET_ONE = '/system/recommend/detailById',
}
/**
 * @description: Get sample list value
 */

export const getList = (params: BasicPageParams) =>
  defHttp.get<ListGetResultModel>({
    url: Api.GET_LIST,
    params,
  });

export const updateOrAdd = (params: any) =>
  defHttp.post<any>({
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
