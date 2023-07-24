
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
