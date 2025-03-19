import Article from "@components/Article";
import Employees from "@components/Employees";
import Welcome from "@components/Welcome";

const EmployeesPage = () => {
    const articleData = {
        title: "Personalet hos Den Glade Skorpe",
        subtitle:
            "Hos Den Glade Skorpe har vi et dedikeret og venligt personale, der altid går den ekstra mil for at sikre, at kunderne får den bedste oplevelse. Teamet består af erfarne pizzabagere, der med passion tilbereder lækre pizzaer med friske råvarer.",
    };
    return (
        <>
            <Welcome />
            <Article {...articleData} />
            <Employees />
        </>
    );
};

export default EmployeesPage;
