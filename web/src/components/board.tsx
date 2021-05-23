import React from "react";

import Category from "./category";
import { CategoryType } from "./types";

interface boardProps {
    name: string;
    id: number;
}

interface boardState {
    name: string;
    categories: [];
}

class Board extends React.Component<boardProps, boardState> {
    id: number;

    constructor(props: boardProps) {
        super(props);

        this.id = props.id;
        this.state = {
            name: this.props.name,
            categories: [],
        };
    }

    componentDidMount() {
        fetch(`/categories/${this.id}`, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ categories: data });
            });
    }

    render() {
        let disp: any = [];
        this.state.categories.forEach((category: CategoryType) => {
            disp.push(
                <Category
                    name={category.name}
                    id={category.id}
                    key={category.id}
                />
            );
        });

        return <div className="categories">{disp}</div>;
    }
}

export default Board;
