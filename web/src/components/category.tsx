import React from "react";

import Card from "./card";
import { CardType } from "./types";

interface categoryProps {
    name: string;
    id: number;
} // declaring the props for the category.

interface categoryState {
    name: string;
    cards: any[];
    newCard: boolean;
} // declaring the state for the category.

class Category extends React.Component<categoryProps, categoryState> {
    id: number; // declaring that categories have an ID attribute

    constructor(props: categoryProps) {
        super(props);
        this.id = props.id;
        this.state = {
            name: this.props.name,
            cards: [],
            newCard: false,
        }; // declaring state and props

        this.handleSubmit = this.handleSubmit.bind(this);
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

    handleSubmit(event: any) {
        event.preventDefault();

        fetch(`/cards/${this.id}`, {
            method: "POST",
            body: JSON.stringify({
                name: event.target.cardName.value,
                body: event.target.cardBody.value,
            }),
            headers: {
                "Content-type": "application/json",
            },
        });

        window.setTimeout(() => this.componentDidMount(), 50);
        window.setTimeout(() => this.setState({ newCard: false }), 50);
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
                    categoryID={card.categoryID}
                    deleteFunction={(toRemove: CardType) => {
                        this.state.cards.splice(
                            this.state.cards.indexOf(toRemove),
                            1
                        ); // this function is passed to the card and when the card needs to delete itself it passes a CardType object to this which is removed from the list
                        this.forceUpdate();
                    }}
                /> // creating card components from state
            );
        });

        return (
            <>
                <div className={"category"}>
                    {this.state.name}
                    <div className={"cardScrollBox"}>
                        {disp}
                        <button
                            className={"card"}
                            onClick={() => this.setState({ newCard: true })}
                        >
                            add new card
                        </button>
                    </div>
                </div>
                {/* return cards to be placed on screen. */}
                {this.state.newCard && (
                    <div className="popUp">
                        <button
                            onClick={() => this.setState({ newCard: false })}
                        >
                            Back
                        </button>
                        <form onSubmit={this.handleSubmit}>
                            <label>
                                Card Name:
                                <input type="text" name="cardName" />
                            </label>
                            <label>
                                Card Body:
                                <input type="text" name="cardBody" />
                            </label>
                            <input type="submit" value="Submit" />
                        </form>
                    </div>
                )}
            </>
        );
    }
}

export default Category;
