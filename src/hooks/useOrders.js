import { useQuery } from "@tanstack/react-query";
import { useLocalStorage } from "@uidotdev/usehooks";
import { axiosGetData } from "@utils/axios";
import { useMemo } from "react";
const useOrders = () => {
    const [dishes] = useLocalStorage("dishes", []);
    const data = useQuery({
        queryKey: ["dishes"],
        queryFn: () => axiosGetData({ title: "dishes" }),
    });
    const orders = useMemo(() => {
        if (dishes.length === 0 || data.data === undefined) {
            return [];
        }
        return dishes.map((dish) => {
            const dishData = data.data.find((d) => d._id === dish.dish);

            return {
                ...dish,
                title: dishData?.title,
                image: dishData?.image,
                amountSize: Object.keys(dishData?.price).length,
            };
        });
    }, [data.data, dishes]);

    const fullPrice = useMemo(() => {
        if (orders.length == 0) {
            return 0;
        }
        return orders.reduce((acc, curr) => acc + curr.amount * curr.price, 0);
    }, [orders]);

    return {
        orders,
        fullPrice,
        data,
    };
};

export default useOrders;
