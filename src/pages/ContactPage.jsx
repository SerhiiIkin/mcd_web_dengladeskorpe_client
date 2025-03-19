import Article from "@components/Article";
import ContactForm from "@components/ContactForm";
import Welcome from "@components/Welcome";

const ContactPage = () => {
    const articleData = {
        title: "Har du spørgsmål eller ønsker du at bestille din favoritpizza?",
        subtitle:
            "Udfyld formularen herunder, så vender vi hurtigt tilbage til dig. Vi glæder os til at høre fra dig!",
    };
    return (
        <>
            <Welcome />
            <Article {...articleData} />
            <ContactForm />
        </>
    );
};

export default ContactPage;
