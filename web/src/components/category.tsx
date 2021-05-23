import React from "react";

import Card from "./card";
import { CardType } from "./types";

interface categoryProps {
    name: string;
    id: number;
} // declaring the props for the category.

interface categoryState {
    name: string;
    cards: [];
} // declaring the state for the category.

class Category extends React.Component<categoryProps, categoryState> {
    id: number; // declaring that categories have an ID attribute

    constructor(props: categoryProps) {
        super(props);
        this.id = props.id;
        this.state = {
            name: this.props.name,
            cards: [],
        }; // declaring state and props
    }

    componentDidMount() {
        const url = `/cards/${this.id}`; // requesting a specific category of cards from the python api

        fetch(url, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ cards: data });
            }); // adding the cards to state
    }

    render() {
        let disp: any = [];
        this.state.cards.forEach((card: CardType) => {
            disp.push(
                <Card
                    name={card.name}
                    text={card.body}
                    id={card.id}
                    key={card.id}
                /> // creating card components from state
            );
        });

        return (
            <div className={"category"}>
                {this.state.name} {disp}
            </div> // return cards to be placed on screen.
        );
    }
}

export default Category;
