import { classes } from "@utils/classes";

const SectionLayout = ({ children, classNameSection, classNameContainer }) => {
    return (
        <section
            className={classes([
                "py-7 md:py-9 xl:py-12",
                classNameSection ?? "",
            ])}>
            <div
                className={classes([
                    "container mx-auto px-6 md:px-8 xl:px-10",
                    classNameContainer ?? "",
                ])}>
                {children}
            </div>
        </section>
    );
};

export default SectionLayout;
