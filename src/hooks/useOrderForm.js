import { useMutation } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import { axiosPostData } from "@utils/axios";
import { useMemo } from "react";
const useOrderForm = (changeModalState) => {
    const [dishes, saveDishes] = useLocalStorage("dishes", []);

    const totalPrice = useMemo(() => {
        return dishes.reduce((acc, curr) => acc + curr.amount * curr.price, 0);
    }, []);
    const initialValues = {
        comment: "",
    };

    const onSubmit = (values, { resetForm }) => {
        const formData = { ...values, dishes, totalPrice };
        mutationSendOrder.mutate(formData);
        resetForm();
    };

    const mutationSendOrder = useMutation({
        mutationFn: (formData) => axiosPostData({ title: "order", formData }),
        onSuccess: () => {
            changeModalState();
            saveDishes([]);
        },
    });

    return {
        initialValues,
        onSubmit,
        mutationSendOrder,
    };
};

export default useOrderForm;
