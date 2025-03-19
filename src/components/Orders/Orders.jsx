import Title from "@components/Title";
import DataHandleLayout from "@layouts/DataHandleLayout";
import SectionLayout from "@layouts/SectionLayout";
import Order from "./Order";
import OrderForm from "./OrderForm";
import useOrders from "@hooks/useOrders";
import ModalLayout from "@layouts/ModalLayout";
import useModal from "@hooks/useModal";

const Orders = () => {
    const { orders, fullPrice, data } = useOrders();
    const modalProps = useModal();
    const { changeModalState } = modalProps;

    return (
        <div className="py-9">
            <Title type="h2"> Bestilling </Title>
            <SectionLayout classNameContainer="px-0">
                <DataHandleLayout
                    data={{ ...data.data, data: orders }}
                    SkeletonCount={10}
                    className="px-4"
                    emptyText="Tom kurv">
                    <div className="grid gap-10 pb-10">
                        {orders &&
                            orders.map((order) => (
                                <Order key={order.dish} order={order} />
                            ))}
                        <Title type="h4" className="text-black text-center">
                            I alt: {fullPrice},-
                        </Title>
                        <OrderForm changeModalState={changeModalState} />
                    </div>
                </DataHandleLayout>
            </SectionLayout>
            <ModalLayout {...modalProps}>
                <div className="py-8 px-2 text-center bg-secondary/70 w-full ">
                    <Title type="h4" className="break-words text-black text-xl">
                        Tak for din bestilling!
                    </Title>
                </div>
            </ModalLayout>
        </div>
    );
};

export default Orders;
