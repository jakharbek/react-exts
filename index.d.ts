// index.d.ts

import { UseMutationOptions, UseMutationResult, UseQueryOptions, UseQueryResult } from 'react-query';

declare type onSuccessFuncType<T> = (data: T) => void;
declare type onErrorFuncType = (error: any) => void;

declare type AxiosInstance = any; // You can replace 'any' with the actual Axios instance type if available

declare type MutationOptions<TData, TVariables> = UseMutationOptions<TData, unknown, TVariables, unknown>;

declare type MutationResult<TData, TVariables> = UseMutationResult<TData, unknown, TVariables, unknown>;

declare type PropsArg<TData, TVariables = unknown> = {
    axios: AxiosInstance;
    queryKey: string[];
    axiosUrl: string;
    axiosParams?: TVariables;
    enabled?: boolean;
    onSuccess?: onSuccessFuncType<TData>;
    onError?: onErrorFuncType;
    queryFn?: (variables?: TVariables) => Promise<TData>;
};

declare type PropsResponse<TData> = UseQueryResult<TData, any>;

declare function useApiMutation<TData, TVariables = unknown>(
    props: PropsArg<TData, TVariables>
): MutationResult<TData, TVariables>;

declare function useApiQuery<TData, TVariables = unknown>(
    props: PropsArg<TData, TVariables>
): PropsResponse<TData>;

export { useApiMutation, useApiQuery };
