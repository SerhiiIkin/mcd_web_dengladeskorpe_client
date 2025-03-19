import Title from "@components/Title";
const Welcome = ( {title="Skorpe"} ) => {
    return (
        <section className="bg-[url(/headerImg.png)]  opacity-80 bg-cover bg-center  text-center min-h-80 grid place-items-center text-white uppercase  font-just">
            <article>
                <Title type="h5">den</Title>
                <Title type="h3">Glade</Title>
                <Title type="h4">{title}</Title>
            </article>
        </section>
    );
};

export default Welcome;
