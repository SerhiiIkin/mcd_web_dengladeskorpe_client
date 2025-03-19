import Title from "@components/Title";
import Employees from "./EmployeesBackoffice";
import EmployeeForm from "./EmployeeForm";

const EmployeesBackofficePage = () => {
    return (
        <>
            <Title type="h2">Employees Backoffice Page</Title>
            <Employees />
            <EmployeeForm />
        </>
    );
};

export default EmployeesBackofficePage;
