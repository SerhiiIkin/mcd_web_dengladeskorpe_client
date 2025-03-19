import { classes } from "@utils/classes";
import { useRef, useState } from "react";
import Arrow from "@components/Arrow";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const MultiSelect = ({
    onChange,
    options = [""],
    classNameSelect = "",
    classNameOption = "",
    classNameOptionContainer = "",
    classNameSelectedOption = "",
}) => {
    const [selected, setSelected] = useState([options[0]]);
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

    const handleChange = contextSafe((event, option) => {
        const { checked } = event.target;

        setSelected((prev) =>
            checked
                ? [
                      ...prev.filter((item) => item.value !== ""),
                      { ...option, label: `${option.label}, ` },
                  ]
                : prev.length > 1
                ? prev.filter((item) => item.value !== option.value)
                : [options[0]]
        );
        onChange(option,checked);
    });

    const handleOpen = contextSafe((state) => {
        setIsOpen(state);
        gsap.to(arrowRef.current, { rotate: state ? 180 : 0, duration: 0.8 });
    });

    return (
        <div
            className={classes([
                "relative mb-6 max-w-xs mx-auto",
                classNameSelect,
            ])}
            ref={selectRef}
            tabIndex={0}
            onKeyDown={handleKeyDown}
            onBlur={() => handleOpen(false)}>
            <div
                className={classes([
                    "w-full px-3 py-2 border border-gray-300 rounded-md cursor-pointer bg-white",
                    classNameSelectedOption,
                ])}
                onClick={() => handleOpen(!isOpen)}>
                {selected.map((item) => (
                    <div className="inline-block px-0.5" key={item.id}>
                        {item.label}
                    </div>
                ))}
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
                        "absolute mt-1l left-0 right-0 bg-white shadow-md rounded-md z-30 text-center",
                        classNameOptionContainer,
                    ])}>
                    {options.map((option, index) => (
                        <label
                            key={option.value}
                            htmlFor={option.id}
                            className={classes([
                                "px-3 py-2 cursor-pointer flex items-center justify-between w-full",
                                highlightedIndex === index && "bg-indigo-100",
                                classNameOption,
                            ])}>
                            <span className="flex-1 text-center">
                                {option.label}
                            </span>
                            {option.value && (
                                <>
                                    <input
                                        checked={selected.some(
                                            (item) =>
                                                item.value === option.value
                                        )}
                                        onChange={(event) =>
                                            handleChange(event, option)
                                        }
                                        type="checkbox"
                                        id={option.id}
                                        className="peer hidden"
                                    />
                                    <div
                                        className={classes([
                                            "w-5 h-5 border-2 border-gray-400 rounded-md flex items-center justify-center peer-checked:bg-indigo-500 peer-checked:border-indigo-500 transition-all relative",
                                            "peer-checked:before:content-['✔'] before:text-white",
                                        ])}></div>
                                </>
                            )}
                        </label>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MultiSelect;
