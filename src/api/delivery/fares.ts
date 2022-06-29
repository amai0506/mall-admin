
import { defHttp } from '/@/utils/http/axios';
import { BasicPageParams, BasicFetchResult } from '/@/api/model/baseModel';
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
    logistics2: string,
}

/**
 * @description: Request list return value
 */
export type ListGetResultModel = BasicFetchResult<ListItem>;

enum Api {
  GET_LIST = '/fares/getList',
  ADD_ONE = '/fares/addOne',
  UPDATE_ONE = '/fares/updateOne',
  DELETE_ONE = '/fares/deleteOne',
  GET_ONE = '/fares/getOne',
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
    