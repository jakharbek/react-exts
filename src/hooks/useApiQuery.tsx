import * as React from 'react';
import { useQuery, UseQueryOptions } from 'react-query';

type onSuccessFuncTypeQuery = ({ data } : {data:any}) => void;
type onErrorFuncTypeQuery = (error: any) => void;

type PropsArg = {
    axios: any;
    queryKey: string[];
    axiosUrl: string;
    axiosParams?: any;
    enabled?: boolean;
    onSuccess?: onSuccessFuncTypeQuery;
    onError?: onErrorFuncTypeQuery;
    queryFn?: any;
};
type PropsResponse = {
    isLoading: boolean;
    isError: boolean;
    isFetching: boolean;
    data: any;
    error: any;
};

export const useApiQuery = ({
                                axios,
                                queryKey,
                                axiosUrl,
                                axiosParams,
                                enabled = true,
                                onSuccess,
                                onError,
                                queryFn = null,
                            }: PropsArg): PropsResponse => {
    let queryFnDefault = () => {
        return axios.get(axiosUrl, axiosParams);
    };

    if (queryFn != null) {
        queryFnDefault = queryFn;
    }

    const { isLoading, isError, data, error, isFetching } = useQuery({
        queryKey,
        queryFn: queryFnDefault,
        onSuccess,
        onError,
        enabled,
    });

    return { isLoading, isError, data, error, isFetching };
};
