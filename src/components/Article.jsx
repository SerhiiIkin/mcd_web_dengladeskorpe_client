import Title from "@components/Title";
import SectionLayout from "@layouts/SectionLayout";

const Article = ({ title, subtitle }) => {
    return (
        <SectionLayout>
            <Title type="h2" className="pb-5">
                {title}
            </Title>
            <p>{subtitle}</p>
        </SectionLayout>
    );
};

export default Article;
