import BackofficeSideBar from "@pages/backoffice/components/BackofficeSideBar";
import Header from "@components/Header/Header";
import { Outlet } from "react-router";
import { ToastContainer } from "react-toastify";

const BackofficeLayout = () => {
    return (
        <div className="flex flex-col  min-h-dvh">
            <Header classNameHeader="bg-primary" />
            <main className="flex-1 pt-22">
                <BackofficeSideBar />
                <Outlet />
            </main>
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                pauseOnHover
                theme="colored"
            />
        </div>
    );
};

export default BackofficeLayout;
