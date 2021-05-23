import React from "react";

import Category from "./category";

interface boardProps {
    name: string;
}

interface boardState {
    name: string;
}

class Board extends React.Component<boardProps, boardState> {
    constructor(props: boardProps) {
        super(props);
        this.state = {
            name: this.props.name,
        };
    }

    getCategories() {
        fetch("/boards", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => console.log(data));

        return [<Category name="Category 1" />, <Category name="Category 2" />];
    }

    // need to create a function to interact with python api to
    // get a list of all categories
    // and find the boards etc

    render() {
        const categories = this.getCategories();

        return <div className="board">Board: {categories}</div>;
    }
}

export default Board;
