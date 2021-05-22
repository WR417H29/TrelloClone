import React from "react";

import Card from "./card";

interface categoryProps {
    name: string;
}

interface categoryState {
    name: string;
}

class Category extends React.Component<categoryProps, categoryState> {
    constructor(props: categoryProps) {
        super(props);
        this.state = {
            name: this.props.name,
        };
    }

    getCards(): Array<React.ReactElement> {
        return [<Card text="Test Card 1" />, <Card text="Test Card 2" />];
    }

    render() {
        const cards = this.getCards();

        return (
            <div className={"category"}>
                {this.state.name} {cards}
            </div>
        );
    }
}

export default Category;
