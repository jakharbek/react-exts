// @flow
import { isNil,get } from 'lodash';
import * as React from 'react';
import {useEffect, useState} from "react";
import {useLocation,useNavigate} from "react-router-dom";
import {useApiQuery} from "./useApiQuery";

type onSuccessFuncTypeQueryManage = ({data}: { data: any }) => void;
type onErrorFuncTypeQueryManage = (error: any) => void;
type Props = {
    url: string,
    key: string[],
    params?: object | null,
    GetParams?: object | null,
    serializeDataName?: string,
    useInUrl?: boolean,
    axios: any,
    enabled?: boolean
};

// Define the type for the return value of useManageQuery hook
interface UseManageQueryReturn {
    data: any;
    isLoading: boolean;
    setQueryParams: React.Dispatch<React.SetStateAction<any>>;
    setQueryParam: (name: string, value: any) => void;
    clearQueryParams: () => void;
    removeQueryParam: (name: string) => void;
    queryParams: any | null;
    getQueryParam: (name: string) => any;
    setQueryParamMore: (objMap: any) => void;
    setEnabledVar: React.Dispatch<React.SetStateAction<boolean>>;
    enabledVar: boolean;
}

const useQueryBrowserParams = ():any => {
    const {search} = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

const encode = (str: string): string => {
    return window.btoa(unescape(encodeURIComponent(str)));
};

const decode = (str: string): string => {
    return decodeURIComponent(escape(window.atob(str)));
};

const serializeForUrl = (data: any): string => {
    return encode(JSON.stringify(data));
};

const deserializeForUrlJson = (data: string): any => {
    return JSON.parse(decode(data));
};

const deserializeForUrl = (serializeDataInit: string | null): any => {
    let jsonData = null;
    if (serializeDataInit != null) {
        if (serializeDataInit.length > 4) {
            jsonData = deserializeForUrlJson(serializeDataInit);
        }
    }
    return jsonData;
};

const customParamsSerializer = (params: { [key: string]: any }): string => {
    // @ts-ignore
    return Object.entries(params).map(([key, value]) => `${key}=${value}`)
        .join('&');
};



export const useManageQuery = ({
                                   url,
                                   key,
                                    axios,
                                   params = {},
                                   GetParams = {},
                                   serializeDataName = "data",
                                   useInUrl = true,
                                   enabled = true
                               }: Props):UseManageQueryReturn => {
    const [queryParams, setQueryParams] = useState<object | null>(null);
    const [enabledVar, setEnabledVar] =useState<boolean>(enabled);
    const serializeData = useQueryBrowserParams().get(serializeDataName);
    const deserializeAndGetData = deserializeForUrl(serializeData);
    const location = useLocation();
    const navigate = useNavigate();


    let keyName = key;
    if (keyName == null) {
        keyName = [url];
    }


    useEffect(() => {
        console.log("NULL", deserializeAndGetData);
        if (!isNil(deserializeAndGetData) && useInUrl) {
            setQueryParams(deserializeAndGetData);
            console.log("deserializeAndGetData", deserializeAndGetData);
        }
    }, []);


    useEffect(() => {
        if (!isNil(queryParams) && useInUrl) {
            const newSerializeData = serializeForUrl(queryParams);
            const path = location.pathname;
            navigate(`${path}?${serializeDataName}=${newSerializeData}`);
        }
    }, [queryParams]);

    const setQueryParam = (name: string, value: any): void => {
        setEnabledVar(false);
        let qp: object|null = {};
        if (!isNil(queryParams)) {
            qp = { ...queryParams };
        }
        setQueryParams({ ...qp, [name]: value });
        setEnabledVar(true);
    };

    const setQueryParamMore = (objMap: object|null): void => {
        let qp: object|null = {};
        if (!isNil(queryParams)) {
            qp = { ...queryParams };
        }
        setQueryParams({ ...qp, ...objMap });
    };

    const removeQueryParam = (name: string): void => {
        let qp: object|null = {};
        if (!isNil(queryParams)) {
            qp = { ...queryParams };
        }
        // @ts-ignore
        delete qp[name];
        setQueryParams({ ...qp });
    };

    const clearQueryParams = (): void => {
        setQueryParams({});
    };

    const getQueryParam = (name: string): any => {
        return get(queryParams, name);
    };


   const { isLoading, isError, data:response, error, isFetching } = useApiQuery({
        axios,
        queryKey:key,
        axiosUrl:url,
        axiosParams:{
            ...params,
            params: {
                ...GetParams,
                ...queryParams
            },
            paramsSerializer: customParamsSerializer
        },
        enabled:enabledVar
    })

    const data = get(response, "data", {});

    return {
        data,
        isLoading,
        setQueryParams,
        setQueryParam,
        clearQueryParams,
        removeQueryParam,
        queryParams,
        getQueryParam,
        setQueryParamMore,
        setEnabledVar,
        enabledVar
    };

};