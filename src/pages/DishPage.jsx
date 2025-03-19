import MultiSelect from "@components/MultiSelect";
import Title from "@components/Title";
import Welcome from "@components/Welcome";
import DataHandleLayout from "@layouts/DataHandleLayout";
import { useQuery } from "@tanstack/react-query";
import { axiosGetSingleData } from "@utils/axios";
import { useParams } from "react-router";
import { useEffect, useMemo, useState } from "react";
import Select from "@components/SelectWithArrow";
import Button from "@components/Button";
import { useLocalStorage } from "@uidotdev/usehooks";

const DishPage = () => {
    const { id } = useParams();
    const data = useQuery({
        queryKey: ["dish", id],
        queryFn: () => axiosGetSingleData({ title: "dish", id }),
        enabled: !!id,
    });

    const [dishes, saveDishes] = useLocalStorage("dishes", []);

    const { data: dishData } = data;

    const [extraIngredients, setExtraIngredients] = useState([]);
    const [price, setPrice] = useState("");
    const [size, setSize] = useState("");

    const onChangeSelectExtraIngredients = (option, checked) => {
        if (checked) {
            setExtraIngredients([...extraIngredients, option.value]);
        } else {
            setExtraIngredients(
                extraIngredients.filter((ing) => ing !== option.value)
            );
        }
    };

    const onChangeSelectPrice = (option) => {
        setPrice(option.value);
        setSize(option.label);
    };

    const handleAddButton = () => {
        saveDishes([
            ...dishes,
            { dish: dishData._id, price, size, extraIngredients, amount: 1 },
        ]);
    };

    const optionsSelectExtraIngredients = [
        {
            id: 1,
            label: "Tilføj ingrediens",
            value: "",
        },
        {
            id: 2,
            label: "Chili",
            value: "Chili",
        },
        {
            id: 3,
            label: "Hvidløg",
            value: "Hvidløg",
        },
        {
            id: 4,

            label: "Rød peber",
            value: "Rød peber",
        },
        {
            id: 5,
            label: "Kebab",
            value: "Kebab",
        },
    ];

    const optionsSelectSize =
        dishData &&
        Object.entries(dishData.price).map(([key, value]) => ({
            label: key == "normal" ? "Almindelig" : "Familie",
            value,
        }));

    const isInBasket = useMemo(
        () => dishes.some((dish) => dish.dish === dishData?._id),
        [dishes]
    );

    const removeDishBasket = () => {
        const updatedDishes = dishes.filter(
            (dish) => dish.dish !== dishData._id
        );
        saveDishes(updatedDishes);
    };

    useEffect(() => {
        setSize(optionsSelectSize && optionsSelectSize[0].label);
        setPrice(dishData?.price.normal);
    }, [dishData]);

    if (!dishData) return null;

    return (
        <>
            <Welcome title={dishData.title} />
            <DataHandleLayout data={data} SkeletonCount={10}>
                {data.data && (
                    <section className="pb-10 grid  gap-7 md:grid-cols-2 md:gap-x-0 lg:grid-cols-3 lg:pb-0">
                        <article className="md:bg-secondary grid place-items-center">
                            <img
                                className="mx-auto"
                                src={dishData.image}
                                alt={dishData.title}
                            />
                        </article>
                        <article className="bg-secondary  py-7 md:py-3  lg:py-7 ">
                            <Title type="h2-stroke" className="pb-4">
                                {dishData.title}
                            </Title>
                            <ul className="grid justify-center gap-4 text-center text-15 leading-7 pb-4">
                                {dishData.ingredients.map((ingredient) => (
                                    <li key={ingredient}>{ingredient}</li>
                                ))}
                            </ul>
                            <MultiSelect
                                onChange={onChangeSelectExtraIngredients}
                                options={optionsSelectExtraIngredients}
                            />
                        </article>
                        <article className="grid gap-4 md:col-span-2 lg:col-span-1  lg:bg-secondary lg:py-5">
                            <Title type="h2">Vælg størrelse</Title>
                            <Select
                                options={optionsSelectSize}
                                onChange={onChangeSelectPrice}
                            />
                            <Title
                                type="h3"
                                className="text-black font-display leading-7 text-center shadow-title">
                                Pris
                            </Title>
                            <Title
                                type="h3"
                                className="text-black font-display leading-7 text-center">
                                {price},-
                            </Title>
                            <div className="flex gap-2 justify-center">
                                <Button
                                    disabled={isInBasket}
                                    onClick={handleAddButton}
                                    className={[
                                        "relative flex gap-1 mx-0",
                                        isInBasket &&
                                            "bg-green-500 disabled:hover:bg-green-500",
                                    ]}>
                                    <span>
                                        {isInBasket
                                            ? "Tilføjet"
                                            : "Tilføj til kurven"}
                                    </span>
                                    <span>{dishData.title} til kurven</span>
                                    {isInBasket && <span>✔</span>}
                                </Button>
                                {isInBasket && (
                                    <Button
                                        variable="reject"
                                        onClick={removeDishBasket}>
                                        &#10006;
                                    </Button>
                                )}
                            </div>
                        </article>
                    </section>
                )}
            </DataHandleLayout>
        </>
    );
};

export default DishPage;
