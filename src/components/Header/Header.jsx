import LogoLink from "@components/LogoLink";
import NavBar from "./NavBar";
import BurgerButton from "./BurgerButton";
import Basket from "./Basket";
import useHeader from "@hooks/useHeader";
import { classes } from "@utils/classes";

const Header = ( {classNameHeader} ) => {
    const {
        openNav,
        setOpenNav,
        onClickBurgerMenu,
        navBarRef,
        navBarContentRef,
    } = useHeader();

    return (
        <>
            <header className={classes(["absolute top-0 left-0 right-0", classNameHeader])}>
                <div className="container mx-auto flex items-center p-5 min-h-20 relative z-30">
                    {!openNav && <LogoLink />}
                    <NavBar />
                    {!openNav && <Basket />}
                    <BurgerButton
                        onClickBurgerMenu={onClickBurgerMenu}
                        openNav={openNav}
                        setOpenNav={setOpenNav}
                    />
                </div>
                <NavBar
                    isMobile
                    navBarRef={navBarRef}
                    onClickBurgerMenu={onClickBurgerMenu}
                    navBarContentRef={navBarContentRef}
                />
            </header>
        </>
    );
};

export default Header;
