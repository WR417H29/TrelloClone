import React from "react";

import Card from "./card";

type CardType = {
    id: number;
    name: string;
    body: string;
    categoryID: number;
};

interface categoryProps {
    name: string;
    key: number;
}

interface categoryState {
    name: string;
    cards: [];
}

class Category extends React.Component<categoryProps, categoryState> {
    key: number;

    constructor(props: categoryProps) {
        super(props);
        this.key = props.key;
        this.state = {
            name: this.props.name,
            cards: [],
        };
    }

    componentDidMount() {
        fetch("/cards", {
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
            console.log(card);
            disp.push(<Card text={card.body} key={card.id} />);
        });

        return (
            <div className={"category"}>
                {this.state.name} {disp}
            </div>
        );
    }
}

export default Category;
