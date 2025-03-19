import LogoLink from "@components/LogoLink";
import SectionLayout from "@layouts/SectionLayout";

const Footer = () => {
    return (
        <footer className="bg-primary py-4">
            <SectionLayout classNameContainer="grid gap-4">
                <LogoLink className=" mx-auto" classNameImg="w-18" />
                <ul className="text-white flex gap-2 text-[14px] font-just justify-center">
                    <li>
                        <a
                            target="_blank"
                            href="mailto:gladskorpe@pizzaglad.dk">
                            Email: gladskorpe@pizzaglad.dk
                        </a>
                    </li>
                    <li>
                        <a target="_blank" href="tel:12345678">
                            Tlf: 12345678
                        </a>
                    </li>
                    <li>
                        <a target="_blank" href="https://g.co/kgs/q4DawWP">
                            Adresse: Skorpevej 42, 1234 Pizzabyen
                        </a>
                    </li>
                </ul>
            </SectionLayout>
        </footer>
    );
};

export default Footer;
