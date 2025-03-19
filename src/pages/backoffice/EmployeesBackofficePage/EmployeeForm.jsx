import Button from "@components/Button";
import Field from "@components/Field";
import Loader from "@components/Loader";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosGetSingleData, axiosPostData, axiosUpdateData } from "@utils/axios";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import {  object, string } from "yup";
import InputFile from "../components/InputFile";
import { useNavigate, useParams } from "react-router";

const EmployeeForm = () => {
    const { id } = useParams();
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const data = useQuery({
        queryKey: ["product", id],
        queryFn: () =>
            axiosGetSingleData({ title: "employee", id, role: "admin" }),
        enabled: !!id,
    });

    const formData = [
        {
            _id: 1,
            label: "Navn",
            type: "text",
            name: "name",
            placeholder: "Indtast navn",
        },
        {
            _id: 2,
            label: "Position",
            type: "text",
            name: "position",
            placeholder: "indtast position",
        },
    ];

    const validationSchema = object({
        name: string().required("Påkrævet!"),
        position: string().required("Påkrævet!"),
    });

    const initialValues = {
        name: data?.data ? data.data.name : "",
        file: null,
        position: data?.data ? data.data.position : "",
    };

    const onSubmit = (values, { resetForm }) => {
        const formData = new FormData();
        formData.append("name", values.name);
        formData.append("file", values.file);
        formData.append("position", values.position);
        id && formData.append("id", id);
        id
            ? mutationUpdateUser.mutate(formData)
            : mutationAddUser.mutate(formData);
        !id && resetForm();
    };

    const mutationAddUser = useMutation({
        mutationFn: (formData) =>
            axiosPostData({ title: "employee", formData }),
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries(["employees"]);
        },
    });

    const mutationUpdateUser = useMutation({
        mutationFn: (formData) =>
            axiosUpdateData({ title: "employee", formData }),
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries(["employee", id]);
            navigate("/backoffice/employees");
        },
    });

    return (
        <Formik
            enableReinitialize
            validationSchema={validationSchema}
            initialValues={initialValues}
            onSubmit={onSubmit}>
            {({ isValid }) => (
                <Form className="flex flex-col gap-2 px-10">
                    {formData.map((field) => (
                        <Field
                            key={field._id}
                            field={field}
                            classNameLabel="text-left"
                        />
                    ))}
                    <InputFile
                        field={{
                            _id: 3,
                            label: "Image",
                            type: "file",
                            name: "file",
                            placeholder: "Upload billede",
                        }}
                    />

                    <Button
                        aria-label="send besked"
                        type="submit"
                        className="max-w-none"
                        disabled={mutationAddUser.isPending || !isValid}>
                        {id ? "Update employee" : "Add new employee"}
                        {mutationAddUser.isPending && (
                            <Loader className="w-4 h-4" />
                        )}
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default EmployeeForm;
