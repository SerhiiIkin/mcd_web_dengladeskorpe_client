import DataHandleLayout from "@layouts/DataHandleLayout";
import SectionLayout from "@layouts/SectionLayout";
import { useQuery } from "@tanstack/react-query";
import { axiosGetData } from "@utils/axios";
import { Link } from "react-router";
import Title from "@components/Title";
import { CategoriesContext } from "@context/CategoriesContext";
import { useContext, useMemo } from "react";

const Dishes = () => {
    const data = useQuery({
        queryKey: ["dishes"],
        queryFn: () => axiosGetData({ title: "dishes" }),
    });

    const { category } = useContext(CategoriesContext);

    const dishes = useMemo(() => {
        if (category.length === 0) {
            return data.data && data.data;
        } else if (category.length > 0) {
            return (
                data.data &&
                data.data.filter((dish) => category.includes(dish.category))
            );
        } else return data.data;
    }, [category, data.data]);

    return (
        <SectionLayout classNameContainer="px-2">
            <DataHandleLayout
                data={{ ...data, data: dishes }}
                emptyText="No dishes"
                SkeletonCount={10}>
                <article className=" grid grid-auto-cols-120 gap-1">
                    {data.data &&
                        dishes?.map((dish) => (
                            <Dish key={dish._id} dish={dish} />
                        ))}
                </article>
            </DataHandleLayout>
        </SectionLayout>
    );
};

export default Dishes;

const Dish = ({ dish }) => {
    return (
        <Link
            to={`dish/${dish._id}`}
            className="relative grid place-items-center aspect-square max-w-28">
            <img
                src={dish.image}
                alt="category image"
                className="absolute inset-0 opacity-70 "
            />

            <Title type="h3-stroke" className="relative z-10">
                {dish.title}
            </Title>
        </Link>
    );
};
