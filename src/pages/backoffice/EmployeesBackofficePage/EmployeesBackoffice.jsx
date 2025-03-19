import Title from "@components/Title";
import DataHandleLayout from "@layouts/DataHandleLayout";
import SectionLayout from "@layouts/SectionLayout";
import { useQuery } from "@tanstack/react-query";
import { axiosGetData } from "@utils/axios";
import Employee from "./Employee";

const EmployeesBackoffice = () => {
    const data = useQuery({
        queryKey: ["employees"],
        queryFn: () => axiosGetData({ title: "employees" }),
    });
    return (
        <SectionLayout>
            <Title type="h2" className="text-left pb-4">
                Employees
            </Title>
            <DataHandleLayout data={data} SkeletonCount={10}>
                <table className="border">
                    <thead>
                        <tr className="border-b">
                            <th className="py-2 px-2 border ">Name</th>
                            <th className="py-2 px-2 border ">Image</th>
                            <th className="py-2 px-2 border ">Position</th>
                            <th className="py-2 px-2 border ">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.data !== undefined &&
                            data.data?.length &&
                            data.data.map((employee) => (
                                <Employee
                                    key={employee._id}
                                    employee={employee}
                                />
                            ))}
                    </tbody>
                </table>
            </DataHandleLayout>
        </SectionLayout>
    );
};

export default EmployeesBackoffice;
