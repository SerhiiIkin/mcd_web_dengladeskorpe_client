import Backoffice from "@pages/backoffice/Backoffice";
import MainLayout from "@layouts/MainLayout";
import BackofficeLayout from "@layouts/BackofficeLayout";
import Home from "@pages/Home";
import DishPage from "@pages/DishPage";
import EmployeesPage from "@pages/EmployeesPage";
import ContactPage from "@pages/ContactPage";
import BasketPage from "@pages/BasketPage";
import Dishes from "@pages/backoffice/Dishes";
import Messages from "@pages/backoffice/Messages";
import Orders from "@pages/backoffice/Orders";
import EmployeesBackofficePage from "@pages/backoffice/EmployeesBackofficePage/EmployeesBackofficePage";
import EmployeeForm from "@pages/backoffice/EmployeesBackofficePage/EmployeeForm";

export const routes = [
    {
        path: "/",
        element: <MainLayout />,
        children: [
            {
                path: "/",
                element: <Home />,
                name: "Forside",
            },
            {
                path: "dish/:id",
                element: <DishPage />,
                name: "",
            },
            {
                path: "employees",
                element: <EmployeesPage />,
                name: "Personalet",
            },
            {
                path: "contact",
                element: <ContactPage />,
                name: "Kontakt",
            },
            {
                path: "basket",
                element: <BasketPage />,
                name: "Kurv",
            },
        ],
    },

    {
        path: "backoffice",
        element: <BackofficeLayout />,
        children: [
            {
                path: "",
                element: <Backoffice />,
                inMenu: true,
                name:"Backoffice",
            },
            {
                path: "dishes",
                element: <Dishes />,
                inMenu: true,
                name: "Dishes",
            },
            {
                path: "messages",
                element: <Messages />,
                inMenu: true,
                name: "Messages",
            },
            {
                path: "orders",
                element: <Orders />,
                inMenu: true,
                name: "Orders",
            },
            {
                path: "employees",
                element: <EmployeesBackofficePage />,
                inMenu: true,
                name: "Employees",
            },
            {
                path: "employees/:id",
                element: <EmployeeForm />,
                inMenu: false,
            },
        ],
    },
];
