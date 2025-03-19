import { classes } from "@utils/classes";
import { useRef, useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Arrow from "./Arrow";

const Select = ({
    onChange,
    options = [""],
    classNameSelect = "",
    classNameOption = "",
    classNameOptionContainer = "",
    classNameSelectedOption = "",
}) => {
    const [selected, setSelected] = useState(options[0]);
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(0);
    const selectRef = useRef(null);
    const arrowRef = useRef(null);

    const handleKeyDown = (event) => {
        if (!isOpen) {
            if (event.key === "Enter" || event.key === "ArrowDown") {
                event.preventDefault();
                handleOpen(true);
            }
            return;
        }

        switch (event.key) {
            case "ArrowDown":
                event.preventDefault();
                setHighlightedIndex((prev) => (prev + 1) % options.length);
                break;
            case "ArrowUp":
                event.preventDefault();
                setHighlightedIndex((prev) =>
                    prev === 0 ? options.length - 1 : prev - 1
                );
                break;
            case "Enter":
                event.preventDefault();
                const selectedOption = options[highlightedIndex];
                setSelected(selectedOption);
                onChange(selectedOption.value); // Викликаємо onChange з value
                handleOpen(false);
                break;
            case "Escape":
                handleOpen(false);
                break;
        }
    };
    const { contextSafe } = useGSAP({ scope: selectRef });

    const handleChange = contextSafe((option, index) => {
        setSelected(option);
        onChange(option);
        handleOpen(false);
        setHighlightedIndex(index);
    });

    const handleOpen = contextSafe((state) => {
        setIsOpen(state);
        gsap.to(arrowRef.current, { rotate: state ? 180 : 0, duration: 0.8 });
    });

    return (
        <div
            className={classes([
                "relative mb-6 max-w-xs min-w-xs mx-auto",
                classNameSelect,
            ])}
            ref={selectRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onBlur={() => handleOpen(false)}>
            <div
                className={classes([
                    "w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer bg-secondary",
                    classNameSelectedOption,
                ])}
                onClick={() => handleOpen(!isOpen)}>
                {selected.label}
                <Arrow
                    ref={arrowRef}
                    width={34}
                    height={34}
                    className="fill-black  absolute top-1/2 -translate-y-1/2 right-4"
                />
            </div>

            {isOpen && (
                <div
                    className={classes([
                        "absolute mt-1l left-0 right-0 bg-secondary shadow-md rounded-md z-30 text-center",
                        classNameOptionContainer,
                    ])}>
                    {options.map((option, index) => (
                        <div
                            key={option.value}
                            onClick={() => handleChange(option, index)}
                            className={classes([
                                "px-3 py-2 cursor-pointer",
                                highlightedIndex === index && "bg-indigo-100",
                                classNameOption,
                            ])}>
                            {option.label}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Select;
