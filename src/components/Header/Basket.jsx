import { useLocalStorage } from "@uidotdev/usehooks";
import { classes } from "@utils/classes";
import { useMemo } from "react";
import { Link } from "react-router";

const Basket = () => {
    const [dishes] = useLocalStorage("dishes", []);

    const count = useMemo(() => {
        return dishes.length;
    }, [dishes]);

    return (
        <Link to="/basket" className="relative group">
            <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-4 h-4  rounded-full grid place-items-center  text-xs text-white  group-hover:xl:scale-110 xl:duration-700 z-10">
                {count}
            </div>
            <BasketIco className="fill-primary  group-hover:xl:scale-110 xl:duration-700" />
        </Link>
    );
};

export default Basket;

const BasketIco = ({ classNames }) => {
    return (
        <img
            className={classes(["w-10 aspect-square", classNames])}
            src="/basket_icon.png"
            alt="basket"
        />
    );
};
