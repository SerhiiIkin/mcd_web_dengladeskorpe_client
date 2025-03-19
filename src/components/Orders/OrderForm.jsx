import Button from "@components/Button";
import Field from "@components/Field";
import Loader from "@components/Loader";
import useOrderForm from "@hooks/useOrderForm";

import { Formik, Form } from "formik";

const OrderForm = ({ changeModalState }) => {
    const { initialValues, onSubmit, mutationSendOrder } =
        useOrderForm(changeModalState);

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {({ isValid }) => (
                <Form className="flex flex-col gap-5 px-6">
                    <Field
                        field={{
                            placeholder: "Kommentarer til ordren",
                            name: "comment",
                            rows: 5,
                            fieldsType: "textarea",
                        }}
                    />

                    <Button
                        aria-label="send besked"
                        type="submit"
                        className="mx-auto px-24"
                        disabled={mutationSendOrder.isPending || !isValid}>
                        Afgiv ordre
                        {mutationSendOrder.isPending && (
                            <Loader className="w-4 h-4" />
                        )}
                    </Button>
                </Form>
            )}
        </Formik>
    );
};

export default OrderForm;
