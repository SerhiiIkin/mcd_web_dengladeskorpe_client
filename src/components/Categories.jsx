import SectionLayout from "@layouts/SectionLayout";
import Title from "@components/Title";
import { useQuery } from "@tanstack/react-query";
import { axiosGetData } from "@utils/axios";
import DataHandleLayout from "@layouts/DataHandleLayout";
import { useContext } from "react";
import { CategoriesContext } from "@context/CategoriesContext";
import { classes } from "@utils/classes";

const Categories = () => {
    const data = useQuery({
        queryKey: ["categories"],
        queryFn: () => axiosGetData({ title: "categories" }),
    });

    return (
        <>
            <Title type="h2" className="pb-8">
                Vælg kategori
            </Title>
            <SectionLayout
                classNameSection="bg-secondary py-3 "
                classNameContainer="px-2">
                <DataHandleLayout
                    data={data}
                    emptyText="No categories"
                    SkeletonCount={5}>
                    <article className="grid grid-auto-cols-120 gap-1">
                        {data.data &&
                            data.data.map((category) => (
                                <Category
                                    key={category._id}
                                    category={category}
                                />
                            ))}
                    </article>
                </DataHandleLayout>
            </SectionLayout>
        </>
    );
};

export default Categories;

const Category = ({ category }) => {
    const context = useContext(CategoriesContext);

    const handleChange = (event) => {
        const { checked } = event.target;
        context.setCategory((prev) =>
            checked
                ? [...prev, category.name]
                : prev.filter((cat) => cat !== category.name)
        );
    };

    return (
        <label
            type="button"
            className="relative grid place-items-center aspect-square">
            <img
                src={category.image}
                alt="category image"
                className={classes([
                    "absolute ",
                    context.category.includes(category.name)
                        ? "opacity-100"
                        : "opacity-70",
                ])}
            />
            <input type="checkbox" className="hidden" onChange={handleChange} />
            <Title type="h3-stroke" className="relative z-10 ">
                {category.name}
            </Title>
        </label>
    );
};
