import { Button, Form, Input, Spin } from "antd";
import { filter, forEach, get, isArray, isEqual } from "lodash";
import { useState } from "react";
import { useMutation, useQueryClient, UseMutationResult } from "react-query";
import { toast } from "react-toastify";
import React from "react";
import {useApiMutation} from "./useApiMutation";

interface FormField {
    name?: string;
    type?: string;
    title?: string;
    isRequired?: boolean;
    readOnly?: boolean;
    disabled?: boolean;
    hidden?: boolean;
}


type ClientQueryFunction = (
    url: string,
    attributes: any,
    config?: any
) => any;


interface UseFormInputsProps {
    formName: string;
    listKeyId: string;
    formClassName?: string;
    formButtonTitle?: string;
    fields?: FormField[];
    url: string;
    clientQuery?: ClientQueryFunction;
    onSuccess?: (response: any) => void;
    onError?: (error: any) => void;
    isResetFieldsSuccess?: boolean;
}

const useFormInputs = ({
                           formName,
                           listKeyId,
                           formClassName = "login-form",
                           formButtonTitle = "Update",
                           fields = [
                               {
                                   name: "title",
                                   type: "input",
                                   title: "Title",
                                   isRequired: true,
                                   readOnly: false,
                                   disabled: false,
                                   hidden: false,
                               },
                           ],
                           url,
                           clientQuery,
                           onSuccess = (response: any) => {},
                           onError = (error: any) => {},
                           isResetFieldsSuccess = true,
                       }: UseFormInputsProps) => {
    const layout = {
        labelCol: {
            span: 5,
        },
        wrapperCol: {
            span: 16,
        },
    };

    const [values, setValues] = useState<object>({});
    const [enabled, setEnabled] = useState(false);

    const getValue = (name: string|undefined) => {
        // @ts-ignore
        return get(values, name!);
    };
    const setValue = (name: string, value: any) => {
        let newValues = values;
        if (newValues == null) {
            newValues = {};
        }
        newValues = { ...newValues, [name]: value };
        setValues(newValues);
    };

    const {
        mutate: formSubmit,
        isLoading: formSubmitLoading,
        isError: formSubmitIsError,
        error: formSubmitError,
    } = useApiMutation({
        mutationFn: () => clientQuery,
        mutationKey: "use-form-inputs-submit"
    });

    const fielsViews = fields.map((fieldData) => {
        let field: FormField = {
            type: "input",
            isRequired: true,
            readOnly: false,
            disabled: false,
            hidden: false,
            ...fieldData as {},
        };

        const { name, type, title, isRequired, readOnly, disabled, hidden }:any = field;
        if (isEqual(type, "input")) {
            return (
                <Form.Item
                    shouldUpdate={enabled}
                    label={title}
                    name={name}
                    rules={[
                        {
                            required: isRequired,
                            message: `Please input your ${title}`,
                        },
                    ]}
                    initialValue={getValue(name)}
                    hidden={hidden}
                >
                    <Input
                        placeholder={title}
                        defaultValue={getValue(name)}
                        onChange={(e) => {
                            setValue(name, e.target.value);
                        }}
                        value={getValue(name)}
                        readOnly={readOnly || formSubmitLoading}
                        disabled={disabled || formSubmitLoading}
                        hidden={hidden}
                    />
                </Form.Item>
            );
        }
        return null; // Ensure a return value for the map function.
    });
    const getHiddenValues = (): { [key: string]: any } => {
        const hiddenFields = getHiddenFields();
        return hiddenFields.reduce((acc: { [key: string]: any }, obj: FormField) => {
            // @ts-ignore
            acc[obj.name] = getValue(obj.name);
            return acc;
        }, {});
    };
    const getHiddenFields = (): FormField[] => {
        if (fields == null) {
            return [];
        }
        return filter(fields, (item) => {
            return get(item, "hidden", false) === true;
        }) as FormField[];
    };


    const resetFields = () => {
        const hiddenValues = getHiddenValues();
        console.log("getHiddenValues",getHiddenValues());
        console.log("getHiddenFields",getHiddenFields());

        setEnabled(false);
        setValues(hiddenValues);
        setTimeout(() => {
            setEnabled(true);
        },300);
    }

    const onSubmit = (dataValues: any) => {
        console.log("ALL ONSUBMIT", dataValues);
        // @ts-ignore
        formSubmit({url, attributes: dataValues,}).then(({ data }:any):void => {
                toast.success("SUCCESS");
                onSuccess(data);
                if (isResetFieldsSuccess) {
                    resetFields();
                }
            })
            .catch((error: any) => {
                toast.error("ERROR");
                onError(error);
            });
    };

    const view = enabled === true ? (
        <Form
            initialValues={values}
            layout="horizontal"
            name={formName}
            className={formClassName}
            onFinish={onSubmit}
            onFinishFailed={(e) => {
                console.log("ALL ERRORS", e);
            }}
            {...layout}
        >
            {fielsViews}
            <Form.Item
                shouldUpdate={enabled}
                wrapperCol={{
                    ...layout.wrapperCol,
                    offset: 5,
                }}
            >
                <Button type="primary" htmlType="submit" disabled={formSubmitLoading}>
                    {formButtonTitle}
                </Button>
            </Form.Item>
        </Form>
    ) : (
        <Spin />
    );

    return {
        view,
        setValue,
        getValue,
        setValues,
        values,
        setEnabled,
        formSubmitLoading,
        formSubmitError,
        formSubmitIsError,
    };
};

export default useFormInputs;
