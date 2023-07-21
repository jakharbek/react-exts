// @flow
import * as React from 'react';
import {useQuery} from 'react-query'


type onSuccessFuncType = ({
                              data: any
                          }) => void;

type onErrorFuncType = (error) => void;

type PropsArg = {
    axios:any,
    queryKey: string[],
    axiosUrl: string,
    axiosParams?: any
    enabled?: boolean,
    onSuccess?: onSuccessFuncType,
    onError?: onErrorFuncType,
    queryFn?:any
};
type PropsResponse = {
    isLoading:boolean,
    isError: boolean,
    isFetching: boolean,
    data: any,
    error: any
};
export const useApiQuery = ({axios, queryKey, axiosUrl, axiosParams, enabled=true, onSuccess, onError,queryFn = null}: PropsArg):PropsResponse => {

    let queryFnDefault = () => {
        return axios.get(axiosUrl, axiosParams)
    };

    if(queryFn != null){
        queryFnDefault = queryFn;
    }


    const {
        isLoading,
        isError,
        data,
        error,
        isFetching
    } = useQuery({
        queryKey,
        queryFn:queryFnDefault,
        onSuccess,
        onError,
        enabled
    })

    return {isLoading, isError, data, error, isFetching};
};

