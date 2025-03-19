import { classes } from "@utils/classes";

const Button = ({ className, variable = "primary", children, ...props }) => {
    const primaryClasses =
        " bg-primary xl:hover:text-primary disabled:hover:bg-primary";
    const rejectClasses =
        " bg-reject xl:hover:text-reject disabled:hover:bg-reject";

    const generalClasses = [
        variable === "primary" && primaryClasses,
        variable === "reject" && rejectClasses,
        "py-5 px-4 shadow-button rounded-[50px] text-white max-w-max duration-700",
        "xl:hover:bg-white ",
        "disabled:cursor-not-allowed  disabled:hover:text-white",
        className,
    ];

    return (
        <button
            type="button"
            className={classes([...generalClasses])}
            {...props}>
            {children}
        </button>
    );
};

export default Button;
