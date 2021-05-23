import React from "react";

import Category from "./category";

type CategoryType = {
    id: number;
    name: string;
    boardID: number;
};

interface boardProps {
    name: string;
    key: number;
}

interface boardState {
    name: string;
    categories: [];
}

class Board extends React.Component<boardProps, boardState> {
    key: number;

    constructor(props: boardProps) {
        super(props);
        this.key = props.key;
        this.state = {
            name: this.props.name,
            categories: [],
        };
    }

    componentDidMount() {
        fetch("/categories", {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ categories: data });
            });
    }

    // need to create a function to interact with python api to
    // get a list of all categories
    // and find the boards etc

    render() {
        let disp: any = [];
        this.state.categories.forEach((category: CategoryType) => {
            disp.push(<Category name={category.name} key={category.id} />);
        });

        return <div className="board">{disp}</div>;
    }
}

export default Board;
