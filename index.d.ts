
type onSuccessFuncTypeMut = (data: any) => void;

type requestClient = () => any;

type Props = {
    mutationFn: requestClient;
    mutationKey: string[] | string;
    updateKeys?: string[] | string;
    config?: object|null;
    onSuccess?: onSuccessFuncTypeMut;
};


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

type onSuccessFuncTypeQueryManage = ({data}: { data: any }) => void;
type onErrorFuncTypeQueryManage = (error: any) => void;
type PropsManage = {
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
type UseManageQueryReturn = {
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
