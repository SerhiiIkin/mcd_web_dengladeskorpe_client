import DataHandleLayout from "@layouts/DataHandleLayout";
import SectionLayout from "@layouts/SectionLayout";
import { useQuery } from "@tanstack/react-query";
import { axiosGetData } from "@utils/axios";
import Title from "./Title";

const Employees = () => {
    const data = useQuery({
        queryKey: ["employees"],
        queryFn: () => axiosGetData({ title: "employees" }),
    });

    return (
        <SectionLayout>
            <DataHandleLayout
                SkeletonCount={20}
                data={data}
                emptyText="Inten personalet">
                <div className="grid grid-auto-cols-108 gap-4">
                    {data.data &&
                        data.data.map((employee) => (
                            <Employee key={employee._id} employee={employee} />
                        ))}
                </div>
            </DataHandleLayout>
        </SectionLayout>
    );
};

export default Employees;

const Employee = ({ employee }) => {
    return (
        <article className="grid gap-2 justify-center text-center">
            <img
                className="max-w-[200px] aspect-square"
                src={employee.image}
                alt={employee.name}
            />
            <Title type="h5">{employee.name}</Title>
            <Title type="h6">{employee.position}</Title>
        </article>
    );
};
