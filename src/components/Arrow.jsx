import { classes } from "@utils/classes";

const Arrow = ({ className, ref, height = "37", width = "20" }) => (
    <svg
        ref={ref}
        className={classes(["fill-[#5E9A13]", className])}
        width={width}
        height={height}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 34 34"
        fill="none">
        <g clipPath="url(#clip0_36_407)">
            <path
                d="M10.4975 12.1692L17 18.6575L23.5025 12.1692L25.5 14.1667L17 22.6667L8.5 14.1667L10.4975 12.1692Z"
                
            />
        </g>
        <defs>
            <clipPath id="clip0_36_407">
                <rect width="34" height="34" fill="white" />
            </clipPath>
        </defs>
    </svg>
);

export default Arrow;
