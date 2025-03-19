import { useGSAP } from "@gsap/react";
import { useRef, useState } from "react";
import gsap from "gsap";

const useModal = () => {
    const backdropRef = useRef(null);
    const contentModalRef = useRef(null);
    const { contextSafe } = useGSAP({ scope: contentModalRef });

    const [modalState, setModalState] = useState(false);

    const duration = 0.8;

    const changeModalState = contextSafe(() => {
        setModalState((prev) => !prev);

        gsap.to(backdropRef.current, {
            opacity: modalState ? 0 : 0.7,
            duration,
        });

        gsap.to(contentModalRef.current, {
            opacity: modalState ? 0 : 1,
            duration,
            display: modalState ? "none" : "grid",
        });
    });

    return { changeModalState, backdropRef, contentModalRef };
};

export default useModal;
