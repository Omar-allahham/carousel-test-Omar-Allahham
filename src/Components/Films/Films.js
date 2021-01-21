
import React, { useEffect, useState } from "react";
import Carousel from "../Carousel/Carousel";
import ErrorMessage from "../ErrorMessage";

export default (props) => {
    const [state, setState] = useState({ films: [], isLoading: true, APIError: false, ErrorMessage: "" });
    useEffect(() => {
        fetch(`https://swapi.dev/api/films/`, {
            method: "GET"
        })
            .then((res) => res.json())
            .then((response) => {
                setState({ films: response.results, isLoading: false });
            })
            .catch((error) => setState({ ...state, APIError: true, ErrorMessage: error.message }));
    }, []);

    if (state.APIError === true)
        return <ErrorMessage message={state.ErrorMessage} />

    return (<Carousel items={state.films} isLoading={state.isLoading} ItemTemplate={FilmCarouselItem} />);
};

function FilmCarouselItem(props) {
    const { item, index } = props;

    return (
        <div className={props.classes} >
            <h1>{item.title}</h1>
            <h2><a href={`/characters/${index}`}> Characters</a></h2>
        </div>
    );
}







