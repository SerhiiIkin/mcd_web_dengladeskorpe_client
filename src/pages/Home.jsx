import Article from "@components/Article";
import Categories from "@components/Categories";
import Dishes from "@components/Dishes";
import Welcome from "@components/Welcome";
import { CategoriesContext } from "@context/CategoriesContext";
import { useState } from "react";

const Home = () => {
    const articleData = {
        title: "Velkommen til Den Glade Skorpe!",
        subtitle:
            'Hos os handler det om den perfekte pizza med den sprødeste skorpe. Vi bruger kun de bedste råvarer til både klassiske favoritter og spændende specialiteter som "Parma Drama" og "Rabbit Royale". Uanset om du er til en lille, personlig pizza eller en stor familiedeling, så finder du det hos os. Kom forbi og nyd en pizza lavet med kærlighed, eller bestil den, hent den og nyd den derhjemme!',
    };

    const [category, setCategory] = useState([]);

    return (
        <>
            <Welcome />
            <Article {...articleData} />
            <CategoriesContext.Provider value={{ category, setCategory }}>
                <Categories />
                <Dishes />
            </CategoriesContext.Provider>
        </>
    );
};

export default Home;
