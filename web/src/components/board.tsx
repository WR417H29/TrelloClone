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

    // need to create a function to interact with python api to
    // get a list of all categories
    // and find the boards etc

    render() {
        const categories: string[] = ["hi"];

        return <div className="board">Board: {categories}</div>;
    }
}

export default Board;
