import React from "react";

import Card from "./card";
import { CardType } from "./types";

interface categoryProps {
    name: string;
    id: number;
}

interface categoryState {
    name: string;
    cards: [];
}

class Category extends React.Component<categoryProps, categoryState> {
    id: number;

    constructor(props: categoryProps) {
        super(props);
        this.id = props.id;
        this.state = {
            name: this.props.name,
            cards: [],
        };
    }

    componentDidMount() {
        fetch(`/cards/${this.id}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ cards: data });
            });
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
                />
            );
        });

        return (
            <div className={"category"}>
                {this.state.name} {disp}
            </div>
        );
    }
}

export default Category;
