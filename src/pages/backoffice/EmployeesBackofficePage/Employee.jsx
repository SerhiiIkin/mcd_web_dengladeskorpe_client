import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosRemoveData } from "@utils/axios";
import { Link } from "react-router";
import { toast } from "react-toastify";

const Employee = ({ employee }) => {
    const queryClient = useQueryClient();
    const mutationRemoveEmployee = useMutation({
        mutationFn: (id) => axiosRemoveData({ title: "employee", id }),
        onSuccess: (data) => {
            toast.success(data.message);
            queryClient.invalidateQueries(["employee"]);
        },
    });

    return (
        <tr className="border-b" key={employee._id}>
            <td className="px-2 py-2 border-r">{employee.name}</td>
            <td className="px-2 py-2 border-r">
                <img
                    className="max-w-7 aspect-square object-cover"
                    src={employee.image}
                    alt="employee"
                />
            </td>
            <td className="px-2 py-2 border-r">{employee.position}</td>
            <td className="px-2 py-2 flex justify-center items-center gap-2">
                <Link to={`${employee._id}`}>
                    <EditSvg className="fill-blue-500" />
                </Link>
                <button
                    disabled={mutationRemoveEmployee.isPending}
                    className="disabled:cursor-not-allowed disabled:opacity-50"
                    onClick={() => mutationRemoveEmployee.mutate(employee._id)}>
                    <DeleteSvg className="fill-red-500" />
                </button>
            </td>
        </tr>
    );
};

export default Employee;

const DeleteSvg = ({ className }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="20"
        viewBox="0 0 41 40">
        <g clipPath="url(#clip0_109_2047)">
            <path d="M10.4997 31.6667C10.4997 33.5 11.9997 35 13.833 35H27.1663C28.9997 35 30.4997 33.5 30.4997 31.6667V11.6667H10.4997V31.6667ZM32.1663 6.66667H26.333L24.6663 5H16.333L14.6663 6.66667H8.83301V10H32.1663V6.66667Z" />
        </g>
        <defs>
            <clipPath id="clip0_109_2047">
                <rect
                    width="40"
                    height="40"
                    fill="white"
                    transform="translate(0.5)"
                />
            </clipPath>
        </defs>
    </svg>
);
const EditSvg = ({ className }) => (
    <svg
        className={className}
        xmlns="http://www.w3.org/2000/svg"
        width="27"
        height="20"
        viewBox="0 0 37 30"
        fill="none">
        <path d="M0.5 8H22.3392V12H0.5V8ZM0.5 4H22.3392V0H0.5V4ZM0.5 20H14.3977V16H0.5V20ZM30.3006 13.74L31.7103 12.32C32.4846 11.54 33.7354 11.54 34.5097 12.32L35.9193 13.74C36.6936 14.52 36.6936 15.78 35.9193 16.56L34.5097 17.98L30.3006 13.74ZM28.891 15.16L18.3685 25.76V30H22.5775L33.1 19.4L28.891 15.16Z" />
    </svg>
);
