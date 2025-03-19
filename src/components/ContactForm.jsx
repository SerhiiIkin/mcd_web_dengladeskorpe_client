import { Form, Formik } from "formik";
import Field from "@components/Field";
import SectionLayout from "@layouts/SectionLayout";
import Button from "@components/Button";
import useContactForm from "@hooks/useContactForm";
import Loader from "@components/Loader";
import useModal from "@hooks/useModal";
import ModalLayout from "@layouts/ModalLayout";
import Title from "@components/Title";

const ContactForm = () => {
    const modalProps = useModal();
    const { changeModalState } = modalProps;
    const {
        formData,
        validationSchema,
        initialValues,
        onSubmit,
        mutationSendMessage,
        name,
    } = useContactForm(changeModalState);

    return (
        <>
            <ModalLayout {...modalProps}>
                <div className="grid gap-2 py-8 px-2 text-center bg-secondary/70 w-full ">
                    <Title type="h4" className="break-words text-black text-xl">
                        {`Tak for din besked ${name}`}
                    </Title>
                    <Title type="h4" className="break-words text-black text-xl">
                        Vi vender tilbage hurtigst muligt.
                    </Title>
                </div>
            </ModalLayout>
            <SectionLayout classNameSection="bg-secondary">
                <Formik
                    enableReinitialize
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={onSubmit}>
                    {({ isValid }) => (
                        <Form className="flex flex-col gap-2 max-w-xs mx-auto">
                            {formData.map((field) => (
                                <Field key={field._id} field={field} />
                            ))}

                            <Button
                                aria-label="send besked"
                                type="submit"
                                className="max-w-none"
                                disabled={
                                    mutationSendMessage.isPending || !isValid
                                }>
                                Send
                                {mutationSendMessage.isPending && (
                                    <Loader className="w-4 h-4" />
                                )}
                            </Button>
                        </Form>
                    )}
                </Formik>
            </SectionLayout>
        </>
    );
};

export default ContactForm;
