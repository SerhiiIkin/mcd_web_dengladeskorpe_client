import Button from "@components/Button";
import Title from "@components/Title";
import useModal from "@hooks/useModal";
import ModalLayout from "@layouts/ModalLayout";
import { useLocalStorage } from "@uidotdev/usehooks";

const Order = ({ order }) => {
    const modalProps = useModal();
    const { changeModalState } = modalProps;
    const [dishes, saveDishes] = useLocalStorage("dishes", []);

    const openCheckModal = () => {
        changeModalState();
    };

    const checkModal = ({ state, order }) => {
        changeModalState();
        if (state) {
            saveDishes(dishes.filter((i) => i.dish !== order.dish));
        }
    };

    const changeAmount = ({ symbol, order }) => {
        if (order.amount === 1 && symbol === "-") {
            openCheckModal();
            return;
        }
        saveDishes((prev) =>
            prev.map((item) => {
                return item.dish === order.dish
                    ? {
                          ...item,
                          amount: item.amount + (symbol === "+" ? 1 : -1),
                      }
                    : item;
            })
        );
    };

    return (
        <>
            <ModalLayout {...modalProps}>
                <div className="grid gap-2 py-8 px-2 text-center bg-secondary min-w-3/4">
                    <Title type="h3" className="break-words">
                        Er du sikker at du vil slette produktet ?
                    </Title>
                    <div className="flex gap-4 justify-self-center">
                        <Button
                            className="py-2"
                            onClick={() => checkModal({ state: true, order })}>
                            Ja
                        </Button>
                        <Button
                            className="py-2"
                            variable="reject"
                            onClick={() => checkModal({ state: false })}>
                            Nej
                        </Button>
                    </div>
                </div>
            </ModalLayout>
            <article className="bg-secondary py-7 px-12 text-xl leading-7">
                <ul className="grid gap-6">
                    <li className="flex items-center gap-5 justify-center">
                        <span>{order.amount} X</span>
                        <img
                            className="max-w-10 aspect-square"
                            src={order.image}
                            alt={order.title}
                        />
                        {order.title}
                    </li>
                    <li className="flex gap-2">
                        <Button
                            onClick={() =>
                                changeAmount({
                                    symbol: "-",
                                    order,
                                })
                            }
                            className="py-2 ">
                            -
                        </Button>
                        <Button
                            onClick={() =>
                                changeAmount({
                                    symbol: "+",
                                    order,
                                })
                            }
                            className="py-2 ">
                            +
                        </Button>
                    </li>
                    {order.extraIngredients.length > 0 && (
                        <li className="flex justify-between gap-2">
                            <span className="underline  decoration-1 underline-offset-4">
                                Ekstra:
                            </span>
                            <span className="text-right">
                                {order.extraIngredients.join(", ")}
                            </span>
                        </li>
                    )}
                    {order.amountSize > 1 && (
                        <li className="flex justify-between gap-2">
                            <span className="underline  decoration-1 underline-offset-4">
                                Størrelse:
                            </span>
                            {order.size}
                        </li>
                    )}
                    <li className="flex justify-between gap-2">
                        <span className="underline  decoration-1 underline-offset-4">
                            Pris:
                        </span>
                        {order.price},-
                    </li>
                </ul>
            </article>
        </>
    );
};

export default Order;
