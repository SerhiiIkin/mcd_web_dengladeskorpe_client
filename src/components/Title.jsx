import { classes } from "@utils/classes";

const Title = ({ type, className, children }) => {
    switch (type) {
        case "h2":
            return (
                <h2
                    className={classes([
                        "text-5xl shadow-title text-center font-just",
                        className,
                    ])}>
                    {children}
                </h2>
            );
        case "h2-stroke":
            return (
                <h2
                    className={classes([
                        "text-5xl shadow-title leading-7 text-white webkit-text-stroke font-just text-center ",
                        className,
                    ])}>
                    {children}
                </h2>
            );
        case "h3-stroke":
            return (
                <h3
                    className={classes([
                        " text-4xl shadow-title text-white webkit-text-stroke font-just text-center ",
                        className,
                    ])}>
                    {children}
                </h3>
            );
        case "h4-stroke":
            return (
                <h4
                    className={classes([
                        "text-xl shadow-title text-white webkit-text-stroke font-just text-center ",
                        className,
                    ])}>
                    {children}
                </h4>
            );
        case "h3":
            return (
                <h3 className={classes([" text-4xl text-white", className])}>
                    {children}
                </h3>
            );
        case "h4":
            return (
                <h4 className={classes([" text-2xl text-white", className])}>
                    {children}
                </h4>
            );
        case "h5":
            return (
                <h5 className={classes([" text-15 shadow-title", className])}>{children}</h5>
            );
        case "h6":
            return (
                <h6 className={classes([" text-10", className])}>
                    {children}
                </h6>
            );

        default:
            return (
                <h1
                    className={classes([
                        "text-5xl shadow-title leading-normal text-center font-just",
                        className,
                    ])}>
                    {children}
                </h1>
            );
    }
};

export default Title;
