import Arrow from "@components/Arrow";
import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import { Link } from "react-router";
import gsap from "gsap";
import { routes } from "@constants/routes";

const BackofficeSideBar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const sideBarLinks = routes[1].children
        .filter((route) => route.inMenu)
        .map((route) => {
            return {
                name: route.name,
                href: `/backoffice/${route.path}`,
            };
        });

    const sideBar = useRef(null);
    const arrowSvg = useRef(null);

    const { contextSafe } = useGSAP({ scope: sideBar });
    const duration = 0.5;

    const handleSideBar = contextSafe(() => {
        setIsOpen((prev) => !prev);

        gsap.to(sideBar.current, {
            translateX: isOpen ? "-100%" : 0,
            duration,
            ease: "power3.inOut",
        });
        gsap.to(arrowSvg.current, {
            rotate: isOpen ? -90 : 90,
            duration,
        });
    });

    return (
        <>
            <aside ref={sideBar} className="fixed z-50 -translate-x-full">
                <button
                    onClick={handleSideBar}
                    type="button"
                    className="bg-secondary p-2 rounded-tr-2xl rounded-br-2xl absolute right-0 top-1/2 translate-x-full -translate-y-1/2">
                    <Arrow ref={arrowSvg} className="-rotate-90" />
                </button>
                <ul className="grid gap-4 bg-secondary p-2 min-h-screen content-center rounded-t-lg rounded-b-lg ">
                    {sideBarLinks.map((link, index) => (
                        <li key={index}>
                            <Link onClick={handleSideBar} to={link.href}>
                                {link.name}
                            </Link>
                        </li>
                    ))}
                </ul>
            </aside>
        </>
    );
};

export default BackofficeSideBar;
