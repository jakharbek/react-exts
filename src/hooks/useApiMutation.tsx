import * as React from 'react';
import { useMutation, useQueryClient, UseMutationOptions } from 'react-query';
import { UseMutationResult } from 'react-query';
import { isArray, get, forEach } from 'lodash';

type onSuccessFuncType = (data: any) => void;

type requestClient = () => any;

type Props = {
    mutationFn: requestClient;
    mutationKey: string[] | string;
    updateKeys?: string[] | string;
    config?: UseMutationOptions<any, unknown, unknown, unknown>;
    onSuccess?: onSuccessFuncType;
};

export const useApiMutation = ({
                                   mutationFn,
                                   mutationKey,
                                   updateKeys = [],
                                   config = {},
                                   onSuccess = (data) => {
                                       console.log('success / data:', data);
                                   },
                               }: Props) => {
    const queryClient = useQueryClient();

    const { mutate, isLoading, isError, error, data } = useMutation(
        {
            ...config,
            mutationKey,
            mutationFn,
            onSuccess: (data) => {
                onSuccess(data);
                if (updateKeys) {
                    if (isArray(updateKeys)) {
                        forEach(updateKeys, (val) => {
                            queryClient.invalidateQueries(val);
                        });
                    } else {
                        queryClient.invalidateQueries(updateKeys);
                    }
                }
            },
        }
    );

    return {
        mutate,
        isLoading,
        isError,
        error,
        data,
    };
};
