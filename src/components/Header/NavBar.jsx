import { routes } from "@constants/routes";
import { classes } from "@utils/classes";
import { Link } from "react-router";

const NavBar = ({
    navBarRef,
    isMobile,
    onClickBurgerMenu,
    navBarContentRef,
}) => {
    const navList = routes[0].children
        .filter((route) => route.name !== "")
        .map((route) => {
            return {
                name: route.name,
                href: route.path,
            };
        });

    return (
        <nav
            ref={navBarRef}
            className={classes([
                isMobile &&
                    "hidden fixed inset-0 bg-primary  text-center z-20 ",
            ])}>
            <div
                ref={navBarContentRef}
                className={classes([
                    isMobile
                        ? "grid content-center gap-10"
                        : "hidden md:flex md:gap-4 mr-4",
                ])}>
                {navList.map((item, i) => (
                    <Link
                        key={i}
                        className="text-5xl leading-7 font-just hover:text-black shadow-title duration-300 text-white"
                        onClick={onClickBurgerMenu}
                        to={item.href}>
                        {item.name}
                    </Link>
                ))}
            </div>
        </nav>
    );
};

export default NavBar;
