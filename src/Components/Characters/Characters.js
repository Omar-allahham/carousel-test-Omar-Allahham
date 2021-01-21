import React, { useEffect, useState } from "react";
import { createUseStyles } from "react-jss";
import Carousel from "../Carousel/Carousel";
import ErrorMessage from "../ErrorMessage";



const useStyle = createUseStyles({
    backBtn: {
        border: "1px solid #4CAF50",
        padding: "5px",
        fontSize: "2vw",
    }
})

export default (props) => {
    const classes = useStyle();
    const [state, setState] = useState({ characters: [], isLoading: true, APIError: false, errorMessage: "" });
    const filmId = parseInt(props.match.params.filmId) + 1;

    useEffect(() => {
        fetch(`https://swapi.dev/api/films/${filmId}`)
            .then((res) => res.json())
            .then((response) => {
                let dataArray = []
                const promises = response.characters.map(characterURL => new Promise((resolve, reject) => {
                    fetch(characterURL)
                        .then(res => res.json())
                        .then(response => {
                            dataArray.push({ name: response.name, specieName: "" })
                            if (response.species && response.species.length > 0) {
                                fetch(response.species[0])
                                    .then(res => res.json())
                                    .then(specie => {
                                        const charIndex = dataArray.findIndex(element => element.name === response.name);
                                        dataArray[charIndex].specieName = specie.name
                                        resolve();
                                    })
                            }
                            else { resolve() }
                        })

                }))
                Promise.all(promises)
                    .then(res => setState({ isLoading: false, characters: dataArray }))

            })
            .catch((error) => setState({ ...state, APIError: true, errorMessage: error.message }));
    }, []);


    if (state.APIError === true)
        return <ErrorMessage message={state.errorMessage} />

    return (
        <div style={{ margin: "1rem" }}>
            <a href="/" className={classes.backBtn} > Back </a>
            <Carousel items={state.characters} isLoading={state.isLoading} ItemTemplate={CharactersCarouselItem} /></div>);
};



function CharactersCarouselItem(props) {
    const { item } = props;

    return (
        <div className={props.classes} >
            <h1>{item.name}</h1>
            <h2> {item.specieName || "No Specie!"}</h2>
        </div>
    );
}







