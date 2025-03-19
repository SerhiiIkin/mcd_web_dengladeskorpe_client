import { classes } from "@utils/classes";

const BurgerButton = ({ onClickBurgerMenu, openNav }) => (
    <button
        className={classes([
            "h-7 w-9 relative text-inherit ml-3  hover:bg-transparent focus:bg-transparent active:bg-transparent md:hidden",
            openNav && "ml-auto",
        ])}
        onClick={onClickBurgerMenu}>
        <span
            className={classes([
                "w-full h-1  rounded absolute left-0 top-0 duration-300 bg-white",
                openNav ? "rotate-45 top-1/2 -translate-y-1/2" : "",
            ])}></span>
        <span
            className={classes([
                "w-full h-1  rounded absolute left-0 top-1/2 -translate-y-1/2 duration-300 bg-white",
                openNav ? "w-0 bg-transparent" : "",
            ])}></span>
        <span
            className={classes([
                "w-full h-1  rounded absolute left-0 bottom-0 duration-300 bg-white",
                openNav ? " -rotate-45 top-1/2 -translate-y-1/2 " : "",
            ])}></span>
    </button>
);

export default BurgerButton;
