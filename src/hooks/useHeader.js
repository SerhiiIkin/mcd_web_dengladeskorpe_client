import { useEffect, useState, useRef, useMemo } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
const useHeader = () => {
    const navBarRef = useRef(null);
    const navBarContentRef = useRef(null);
    const [openNav, setOpenNav] = useState(false);
    const { contextSafe } = useGSAP({ scope: navBarRef });

    const onClickBurgerMenu = contextSafe(() => {
        setOpenNav((prev) => !prev);
        const duration = 0.5;

        if (openNav) {
            gsap.to(navBarRef.current, {
                delay: duration + 0.2,
                opacity: 0,
                display: "none",
                duration,
                ease: "power3.inOut",
            });
            Array.from(navBarContentRef.current.children).forEach(
                (element, i) => {
                    gsap.to(element, {
                        delay: i * 0.1,
                        translateX: "-100%",
                        opacity: 0,
                        duration,
                        ease: "power3.inOut",
                    });
                }
            );
        } else {
            gsap.to(navBarRef.current, {
                opacity: 1,
                display: "grid",
                duration,
                ease: "power3.inOut",
            });
            Array.from(navBarContentRef.current.children).forEach(
                (element, i) => {
                    gsap.fromTo(
                        element,
                        {
                            translateX: "100%",
                            opacity: 0,
                            duration,
                            ease: "power3.inOut",
                        },
                        {
                            delay: i * 0.1,
                            translateX: "0",
                            opacity: 1,
                        }
                    );
                }
            );
        }
    });

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 960) {
                setOpenNav(false);
            }
        };

        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    return {
        openNav,
        setOpenNav,
        onClickBurgerMenu,
        navBarRef,
        navBarContentRef,
    };
};

export default useHeader;
