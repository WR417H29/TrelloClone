import React from "react";

import Category from "./category";
import { CategoryType } from "./types";

// board component, used to display boards
interface boardProps {
    name: string;
    id: number;
    menuFunction: Function;
} // declaring the props that a board must have to be created

interface boardState {
    name: string;
    categories: [];
} // declaring what each board's state must contain

class Board extends React.Component<boardProps, boardState> {
    id: number;

    constructor(props: boardProps) {
        super(props); // initialising the react.component class

        this.id = props.id; // getting the ID from the props
        this.state = {
            name: this.props.name, // declaring the initial name of the board
            categories: [], // declaring categories as an empty list
        };
    }

    componentDidMount() {
        // on page load

        const url = `/categories/${this.id}`;
        /* This URL will make a request to the python API,
           which will return a list of JSON objects, which we will parse through,
           and convert into Category Components.
           the ID is what is used to get the categories for a specific board.
        */

        fetch(url, {
            method: "GET",
        })
            .then((res) => res.json())
            .then((data) => {
                this.setState({ categories: data });
            });
    }

    render() {
        let disp: any = []; // creating a list to store categories
        this.state.categories.forEach((category: CategoryType) => {
            disp.push(
                <Category
                    name={category.name}
                    id={category.id}
                    key={category.id}
                /> // creating a category component using the data from the API
            );
        });

        return (
            <>
                <div className={"toolbar"}>
                    <button onClick={() => this.props.menuFunction()}>
                        back
                    </button>
                </div>
                <div className={"board"}>
                    {this.props.name}
                    <div className="categories">{disp}</div>
                </div>
                <button
                    className="delete-button" // to make it look nice later
                    onClick={() => {
                        fetch(`/board/delete/${this.id}`); // fetch request to api to delete the psot
                        this.forceUpdate(); // attempting to update the page
                    }}
                >
                    Delete Post
                </button>
            </>
        ); // Returning a styled DIV with the categories in the middle.
    }
}

export default Board;
